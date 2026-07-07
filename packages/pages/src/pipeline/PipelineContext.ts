import type { PageInstance } from "../core/PageFactory.ts";
import type { RenderTree } from "../render-tree/RenderTree.ts";
import type { ResolvedDependencies } from "../composition/PageDependencyResolver.ts";
import type { ValidationReport } from "../runtime/PageValidator.ts";

export interface PipelineContext {
  pageInstance: PageInstance;
  dependencies?: ResolvedDependencies;
  validationReport?: ValidationReport;
  renderTree?: RenderTree;
  metadata?: Record<string, unknown>;
}
