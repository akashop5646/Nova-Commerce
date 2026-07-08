import React from "react";

export const TeamView: React.FC = () => {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <h4>Team Members Settings</h4>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
            <th style={{ padding: "0.5rem" }}>Name</th>
            <th style={{ padding: "0.5rem" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "0.5rem" }}>Mujahid Islam Khan</td>
            <td style={{ padding: "0.5rem" }}>Owner Administrator</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TeamView;
