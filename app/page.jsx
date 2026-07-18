 "use client";

import { useEffect, useState } from "react";
import { getProjects, saveInquiry } from "../src/database";

const projects = [
  { id: "01", title: "Noma / Field Notes", type: "Brand system · Digital", year: "2025", className: "project-blue", mark: "N/F", note: "A living identity for a new kind of travel journal." },
  { id: "02", title: "Forma Objects", type: "Art direction · Commerce", year: "2024", className: "project-coral", mark: "F.", note: "Turning everyday furniture into objects of desire." },
  { id: "03", title: "Otherworld Radio", type: "Product · Web experience", year: "2025", className: "project-dark", mark: "(( O ))", note: "A tactile listening room for independent sound." }
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className={diagonal ? "arrow diagonal" : "arrow"}>→</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const [projectList, setProjectList] = useState(projects);
  const [formStatus, setFormStatus] = useState("idle");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Freetown", hour12: false }).format(new Date()));
    update();
    const interval = setInterval(update, 30000);
    getProjects().then(setProjectList).catch(() => {});
    return () => clearInterval(interval);
  }, []);

  async function submitInquiry(event) {
    event.preventDefault();
    setFormStatus("sending");
    const form = event.currentTarget;
    try {
      await saveInquiry(Object.fromEntries(new FormData(form)));
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Alex Morgan, home">AM<span>®</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          <i />
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a href="mailto:hello@example.com" className="available"><span /> Available for projects</a>
      </nav>

      <header className="hero" id="top">
        <div className="hero-meta">
          <span>Independent creative</span>
          <span>Freetown · {time || "—"}</span>
        </div>
        <h1>
          <span>Designing</span>
          <span className="outline">bold ideas</span>
          <span className="offset">for the <em>screen.</em></span>
        </h1>
        <div className="hero-bottom">
          <p>I’m Alex — a digital designer and developer crafting identities, products, and websites with character.</p>
          <a className="round-link" href="#work" aria-label="See selected work"><Arrow diagonal /></a>
        </div>
        <div className="scroll-line"><span>Scroll to explore</span><i /></div>
      </header>

      <section className="work" id="work">
        <div className="section-kicker"><span>(01)</span><span>Selected work</span><span>2023—2025</span></div>
        <div className="projects">
          {projectList.map((project) => (
            <article className="project" key={project.id}>
              <a href="#contact" className={`project-visual ${project.className}`} aria-label={`View ${project.title} project`}>
                <div className="project-index">{project.id}</div>
                <div className="project-mark">{project.mark}</div>
                <div className="project-caption">{project.note}</div>
                <div className="project-arrow"><Arrow diagonal /></div>
              </a>
              <div className="project-info">
                <h2>{project.title}</h2>
                <p>{project.type}</p>
                <span>{project.year}</span>
              </div>
            </article>
          ))}
        </div>
        <a href="#contact" className="text-link">View all projects <Arrow /></a>
      </section>

      <section className="about" id="about">
        <div className="section-kicker light"><span>(02)</span><span>About me</span><span>Keep it human</span></div>
        <div className="about-grid">
          <div className="portrait" aria-label="Abstract portrait placeholder">
            <div className="portrait-face"><span /><i /></div>
            <p>Curious by nature.<br />Precise by practice.</p>
          </div>
          <div className="about-copy">
            <h2>Good work starts<br />with a good <em>question.</em></h2>
            <p>I partner with ambitious people to turn early ideas into clear, expressive digital experiences. My approach blends strategy, visual design, and code—so the final result feels as good as it works.</p>
            <div className="services">
              <h3>What I do</h3>
              <ul>
                <li><span>01</span>Creative direction</li>
                <li><span>02</span>Brand identity</li>
                <li><span>03</span>Web design & development</li>
                <li><span>04</span>Digital products</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <p>Strategy without craft is just a plan.</p>
        <div className="marquee"><span>IDEAS NEED ENERGY ✦ IDEAS NEED ENERGY ✦&nbsp;</span><span aria-hidden="true">IDEAS NEED ENERGY ✦ IDEAS NEED ENERGY ✦</span></div>
      </section>

      <footer id="contact">
        <div className="section-kicker footer-kicker"><span>(03)</span><span>Let’s talk</span><span>Open for select projects</span></div>
        <div className="footer-main">
          <div>
            <h2>Have an idea?<br /><em>Let’s make it move.</em></h2>
            <form className="contact-form" onSubmit={submitInquiry}>
              <label><span>Your name</span><input name="name" required placeholder="Jane Smith" /></label>
              <label><span>Email address</span><input name="email" type="email" required placeholder="jane@studio.com" /></label>
              <label className="wide"><span>Tell me about the project</span><textarea name="message" required rows="2" placeholder="A few words about your idea..." /></label>
              <button className="contact-button" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Saving..." : formStatus === "sent" ? "Message saved" : "Start a conversation"} <Arrow diagonal />
              </button>
              {formStatus === "error" && <p className="form-error">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <div><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Dribbble</a></div>
          <span>© 2026 Alex Morgan</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
