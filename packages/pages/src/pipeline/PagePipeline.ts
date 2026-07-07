import type { PipelineStage } from "./PipelineStage.ts";
import type { PipelineContext } from "./PipelineContext.ts";
import type { PageInstance } from "../core/PageFactory.ts";
import { Result, Ok, Err } from "@klin/core";

export class PagePipeline {
  private stages: PipelineStage[] = [];

  addStage(stage: PipelineStage): this {
    this.stages.push(stage);
    return this;
  }

  async execute(pageInstance: PageInstance): Promise<Result<PipelineContext, Error>> {
    let context: PipelineContext = {
      pageInstance,
    };

    for (const stage of this.stages) {
      try {
        const res = await stage.execute(context);
        if (!res.ok) {
          return new Err(new Error(`Pipeline stage [${stage.name}] failed: ${res.error.message}`));
        }
        context = res.value;
      } catch (err) {
        return new Err(new Error(`Pipeline stage [${stage.name}] error: ${(err as Error).message}`));
      }
    }

    return new Ok(context);
  }
}
