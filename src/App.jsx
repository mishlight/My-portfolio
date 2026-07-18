import { useEffect, useState } from "react";
import { getProjects, saveInquiry } from "./database";

const projects = [
  { id: "01", title: "YUMMY Restaurant", type: "Django · SQLite · JavaScript", year: "2025", className: "project-blue", mark: "Y.", note: "Full-stack ordering with authentication, payments, tracking and a custom admin dashboard." },
  { id: "02", title: "UniConnect", type: "Next.js · Django REST · PostgreSQL", year: "2025", className: "project-coral", mark: "U/C", note: "A real-time university social and study platform built for connection and collaboration." },
  { id: "03", title: "FreshBasket", type: "React Native · Expo Router", year: "2025", className: "project-dark", mark: "F/B", note: "A responsive grocery shopping experience with search, favourites, cart and profiles." }
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
        <a className="brand" href="#top" aria-label="Mishael Sellu, home">MS<span>®</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          <i />
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a href="mailto:mishaelsellu68@gmail.com" className="available"><span /> Available for projects</a>
      </nav>

      <header className="hero" id="top">
        <div className="hero-meta">
          <span>Software developer</span>
          <span>Freetown · {time || "—"}</span>
        </div>
        <div className="hero-photo">
          <img src="/images/mishael-full.jpg" alt="Mishael Sellu in formal attire" />
          <span>Freetown, Sierra Leone</span>
        </div>
        <h1>
          <span>Designing</span>
          <span className="outline">bold ideas</span>
          <span className="offset">with <em>purpose.</em></span>
        </h1>
        <div className="hero-bottom">
          <p>I’m Mishael — a computer science student and developer building practical web, mobile, and database solutions.</p>
          <a className="round-link" href="#work" aria-label="See selected work"><Arrow diagonal /></a>
        </div>
        <div className="scroll-line"><span>Scroll to explore</span><i /></div>
      </header>

      <section className="work" id="work">
        <div className="section-kicker"><span>(01)</span><span>Selected work</span><span>2023—2025</span></div>
        <div className="projects">
          {projectList.map((project) => (
            <article className="project" key={project.id}>
              <a href="https://github.com/mishlight" target="_blank" rel="noreferrer" className={`project-visual ${project.className}`} aria-label={`View ${project.title} project`}>
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
        <a href="https://github.com/mishlight" target="_blank" rel="noreferrer" className="text-link">Visit my GitHub <Arrow /></a>
      </section>

      <section className="about" id="about">
        <div className="section-kicker light"><span>(02)</span><span>About me</span><span>Keep it human</span></div>
        <div className="about-grid">
          <div className="portrait photo-portrait">
            <img src="/images/mishael-portrait.jpg" alt="Mishael Sellu wearing a black suit" />
            <p>Curious by nature.<br />Precise by practice.</p>
          </div>
          <div className="about-copy">
            <h2>Technology should<br />solve a real <em>problem.</em></h2>
            <p>I’m studying Computer Science at Central University, with an expected graduation in 2027. I build full-stack web and mobile applications, design databases, and bring field research experience from Innovations for Poverty Action in Sierra Leone.</p>
            <div className="services">
              <h3>What I do</h3>
              <ul>
                <li><span>01</span>Full-stack web development</li>
                <li><span>02</span>React Native mobile apps</li>
                <li><span>03</span>Database design & APIs</li>
                <li><span>04</span>Research & data collection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <p>Practical ideas. Reliable technology. Meaningful impact.</p>
        <div className="marquee"><span>BUILD · LEARN · IMPROVE ✦ BUILD · LEARN · IMPROVE ✦&nbsp;</span><span aria-hidden="true">BUILD · LEARN · IMPROVE ✦ BUILD · LEARN · IMPROVE ✦</span></div>
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
          <span>© 2026 Mishael Sellu</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
