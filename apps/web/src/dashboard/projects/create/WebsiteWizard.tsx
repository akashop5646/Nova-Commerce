import React, { useState } from "react";

export const WebsiteWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [siteName, setSiteName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("Landing Page");
  const [selectedTemplate, setSelectedTemplate] = useState("Blank Blueprint");
  const [themePreset, setThemePreset] = useState("Deep Space Dark");
  const [generating, setGenerating] = useState(false);

  const templatesList = [
    "Blank Blueprint",
    "Creative Agency Landing",
    "Gourmet Bistro Classic",
    "Product Showcase Single",
    "Minimal Portfolio Gallery"
  ];

  const handleCreate = async () => {
    setGenerating(true);
    // Mimic PlatformEngine.createWebsite() cloning pipeline
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGenerating(false);
    setStep(7); // Show Website Created Summary
  };

  return (
    <div style={{ maxWidth: "600px", margin: "4rem auto", padding: "2.5rem", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <h3 style={{ margin: "0 0 1rem 0" }}>New Website Creation Wizard</h3>
      <div style={{ fontSize: "0.85rem", color: "#718096", marginBottom: "1.5rem" }}>
        Step {step === 7 ? "Complete" : `${step} / 6`}
      </div>

      {step === 1 && (
        <div>
          <h4>Identify: What is your website's name?</h4>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="e.g. Acme Studio Landing"
            style={{ width: "100%", padding: "0.75rem", boxSizing: "border-box", marginBottom: "1.5rem" }}
          />
          <button disabled={!siteName} onClick={() => setStep(2)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Next: Select Business Category
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h4>Select: What category of business is this for?</h4>
          <select value={businessCategory} onChange={(e) => setBusinessCategory(e.target.value)} style={{ width: "100%", padding: "0.75rem", marginBottom: "1.5rem" }}>
            <option value="Portfolio">Portfolio</option>
            <option value="Agency">Agency</option>
            <option value="Restaurant">Restaurant</option>
            <option value="E-commerce">E-commerce</option>
            <option value="SaaS">SaaS</option>
            <option value="Landing Page">Landing Page</option>
            <option value="Blog">Blog</option>
            <option value="Documentation">Documentation</option>
            <option value="Blank">Blank</option>
          </select>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#eaeaea", border: "none", borderRadius: "4px", cursor: "pointer" }}>Back</button>
            <button onClick={() => setStep(3)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Next: Select Template</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h4>Select Template Gallery</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {templatesList.map(t => (
              <label key={t} style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "4px", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", backgroundColor: selectedTemplate === t ? "#f0f7ff" : "#fff" }}>
                <input type="radio" name="template" checked={selectedTemplate === t} onChange={() => setSelectedTemplate(t)} />
                {t}
              </label>
            ))}
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#eaeaea", border: "none", borderRadius: "4px", cursor: "pointer" }}>Back</button>
            <button onClick={() => setStep(4)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Next: Clone Template</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h4>Cloning Template Registry...</h4>
          <p style={{ color: "#4a5568" }}>
            Selected: <strong>{selectedTemplate}</strong>. This creates an isolated Website Instance clone.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button onClick={() => setStep(3)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#eaeaea", border: "none", borderRadius: "4px", cursor: "pointer" }}>Back</button>
            <button onClick={() => setStep(5)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Next: Theme presets</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h4>Select Theme Presets</h4>
          <select value={themePreset} onChange={(e) => setThemePreset(e.target.value)} style={{ width: "100%", padding: "0.75rem", marginBottom: "1.5rem" }}>
            <option value="Deep Space Dark">Deep Space Dark (Minimal black & gray)</option>
            <option value="Clean Light">Clean Light (Fresh white & blue)</option>
            <option value="Gourmet Warm">Gourmet Warm (Earthy brown & cream)</option>
          </select>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setStep(4)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#eaeaea", border: "none", borderRadius: "4px", cursor: "pointer" }}>Back</button>
            <button onClick={() => setStep(6)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Next: Generate Pages</button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <h4>Generate Initial Pages</h4>
          <p>Scaffolding pages routes tree: <code>/home</code>, <code>/about</code>, <code>/contact</code>.</p>
          {generating ? (
            <div style={{ padding: "1rem", color: "#0070f3", fontWeight: "bold" }}>Cloning Website Instance...</div>
          ) : (
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              <button onClick={() => setStep(5)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#eaeaea", border: "none", borderRadius: "4px", cursor: "pointer" }}>Back</button>
              <button onClick={handleCreate} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Scaffold Website</button>
            </div>
          )}
        </div>
      )}

      {step === 7 && (
        <div>
          <h4 style={{ color: "#10b981" }}>✔ Website successfully created!</h4>
          <div style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "4px", marginBottom: "1.5rem" }}>
            <p><strong>Name:</strong> {siteName}</p>
            <p><strong>Business Category:</strong> {businessCategory}</p>
            <p><strong>Cloned Template:</strong> {selectedTemplate}</p>
            <p><strong>Theme Presets:</strong> {themePreset}</p>
          </div>
          <button onClick={() => window.location.hash = `/dashboard/studio/${siteName.toLowerCase().replace(/\s+/g, "-")}`} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Open Studio Editor
          </button>
        </div>
      )}
    </div>
  );
};
export default WebsiteWizard;
