import React, { useState } from "react";
import { Project, ProjectList } from "../projects/ProjectList";

export const DashboardOverview: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "site-1",
      name: "Acme Portfolio",
      businessType: "Portfolio",
      templateName: "Minimal Agency Theme",
      subdomain: "acme-portfolio",
      status: "Published",
      updatedAt: "2026-07-08T12:00:00Z"
    },
    {
      id: "site-2",
      name: "My Bistro Page",
      businessType: "Restaurant",
      templateName: "Classic Gourmet Template",
      subdomain: "mybistro",
      status: "Draft",
      updatedAt: "2026-07-08T10:30:00Z"
    }
  ]);

  const handleEdit = (id: string) => {
    window.location.hash = `/dashboard/studio/${id}`;
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2>Workspace Dashboard</h2>
        <button onClick={() => window.location.hash = "/dashboard/projects/create"} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Create New Website
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 250px", gap: "2rem" }}>
        {/* Main Column */}
        <div>
          <h3 style={{ borderBottom: "1px solid #eaeaea", paddingBottom: "0.5rem" }}>Active Website Projects</h3>
          <ProjectList projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        {/* Sidebar Info Panel */}
        <div style={{ backgroundColor: "#f7fafc", padding: "1.5rem", borderRadius: "8px", border: "1px solid #edf2f7" }}>
          <h4 style={{ margin: "0 0 1rem 0" }}>Recent Deployments</h4>
          <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "#4a5568", lineHeight: "1.6" }}>
            <li>acme-portfolio (V3) - Just now</li>
            <li>mybistro (V1) - 2 hours ago</li>
          </ul>
          <h4 style={{ margin: "1.5rem 0 1rem 0" }}>System Notifications</h4>
          <p style={{ fontSize: "0.8rem", color: "#718096" }}>
            All systems operational. Telemetry signals reporting 100% build health scores.
          </p>
        </div>
      </div>
    </div>
  );
};
export default DashboardOverview;
