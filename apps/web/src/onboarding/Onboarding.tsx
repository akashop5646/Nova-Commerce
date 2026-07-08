import React, { useState } from "react";
import { useSession } from "../providers/SessionProvider";

export const Onboarding: React.FC = () => {
  const { setOnboardingCompleted } = useSession();
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [theme, setTheme] = useState("Deep Space Dark");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFinish = () => {
    setOnboardingCompleted();
    window.location.hash = "/dashboard";
  };

  return (
    <div style={{ maxWidth: "500px", margin: "4rem auto", padding: "2.5rem", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
      <h3 style={{ margin: "0 0 1.5rem 0", color: "#333" }}>Workspace Setup Wizard ({step}/3)</h3>

      {step === 1 && (
        <div>
          <h4>Step 1: Workspace & Organization Details</h4>
          <div style={{ marginBottom: "1rem" }}>
            <label>Workspace Name</label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g. Acme Devs"
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Organization Legal Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Acme Corporation"
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
          </div>
          <button disabled={!workspaceName || !orgName} onClick={nextStep} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Next: Preferences
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h4>Step 2: Regional Preferences & Theme</h4>
          <div style={{ marginBottom: "1rem" }}>
            <label>Default Timezone</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}>
              <option value="UTC">UTC (Universal Coordinated Time)</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
            </select>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label>UI theme preset</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}>
              <option value="Deep Space Dark">Deep Space Dark</option>
              <option value="Clean Light">Clean Light</option>
              <option value="Glassmorphism Neon">Glassmorphism Neon</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={prevStep} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#eaeaea", border: "none", borderRadius: "4px", cursor: "pointer" }}>Back</button>
            <button onClick={nextStep} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Next: Review</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h4>Step 3: Review Details & Finish</h4>
          <div style={{ backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "4px", marginBottom: "1.5rem" }}>
            <p><strong>Workspace Name:</strong> {workspaceName}</p>
            <p><strong>Organization:</strong> {orgName}</p>
            <p><strong>Timezone:</strong> {timezone}</p>
            <p><strong>Initial Theme:</strong> {theme}</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={prevStep} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#eaeaea", border: "none", borderRadius: "4px", cursor: "pointer" }}>Back</button>
            <button onClick={handleFinish} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Finish & Launch</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Onboarding;
