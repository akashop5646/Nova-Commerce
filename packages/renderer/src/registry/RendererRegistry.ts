import type { IRenderer } from "../core/IRenderer";

export class RendererRegistry {
  private renderers: Map<string, IRenderer> = new Map();
  private defaultRendererId: string | null = null;

  registerRenderer(renderer: IRenderer): void {
    this.renderers.set(renderer.id, renderer);
    if (!this.defaultRendererId) {
      this.defaultRendererId = renderer.id;
    }
  }

  removeRenderer(id: string): void {
    this.renderers.delete(id);
    if (this.defaultRendererId === id) {
      this.defaultRendererId = Array.from(this.renderers.keys())[0] ?? null;
    }
  }

  findRenderer(target: string): IRenderer | undefined {
    // 1. Look for exact id match
    if (this.renderers.has(target)) {
      return this.renderers.get(target);
    }
    // 2. Look for renderer supporting target
    for (const renderer of this.renderers.values()) {
      if (renderer.supports(target)) {
        return renderer;
      }
    }
    return undefined;
  }

  getDefault(): IRenderer | undefined {
    if (!this.defaultRendererId) return undefined;
    return this.renderers.get(this.defaultRendererId);
  }

  setDefault(id: string): void {
    if (this.renderers.has(id)) {
      this.defaultRendererId = id;
    }
  }

  supports(target: string): boolean {
    return this.findRenderer(target) !== undefined;
  }

  list(): IRenderer[] {
    return Array.from(this.renderers.values());
  }
}
