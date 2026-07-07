import type { AssetReference } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";

export class AssetResolver {
  async resolveUrl(reference: AssetReference, context: RendererContext): Promise<string> {
    const assetManager = context.assetManager;
    if (!assetManager) {
      return reference.path;
    }
    return assetManager.resolveAssetUrl(reference);
  }
}
