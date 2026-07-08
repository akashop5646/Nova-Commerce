import React from "react";
import { Project, ProjectCard } from "./ProjectCard";
export type { Project };

interface ProjectListProps {
  projects: Project[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", border: "2px dashed #eaeaea", borderRadius: "8px" }}>
        <p style={{ color: "#718096" }}>No website projects found in this workspace.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
