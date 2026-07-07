import type { PageDefinition } from "../core/PageDefinition.ts";

export interface PageVariant {
  id: string;
  name: string;
  weight: number; // For traffic allocation in A/B testing (e.g. 50 = 50%)
  localeOverrides?: Record<string, string>;
  regionalOverrides?: Record<string, string>;
  overrides: Record<string, Record<string, unknown>>; // Override overrides for this variant
}

export interface PageVariantDefinition {
  pageId: string;
  variants: PageVariant[];
  defaultVariantId: string;
}

export class PageVariantEngine {
  private definitions: Map<string, PageVariantDefinition> = new Map();
  private activeVariants: Map<string, string> = new Map();

  registerVariants(pageId: string, definition: PageVariantDefinition): void {
    this.definitions.set(pageId, definition);
    this.activeVariants.set(pageId, definition.defaultVariantId);
  }

  getVariant(pageId: string, variantId: string): PageVariant | undefined {
    const def = this.definitions.get(pageId);
    if (!def) return undefined;
    return def.variants.find((v) => v.id === variantId);
  }

  getActiveVariant(pageId: string): PageVariant | undefined {
    const activeId = this.activeVariants.get(pageId);
    if (!activeId) return undefined;
    return this.getVariant(pageId, activeId);
  }

  switchVariant(pageId: string, variantId: string): boolean {
    const def = this.definitions.get(pageId);
    if (!def) return false;
    const variant = def.variants.find((v) => v.id === variantId);
    if (!variant) return false;
    this.activeVariants.set(pageId, variantId);
    return true;
  }

  listVariants(pageId: string): PageVariant[] {
    const def = this.definitions.get(pageId);
    return def?.variants ?? [];
  }

  applyVariantOverrides(
    definition: PageDefinition,
    pageId: string
  ): PageDefinition {
    const variant = this.getActiveVariant(pageId);
    if (!variant) return definition;

    const mergedOverrides = {
      ...definition.overrides,
    };

    for (const [blockId, diff] of Object.entries(variant.overrides)) {
      mergedOverrides[blockId] = {
        ...(mergedOverrides[blockId] ?? {}),
        ...diff,
      };
    }

    return {
      ...definition,
      overrides: mergedOverrides,
    };
  }

  unregister(pageId: string) {
    this.definitions.delete(pageId);
    this.activeVariants.delete(pageId);
  }
}
