"use client";

import { forwardRef, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import type { Project } from "@/types";

interface ProjectLibraryProps {
  initialProjectId?: string;
}

export function ProjectLibrary({ initialProjectId }: ProjectLibraryProps) {
  const initialIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === initialProjectId),
  );
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [openProjectId, setOpenProjectId] = useState<string | null>(initialProjectId ?? null);
  const bookRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const detailRef = useRef<HTMLElement>(null);

  const selectedProject = projects[selectedIndex] ?? projects[0];
  const openProject = projects.find((project) => project.id === openProjectId);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (openProject) {
        detailRef.current?.focus({ preventScroll: true });
        return;
      }

      bookRefs.current[selectedIndex]?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [openProject, selectedIndex]);

  const selectProject = (nextIndex: number) => {
    const boundedIndex = (nextIndex + projects.length) % projects.length;
    setSelectedIndex(boundedIndex);
  };

  const handleShelfKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectProject(selectedIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectProject(selectedIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        setSelectedIndex(0);
        break;
      case "End":
        event.preventDefault();
        setSelectedIndex(projects.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setOpenProjectId(selectedProject.id);
        break;
    }
  };

  if (openProject) {
    return (
      <ProjectDetail
        ref={detailRef}
        project={openProject}
        onBack={() => setOpenProjectId(null)}
      />
    );
  }

  return (
    <section className="project-library" aria-labelledby="project-library-title">
      <header className="project-library__header">
        <div>
          <span>[MOUNTED] /PROJECTS/LIBRARY</span>
          <h2 id="project-library-title">PROJECT ARCHIVE</h2>
        </div>
        <p aria-label="Keyboard instructions">[← →] SELECT&nbsp;&nbsp; [ENTER] OPEN</p>
      </header>

      <div
        className="project-library__shelf"
        role="group"
        aria-label="Project books"
        onKeyDown={handleShelfKeyDown}
      >
        <div className="project-library__books">
          {projects.map((project, index) => {
            const selected = index === selectedIndex;

            return (
              <button
                key={project.id}
                ref={(node) => {
                  bookRefs.current[index] = node;
                }}
                type="button"
                className={`project-book${selected ? " project-book--selected" : ""}`}
                tabIndex={selected ? 0 : -1}
                aria-pressed={selected}
                aria-label={`${project.title}. Volume ${String(index + 1).padStart(2, "0")}${selected ? ", selected" : ""}`}
                onClick={() => setSelectedIndex(index)}
                onDoubleClick={() => setOpenProjectId(project.id)}
              >
                <span className="project-book__catalog">VOL.{String(index + 1).padStart(2, "0")}</span>
                <span className="project-book__title">{project.title}</span>
                <span className="project-book__status">
                  {project.featured ? "FEATURED" : "ARCHIVED"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="project-library__selection" aria-live="polite">
        <p>
          <span>SELECTED // {selectedProject.id.padStart(2, "0")}</span>
          {selectedProject.title}
        </p>
        <p>{selectedProject.description}</p>
        <ul aria-label="Technologies">
          {selectedProject.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = forwardRef<HTMLElement, ProjectDetailProps>(function ProjectDetail(
  { project, onBack },
  ref,
) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onBack();
    }
  };

  return (
    <article
      ref={ref}
      className="project-detail"
      tabIndex={-1}
      aria-labelledby={`project-${project.id}-title`}
      onKeyDown={handleKeyDown}
    >
      <header className="project-detail__header">
        <div>
          <span>[OPEN] /PROJECTS/{project.id.padStart(2, "0")}.RECORD</span>
          <h2 id={`project-${project.id}-title`}>{project.title}</h2>
        </div>
        <span>{project.featured ? "FEATURED RECORD" : "ARCHIVED RECORD"}</span>
      </header>

      <div className="project-detail__body">
        <p className="project-detail__label">ABSTRACT</p>
        <p className="project-detail__description">{project.description}</p>

        <p className="project-detail__label">TECHNOLOGY INDEX</p>
        <ul className="project-detail__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project-detail__links">
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            SOURCE CODE ↗
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              LIVE SYSTEM ↗
            </a>
          )}
        </div>
      </div>

      <button type="button" className="project-detail__back" onClick={onBack}>
        ← RETURN TO LIBRARY <span>[ESC]</span>
      </button>
    </article>
  );
});
