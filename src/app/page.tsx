import { TerminalShell } from "@/components/terminal/TerminalShell";
import { personal, projects, skills } from "@/lib/data";

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.displayName,
  alternateName: "Cloneeu",
  jobTitle: personal.rol,
  description: personal.bio,
  sameAs: [personal.github],
  knowsAbout: skills.map((skill) => skill.name),
};

export default function Home() {
  return (
    <>
      <TerminalShell />

      <noscript>
        <main className="noscript-portfolio">
          <p>CLONEEU PERSONAL COMPUTER SYSTEM</p>
          <h1>{personal.displayName} — {personal.rol}</h1>
          <p>{personal.bio}.</p>
          <h2>Projects</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <a href={project.githubUrl}>{project.title}</a>
                <span>{project.description}</span>
              </li>
            ))}
          </ul>
          <a href={personal.github}>GitHub profile</a>
          <p>Enable JavaScript to use the interactive terminal.</p>
        </main>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
