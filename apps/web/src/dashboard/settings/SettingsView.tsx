import React from "react";

export const SettingsView: React.FC = () => {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <h4>Workspace Global Settings</h4>
      <div style={{ marginBottom: "1rem" }}>
        <label>Workspace Subdomain Prefix</label>
        <input type="text" defaultValue="acmedevs" style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }} />
      </div>
    </div>
  );
};
export default SettingsView;
