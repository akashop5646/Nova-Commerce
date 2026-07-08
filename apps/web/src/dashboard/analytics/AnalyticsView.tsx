import React from "react";

export const AnalyticsView: React.FC = () => {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <h4>Workspace Performance Analytics</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "6px" }}>
          <strong>Total Layout Views</strong>
          <h2 style={{ margin: "0.5rem 0" }}>14,242</h2>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "6px" }}>
          <strong>Average Hydration Latency</strong>
          <h2 style={{ margin: "0.5rem 0" }}>42ms</h2>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsView;
