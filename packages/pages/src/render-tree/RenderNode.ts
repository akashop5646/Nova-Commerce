import type { RenderProps } from "./RenderProps.ts";
import type { RenderSlots } from "./RenderSlots.ts";

export interface RenderNode {
  id: string;
  blockId: string;
  props: RenderProps;
  children?: RenderNode[];
  slots?: RenderSlots;
  metadata?: Record<string, unknown>;
}
