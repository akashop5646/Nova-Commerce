export interface AssetReference {
  id: string;
  type: "image" | "video" | "font" | "file";
  provider: string; // e.g. "cloudinary", "s3", "local"
  path: string;
  metadata?: Record<string, unknown>;
}

export type AssetResolverFn = (reference: AssetReference) => string | Promise<string>;

export class AssetManager {
  private resolvers: Map<string, AssetResolverFn> = new Map();

  constructor() {
    // Default local fallback resolver
    this.registerResolver("local", (ref) => ref.path);
  }

  registerResolver(provider: string, resolver: AssetResolverFn): void {
    this.resolvers.set(provider, resolver);
  }

  async resolveAssetUrl(reference: AssetReference): Promise<string> {
    const resolver = this.resolvers.get(reference.provider);
    if (!resolver) {
      // Fallback path url direct mapping
      return reference.path;
    }
    try {
      return await resolver(reference);
    } catch (err) {
      console.error(`AssetResolver error for provider [${reference.provider}]:`, err);
      return reference.path;
    }
  }
}
