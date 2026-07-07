import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { DesignState } from "@/lib/design-engine/types";
import { StorefrontRenderer } from "@/lib/design-engine/renderer";

/**
 * StorefrontPublicPage
 *
 * The public-facing storefront page for a merchant's store.
 * Fetches the published store design and active products, and renders them.
 */
export default function StorefrontPublicPage() {
  const { userId } = useParams<{ userId: string }>();
  const [design, setDesign] = useState<DesignState | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadStorefront = async () => {
      try {
        setLoading(true);
        // 1. Fetch published design
        const designRes = await fetch(`/api/store-design/published/${userId}`);
        if (!designRes.ok) {
          if (designRes.status === 404) {
            throw new Error("Storefront has not been published yet.");
          }
          throw new Error("Failed to load storefront design.");
        }
        const designData = await designRes.json();
        
        // 2. Fetch public products
        const productsRes = await fetch(`/api/products/public/${userId}`);
        let loadedProducts = [];
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          loadedProducts = productsData.products || [];
        }

        setDesign(designData.design);
        setProducts(loadedProducts);

        // 3. Set store title
        const storeName = designData.design.pages?.[0]?.sections?.[0]?.config?.logoText || "Storefront";
        document.title = `${storeName} · Kiln`;
      } catch (err: any) {
        console.error("Failed to load storefront:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadStorefront();
  }, [userId]);

  if (loading) {
    return (
      <div style={S.loadingScreen}>
        <div style={{ textAlign: "center" }}>
          <div style={S.spinner} />
          <p style={{ marginTop: "12px", fontSize: "0.875rem", color: "#71717A" }}>Opening store...</p>
        </div>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div style={S.errorScreen}>
        <div style={{ textAlign: "center", maxWidth: "440px", padding: "24px" }}>
          <span style={{ fontSize: "3rem" }}>✨</span>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "16px 0 8px", color: "#18181B" }}>
            Store Not Found
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#71717A", lineHeight: 1.6, marginBottom: "24px" }}>
            {error || "The storefront you are looking for doesn't exist or is offline."}
          </p>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              background: "#18181B",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Create your own store
          </a>
        </div>
      </div>
    );
  }

  const firstPageId = design.pages?.[0]?.id || "";

  return (
    <StorefrontRenderer
      design={design}
      currentPageId={firstPageId}
      products={products}
    />
  );
}

const S = {
  loadingScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  errorScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F9F9FB",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  spinner: {
    width: 32,
    height: 32,
    border: "2px solid #E4E4E7",
    borderTopColor: "#18181B",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    margin: "0 auto",
  },
};

// Injected simple keyframe spinner style
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}
