import { experiences, personal, skillCategories, skills } from "@/lib/data";

export function AboutOutput() {
  return (
    <section className="terminal-record" aria-labelledby="about-record-title">
      <RecordHeader path="/ABOUT/ALEXANDRO.PROFILE" title="PERSONNEL RECORD" />

      <dl className="terminal-record__metadata">
        <div>
          <dt>NAME</dt>
          <dd id="about-record-title">{personal.displayName}</dd>
        </div>
        <div>
          <dt>ROLE</dt>
          <dd>{personal.rol}</dd>
        </div>
        <div>
          <dt>FORMATION</dt>
          <dd>{personal.title}</dd>
        </div>
        <div>
          <dt>STATUS</dt>
          <dd className="terminal-record__online">AVAILABLE // BUILDING</dd>
        </div>
      </dl>

      <p className="terminal-record__body">{personal.bio}.</p>
      <TerminalLink href={personal.github}>OPEN GITHUB PROFILE ↗</TerminalLink>
    </section>
  );
}

export function SkillsOutput() {
  return (
    <section className="terminal-record" aria-labelledby="skills-record-title">
      <RecordHeader path="/SKILLS/TECH.INDEX" title="TECHNOLOGY ARCHIVE" />
      <h2 id="skills-record-title" className="sr-only">
        Skills
      </h2>

      <div className="skill-archive">
        {skillCategories.map((category, categoryIndex) => (
          <section key={category.key} className="skill-archive__group">
            <p className="skill-archive__heading">
              <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
              {category.label}
            </p>
            <ul className="skill-archive__items">
              {skills
                .filter((skill) => skill.category === category.key)
                .map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

export function ExperienceOutput() {
  return (
    <section className="terminal-record" aria-labelledby="experience-record-title">
      <RecordHeader path="/EXPERIENCE/TIMELINE.LOG" title="EXPERIENCE LOG" />
      <h2 id="experience-record-title" className="sr-only">
        Experience
      </h2>

      <ol className="experience-log">
        {experiences.map((experience, index) => (
          <li key={experience.id} className="experience-log__entry">
            <span className="experience-log__marker" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="experience-log__period">{experience.period}</p>
              <h3>{experience.role}</h3>
              <p className="experience-log__company">
                {experience.company}
                {" // "}
                {experience.type.toUpperCase()}
              </p>
              <p>{experience.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ContactOutput() {
  return (
    <section className="terminal-record" aria-labelledby="contact-record-title">
      <RecordHeader path="/CONTACT/CHANNELS.NET" title="COMMUNICATION CHANNELS" />
      <h2 id="contact-record-title" className="sr-only">
        Contact
      </h2>

      <p className="terminal-record__body">
        The following verified channels are currently indexed by this machine.
      </p>
      <div className="contact-channels">
        <TerminalLink href={personal.github}>GITHUB // CLONEEU ↗</TerminalLink>
        {personal.linkedin && (
          <TerminalLink href={personal.linkedin}>LINKEDIN // CONNECT ↗</TerminalLink>
        )}
        {personal.twitter && (
          <TerminalLink href={personal.twitter}>TWITTER // FOLLOW ↗</TerminalLink>
        )}
        {personal.email && (
          <TerminalLink href={`mailto:${personal.email}`}>EMAIL // SEND MESSAGE ↗</TerminalLink>
        )}
      </div>
    </section>
  );
}

function RecordHeader({ path, title }: { path: string; title: string }) {
  return (
    <header className="terminal-record__header">
      <span>[MOUNTED] {path}</span>
      <p>{title}</p>
    </header>
  );
}

function TerminalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = !href.startsWith("mailto:");

  return (
    <a
      className="terminal-link"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
