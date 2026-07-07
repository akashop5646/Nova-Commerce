import type { RenderNode } from "./RenderNode.ts";

export interface RenderTree {
  root: RenderNode[];
  metadata?: Record<string, unknown>;
}
