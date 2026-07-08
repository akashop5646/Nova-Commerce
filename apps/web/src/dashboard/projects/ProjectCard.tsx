import React from "react";

export interface Project {
  id: string;
  name: string;
  businessType: string;
  templateName: string;
  subdomain: string;
  status: "Draft" | "Published";
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  return (
    <div style={{ border: "1px solid #eaeaea", borderRadius: "8px", padding: "1.5rem", position: "relative", backgroundColor: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{project.name}</h4>
        <span style={{
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          borderRadius: "4px",
          fontWeight: "bold",
          backgroundColor: project.status === "Published" ? "#e6fffa" : "#edf2f7",
          color: project.status === "Published" ? "#319795" : "#4a5568"
        }}>
          {project.status}
        </span>
      </div>
      <p style={{ fontSize: "0.85rem", color: "#718096", margin: "0.5rem 0" }}>
        Type: {project.businessType} | Template: {project.templateName}
      </p>
      <p style={{ fontSize: "0.85rem", color: "#4a5568", margin: "0.5rem 0" }}>
        Domain: <code>{project.subdomain}.klin.site</code>
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button onClick={() => onEdit(project.id)} style={{ flex: 1, padding: "0.5rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
          Edit Studio
        </button>
        <button onClick={() => onDelete(project.id)} style={{ padding: "0.5rem", backgroundColor: "#fff", color: "#e53e3e", border: "1px solid #fed7d7", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
          Delete
        </button>
      </div>
    </div>
  );
};
