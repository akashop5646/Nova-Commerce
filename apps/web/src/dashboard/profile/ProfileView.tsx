import React from "react";

export const ProfileView: React.FC = () => {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <h4>Account Profile Settings</h4>
      <div style={{ marginBottom: "1rem" }}>
        <label>Email Address</label>
        <input type="email" value="guest@klin.io" readOnly style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem", backgroundColor: "#f7fafc" }} />
      </div>
    </div>
  );
};
export default ProfileView;
