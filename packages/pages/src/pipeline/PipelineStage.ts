import type { PipelineContext } from "./PipelineContext.ts";
import { Result } from "@klin/core";

export interface PipelineStage {
  name: string;
  execute(context: PipelineContext): Promise<Result<PipelineContext, Error>>;
}
