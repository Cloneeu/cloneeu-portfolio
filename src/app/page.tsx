import { HeroArtwork } from "@/components/portfolio/HeroArtwork";
import { KineticText } from "@/components/portfolio/KineticText";
import { PixelPortrait } from "@/components/portfolio/PixelPortrait";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { ProjectArtwork } from "@/components/portfolio/ProjectArtwork";
import { Reveal } from "@/components/portfolio/Reveal";
import { experiences, personal, projects, skillCategories, skills } from "@/lib/data";

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
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <PortfolioHeader />

      <main id="content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__gradient" aria-hidden="true" />
          <div className="page-shell hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">SOFTWARE ENGINEER / SYSTEMS ENGINEERING STUDENT</p>
              <h1 className="hero__title" id="hero-title" aria-label={`${personal.headline[0]} ${personal.headline[1]}`}>
                <KineticText text={personal.headline[0]} className="hero__title-sans" />
                <KineticText text={personal.headline[1]} className="hero__title-serif" />
              </h1>
              <p className="hero__intro">{personal.bio}</p>
              <div className="hero__actions">
                <a className="button" href="#work">
                  View my work <span aria-hidden="true">↓</span>
                </a>
                <a className="button button--outline" href={personal.github} target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <Reveal className="hero__visual" delay={0.12}>
              <HeroArtwork />
            </Reveal>
          </div>

          <div className="hero__ticker" aria-hidden="true">
            <span>BUILD</span>
            <span>TEST</span>
            <span>LEARN</span>
            <span>REPEAT</span>
          </div>
        </section>

        <section className="section section--about" id="about" aria-labelledby="about-title">
          <div className="page-shell">
            <SectionHeading number="01" label="About" />
            <div className="about-grid">
              <Reveal className="about-grid__portrait">
                <PixelPortrait />
              </Reveal>

              <Reveal className="about-grid__copy" delay={0.08}>
                <h2 className="section-display" id="about-title">
                  <KineticText text="Learning by making" />
                  <span className="section-display__serif"> things that work.</span>
                </h2>
                {personal.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <dl className="about-facts">
                  <div>
                    <dt>EDUCATION</dt>
                    <dd>Systems Engineering</dd>
                  </div>
                  <div>
                    <dt>FOCUS</dt>
                    <dd>Web + Software</dd>
                  </div>
                  <div>
                    <dt>APPROACH</dt>
                    <dd>Build to learn</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section--work" id="work" aria-labelledby="work-title">
          <div className="page-shell">
            <SectionHeading number="02" label="Selected work" />
            <div className="section-intro">
              <h2 className="section-display" id="work-title">
                <KineticText text="Things I’ve built" />
                <span className="section-display__serif"> while learning.</span>
              </h2>
              <p>Three projects, each exploring a different part of building useful and enjoyable software.</p>
            </div>
          </div>

          <div className="page-shell project-grid">
            {projects.map((project, index) => (
              <Reveal className="project-card" delay={index * 0.06} key={project.id}>
                <ProjectArtwork variant={project.artwork} />
                <div className="project-card__body">
                  <span className="project-card__number">0{index + 1}</span>
                  <h3>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <KineticText text={project.title} />
                      <span className="project-card__arrow" aria-hidden="true">↗</span>
                    </a>
                  </h3>
                  <p>{project.description}</p>
                  <ul className="tag-list" aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section section--skills" id="skills" aria-labelledby="skills-title">
          <div className="page-shell">
            <SectionHeading number="03" label="Skills" light />
            <div className="skills-heading">
              <h2 className="section-display" id="skills-title">
                <KineticText text="Tools I use" />
                <span className="section-display__serif"> to make ideas real.</span>
              </h2>
              <p>I choose tools around the problem, with a growing foundation across software, web, and systems.</p>
            </div>

            <div className="skills-grid">
              {skillCategories.map((category, categoryIndex) => {
                const categorySkills = skills.filter((skill) => skill.category === category.key);
                return (
                  <Reveal className="skill-column" delay={categoryIndex * 0.06} key={category.key}>
                    <p className="skill-column__label">
                      <span>0{categoryIndex + 1}</span>
                      {category.label}
                    </p>
                    <ul>
                      {categorySkills.map((skill) => (
                        <li key={skill.name}>{skill.name}</li>
                      ))}
                    </ul>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section--journey" id="journey" aria-labelledby="journey-title">
          <div className="page-shell">
            <SectionHeading number="04" label="Journey" />
            <div className="journey-layout">
              <h2 className="section-display" id="journey-title">
                <KineticText text="Still becoming" />
                <span className="section-display__serif"> a better engineer.</span>
              </h2>

              <div className="timeline">
                {experiences.map((experience) => (
                  <Reveal className="timeline-entry" key={experience.id}>
                    <div className="timeline-entry__meta">
                      <span>{experience.period}</span>
                      <span>{experience.type.toUpperCase()}</span>
                    </div>
                    <div>
                      <h3>{experience.role}</h3>
                      <p className="timeline-entry__place">{experience.company}</p>
                      <p>{experience.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact__gradient" aria-hidden="true" />
          <div className="page-shell contact__content">
            <p className="eyebrow">05 / LET’S CONNECT</p>
            <h2 id="contact-title">
              Find me on{" "}
              <a href={personal.github} target="_blank" rel="noreferrer">
                <KineticText text="GitHub." />
                <span aria-hidden="true">↗</span>
              </a>
            </h2>
            <p>Follow what I’m learning, browse the code, or see what I build next.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell">
          <span>© {new Date().getFullYear()} ALEXANDRO / CLONEEU</span>
          <span>DESIGNED TO KEEP LEARNING</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

function SectionHeading({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return (
    <div className={`section-marker${light ? " section-marker--light" : ""}`} aria-hidden="true">
      <span>{number}</span>
      <span>{label}</span>
      <span className="section-marker__line" />
    </div>
  );
}
