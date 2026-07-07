import type { PageInstance } from "../core/PageFactory.ts";
import type { RenderTree } from "../render-tree/RenderTree.ts";
import { PagePipeline } from "../pipeline/PagePipeline.ts";
import { PageDependencyResolver } from "../composition/PageDependencyResolver.ts";
import { OverrideResolver } from "../composition/OverrideResolver.ts";
import { RenderTreeOptimizer } from "../render-tree/RenderTreeOptimizer.ts";
import { PageValidator } from "./PageValidator.ts";
import { Result, Ok, Err } from "@klin/core";

export class PageRenderer {
  private pipeline: PagePipeline;

  constructor() {
    this.pipeline = new PagePipeline();

    // Stage 1: Dependency resolution
    this.pipeline.addStage({
      name: "DependencyResolution",
      execute: async (ctx) => {
        const resolver = new PageDependencyResolver(ctx.pageInstance.context.registry);
        const depRes = await resolver.resolve(ctx.pageInstance.definition);
        if (!depRes.ok) return new Err(depRes.error);
        return new Ok({ ...ctx, dependencies: depRes.value });
      },
    });

    // Stage 2: Merge overrides and build initial tree
    this.pipeline.addStage({
      name: "OverrideResolution",
      execute: async (ctx) => {
        const resolver = new OverrideResolver();
        const templateId = ctx.pageInstance.definition.templateId;
        const templateRes = await ctx.pageInstance.context.registry.resolve("template", templateId);
        
        let templateLayout: any[] = [];
        if (templateRes && (templateRes as any).getLayout) {
          templateLayout = (templateRes as any).getLayout();
        } else if (templateRes && (templateRes as any).layout) {
          templateLayout = (templateRes as any).layout;
        }

        const mergedBlocks = resolver.resolve(
          templateLayout,
          ctx.pageInstance.definition.overrides
        );

        // Map blocks to RenderNode schema structure
        const rootNodes = mergedBlocks.map((block) => ({
          id: block.id,
          blockId: block.blockId,
          props: block.properties,
        }));

        const initialTree: RenderTree = {
          root: rootNodes,
        };

        return new Ok({ ...ctx, renderTree: initialTree });
      },
    });

    // Stage 3: Validation report
    this.pipeline.addStage({
      name: "Validation",
      execute: async (ctx) => {
        const validator = new PageValidator();
        const reportRes = await validator.validate(ctx.pageInstance);
        if (!reportRes.ok) return new Err(reportRes.error);
        return new Ok({ ...ctx, validationReport: reportRes.value });
      },
    });

    // Stage 4: Render Tree Optimization
    this.pipeline.addStage({
      name: "Optimization",
      execute: async (ctx) => {
        if (!ctx.renderTree) {
          return new Err(new Error("RenderTree not found for optimization stage."));
        }
        const optimizer = new RenderTreeOptimizer();
        const optimizedTree = optimizer.optimize(ctx.renderTree);
        return new Ok({ ...ctx, renderTree: optimizedTree });
      },
    });
  }

  async render(pageInstance: PageInstance): Promise<Result<RenderTree, Error>> {
    pageInstance.lifecycle.transitionTo("Rendering" as any);

    const pipeRes = await this.pipeline.execute(pageInstance);
    if (!pipeRes.ok) {
      return new Err(pipeRes.error);
    }

    const tree = pipeRes.value.renderTree;
    if (!tree) {
      return new Err(new Error("Render tree compilation was not completed."));
    }

    pageInstance.context.eventBus?.getPublisher().publish(
      "page.render-tree.generated",
      { pageId: pageInstance.definition.manifest.id },
      "pages"
    );

    return new Ok(tree);
  }
}
