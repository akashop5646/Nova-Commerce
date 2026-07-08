import React from "react";

export const BillingView: React.FC = () => {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <h4>Billing & Subscriptions</h4>
      <p>Current Active Plan: <strong>Enterprise Creator</strong></p>
      <p>Billing Period Renewal: <strong>August 1, 2026</strong></p>
      <button style={{ padding: "0.5rem 1rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px" }}>
        Manage Subscriptions Invoice
      </button>
    </div>
  );
};
export default BillingView;
