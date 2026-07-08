import React from "react";

export const MarketplaceView: React.FC = () => {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <h4>Plugins Marketplace</h4>
      <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "4px" }}>
        <strong>Analytics Integration Plugin</strong>
        <p style={{ margin: "0.25rem 0 0.75rem 0", fontSize: "0.8rem", color: "#718096" }}>Tracks block clicks events.</p>
        <button style={{ padding: "0.25rem 0.5rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "3px" }}>
          Install Plugin
        </button>
      </div>
    </div>
  );
};
export default MarketplaceView;
