import { useEffect, useState } from "react";
import "./App.css";
import { Reveal } from "./components/Reveal";
import { LoadingOverlay } from "./components/LoadingOverlay";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description?: string;
};

const colorways = [
  {
    name: "Programming Languages",
    accent: "linear-gradient(160deg, #6bc6ff, #2563eb)",
    description: "Java • Python • C/C++ • Go • Rust • TypeScript • JavaScript • R",
  },
  {
    name: "Distributed Systems & Backend",
    accent: "linear-gradient(160deg, #020617, #1e293b)",
    description:
      "Spring Boot/MVC • REST APIs • Microservices • JPA/Hibernate • Kafka • SQS • SAP Commerce Cloud (Hybris) • Solr • MCP • Concurrency & Multithreading • Caching • Redis • LRU/LFU • API Design",
  },
  {
    name: "Cloud & DevOps",
    accent: "linear-gradient(160deg, #fef3c7, #facc15)",
    description:
      "AWS • S3 • EC2 • Lambda • Step Functions • API Gateway • IAM • DynamoDB • CloudWatch • Docker • Kubernetes • Git • Jenkins • GitHub Actions • Unix • SonarQube • Kibana • Dynatrace • Bitbucket • CI/CD Pipelines • Postman",
  },
  {
    name: "Databases",
    accent: "linear-gradient(160deg, #f8fafc, #cbd5f5)",
    description:
      "MySQL • PostgreSQL • DynamoDB • SQL Optimization • XML/JSON",
  },
  {
    name: "Data, AI & Tools",
    accent: "linear-gradient(160deg, #a78bfa, #8b5cf6)",
    description:
      "NumPy • pandas • scikit-learn • OpenCV • Hugging Face Transformers • GenAI • LangChain • Power BI • Translate • MS Office • PyTorch • TensorFlow",
  },
  {
    name: "Methodologies",
    accent: "linear-gradient(160deg, #34d399, #10b981)",
    description:
      "Agile/Scrum • SDLC • Test-Driven Development (TDD)",
  },
  {
    name: "Systems Knowledge",
    accent: "linear-gradient(160deg, #fb7185, #f43f5e)",
    description:
      "Load Balancing • Replication • Partitioning & Sharding • Event-Driven Architecture • Message Queues • JVM Profiling • GC tuning • heap/CPU analysis • HTTP/2 • gRPC • Distributed Tracing • SLIs/SLOs/Error Budgets • On-Call Operations",
  },
];

const performance = [
  {
    stat: "SupportSafeAI",
    label:
      "Built for HackRx 3.0, it won 1st prize for its real-world impact and privacy-centric safety design. SupportSafeAI empowers vulnerable users to seek help discreetly — without alerting abusers. It is an AI-native safety platform that detects hidden SOS messages, decodes steganographic distress signals, and delivers real-time legal, mental-health, and emergency support through secure, encrypted channels.",
  },
  {
    stat: "TripMind.AI",
    label:
      "Built for HackPrinceton 2025, it won 3rd prize for its real-world APIs and intelligent orchestration. Tell us your dream trip. TripMind plans it, optimizes it, and books it — automatically. TripMind is an AI-native multi-agent travel planner that turns natural-language input into full itineraries with stays, activities, routes, and budgets.",
  },
  {
    stat: "SafeArt",
    label:
      "SafeArt is a cloud-native AI poster compliance system that detects nudity, violence, unsafe text, and layout violations. Built with FastAPI, AWS (S3, Bedrock Nova, Rekognition), DynamoDB, and Redis, it delivers automated scoring, policy checks, audit logs, and a modern compliance dashboard.",
  },
  {
    stat: "EventBooker-Pro",
    label:
      "A production-grade Event Booker Project featuring multi-city movie discovery, dynamic pricing, real-time seat locking, promo engine, and secure payments. Built with Spring Boot, JPA, and MySQL, it models cinemas, halls, slots, and user workflows with scalable, extensible architecture.",
  },
  {
    stat: "MovieMatch-Studio",
    label:
      "MovieMatch-Studio is a content-based movie recommender built on the TMDB dataset, using metadata fusion and cosine similarity to deliver precise, context-aware suggestions. Includes a Flask API, feature engineering pipeline, and modular design for TF-IDF or embedding-based upgrades.",
  },
];

const sections = [
  {
    title: "PROFESSIONAL SUMMARY",
    kicker: "Who I am",
    description:
      "Software Engineer with 3+ years of experience designing and operating large-scale, distributed backend systems. Specialized in building highly available microservices using Java, Spring Boot, and AWS, with a focus on low-latency execution, fault tolerance, and rigorous operational excellence. Proven ability to improve system throughput, reduce tail latencies, and optimize data-intensive workloads through caching, query tuning, asynchronous processing, and resilient cloud architectures. Experienced across the full service lifecycle—architecture, implementation, automated testing, CI/CD, observability, and on-call rotations. Passionate about systems design, cloud infrastructure, concurrency, and leveraging emerging AI/LLM tooling to accelerate developer productivity and build smarter, self-optimizing services.",
  },
  {
    title: "TECHNICAL PROJECTS",
    kicker: "What I build",
    description:
      "Selected projects demonstrating cloud-native design, scalable backends, and ML applications.",
  },
  {
    title: "PROFESSIONAL EXPERIENCE",
    kicker: "Where I worked",
    description:
      "End‑to‑end ownership across microservices, integrations, CI/CD, and production operations.",
  },
];

function getSkillIcon(name: string) {
  const commonProps = { width: 88, height: 88, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as any;
  switch (name) {
    case "Programming Languages":
      return (
        <svg {...commonProps} aria-hidden="true">
          <path d="M8 6 3 12l5 6" />
          <path d="m16 6 5 6-5 6" />
          <circle cx="12" cy="12" r="2.25" />
        </svg>
      );
    case "Distributed Systems & Backend":
      return (
        <svg {...commonProps} aria-hidden="true">
          <rect x="3" y="4" width="18" height="5" rx="1.5" />
          <rect x="3" y="10" width="18" height="5" rx="1.5" />
          <rect x="3" y="16" width="18" height="4" rx="1.5" />
          <path d="M7 6h.01M7 12h.01M7 18h.01" />
        </svg>
      );
    case "Cloud & DevOps":
      return (
        <svg {...commonProps} aria-hidden="true">
          <path d="M7 16a4 4 0 0 1 0-8 5 5 0 0 1 9.7-1.2A4.5 4.5 0 1 1 17 16H7Z" />
          <path d="M12 13.5v3" />
          <path d="M10.5 15h3" />
        </svg>
      );
    case "Databases":
      return (
        <svg {...commonProps} aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "Data, AI & Tools":
      return (
        <svg {...commonProps} aria-hidden="true">
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="4" />
          <path d="M8 8l8 8M8 16l8-8" />
        </svg>
      );
    case "Methodologies":
      return (
        <svg {...commonProps} aria-hidden="true">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case "Systems Knowledge":
      return (
        <svg {...commonProps} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9h6M9 15h6M9 12h6" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Certification 1",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/1.png",
  },
  {
    id: "cert-2",
    title: "Certification 2",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/2.png",
  },
  {
    id: "cert-3",
    title: "Certification 3",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/3.png",
  },
  {
    id: "cert-4",
    title: "Certification 4",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/4.png",
  },
  {
    id: "cert-5",
    title: "Certification 5",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/5.png",
  },
  {
    id: "cert-6",
    title: "Certification 6",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/6.png",
  },
  {
    id: "cert-7",
    title: "Certification 7",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/7.png",
  },
  {
    id: "cert-8",
    title: "Certification 8",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/8.png",
  },
  {
    id: "cert-8-1",
    title: "Certification 8.1",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/8.1.png",
  },
  {
    id: "cert-9",
    title: "Certification 9",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/9.png",
  },
  {
    id: "cert-10",
    title: "Certification 10",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/10.png",
  },
  {
    id: "cert-11",
    title: "Certification 11",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/11.png",
  },
  {
    id: "cert-12",
    title: "Certification 12",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/12.png",
  },
  {
    id: "cert-12-1",
    title: "Certification 12.1",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/12.1.png",
  },
  {
    id: "cert-13",
    title: "Certification 13",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/13.png",
  },
  {
    id: "cert-14",
    title: "Certification 14",
    issuer: "Issuing Organization",
    date: "Date",
    image: "/certifications/14.png",
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 7200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = "dark";
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  const projectLinks: Record<string, string> = {
    "TripMind.AI": "https://github.com/bugfree-kartik/TripMind.AI",
    "SafeArt": "https://github.com/bugfree-kartik/SafeArt-AIPosterComplianceSystem",
    "EventBooker-Pro": "https://github.com/bugfree-kartik/EventBooker-Pro",
    "MovieMatch-Studio": "https://github.com/bugfree-kartik/MovieMatch-Studio",
    "SupportSafeAI": "https://github.com/bugfree-kartik/SupportSafeAI",
  };

  return (
    <>
      <LoadingOverlay isComplete={!isLoading} />
      <div className={`page ${isLoading ? "page--loading" : "page--ready"}`}>
        <header className="nav">
          <div className="nav__left">
            <span className="nav__badge">Kartik Pagey</span>
            <span className="nav__tagline">Aspiring Full Stack Data Scientist</span>
          </div>
          <div className="nav__social">
            <a href="/resume.pdf" download="Kartik_Pagey_Resume.pdf" className="nav__resume">Download Resume</a>
            <a href="https://www.linkedin.com/in/kartik-pagey/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://github.com/bugfree-kartik" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
          </div>
          <nav className="nav__links" aria-label="Primary navigation">
            <a href="#about">Summary</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#certifications">Skills</a>
            <a href="#certs">Certifications & Achievements</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main>

        <section id="about" className="section section--design">
            <Reveal className="section-popup" threshold={0.15}>
              <Reveal as="header" className="section__header" threshold={0.1}>
                <h2>{sections[0].title}</h2>
              </Reveal>
              <div className="summary__grid">
                <div className="summary__content">
                  <p className="section__lead">{sections[0].description}</p>
                </div>
                <div className="summary__photo">
                  <img
                    src="/profile.JPG"
                    alt="Profile"
                    className="summary__photo-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </section>

        <section id="experience" className="section section--battery">
            <Reveal className="section-popup" threshold={0.15}>
              <Reveal as="header" className="section__header" threshold={0.1}>
                <h2>{sections[2].title}</h2>
                <p className="section__lead">{sections[2].description}</p>
              </Reveal>

              <div className="battery__grid">
                <Reveal className="battery__features">
                  <img src="/pwc-logo.png" alt="PwC" className="battery__logo" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <h3>PricewaterhouseCoopers — Oct 2022 – Jul 2025</h3>
                  <p className="battery__job-title">Software Engineer <span className="battery__awards">• 3× PwC 'Star' Awards, 1x 'Above N Beyond' Award</span></p>
                  <ul>
                    <li>Engineered fault-tolerant distributed microservices using Java, Spring Boot, REST, improving global retail transaction throughput by 27% through async pipelines, caching strategies, and optimized concurrency/thread-pools.</li>
                    <li>Developed secure OAuth2 client-credential and JWT-based integration frameworks between SAP Commerce and external systems, achieving 84%+ cross-system success and strengthening API authorization pathways.</li>
                    <li>Designed multi-stage CI/CD systems (Git, Jenkins, Cloud Commerce) with automated regression suites, canary/blue-green deployments, and environment-isolated rollouts; reduced deployment effort by 34% and increased production stability using Kibana/Dynatrace.</li>
                    <li>Refactored core service modules using a modular, domain-driven architecture, reducing median API latency by ~16ms, improving throughput, and raising engineering productivity by 19%.</li>
                    <li>Implemented end-to-end observability—distributed tracing, structured logs, correlation IDs, and actionable alerting—reducing incident root-cause analysis time by 40% and stabilizing on-call performance.</li>
                    <li>Re-architected synchronous API chains into resilient async event-driven workflows (retry, exponential backoff, DLQ redrive), eliminating cascading failures during peak load and enhancing system fault-tolerance across services.</li>
                  </ul>
                </Reveal>
                <Reveal className="battery__features" delay={30}>
                  <img src="/cognizant-logo.png" alt="Cognizant" className="battery__logo" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <h3>Cognizant Technology Solutions — Nov 2020 – Oct 2022</h3>
                  <p className="battery__job-title">Software Engineer</p>
                  <ul>
                    <li>Developed robust backend integration services powering multi-system workflows; improved cross-service responsiveness by restructuring request lifecycles, reducing unnecessary remote calls, and enforcing lightweight DTOs.</li>
                    <li>Optimized relational database performance by redesigning query access patterns, implementing batching primitives, and restructuring table indexes—achieving ~20% faster transactional read/write operations without impacting consistency models.</li>
                    <li>Strengthened service correctness by building contract-testing pipelines (JUnit, Mockito, TestContainers) that validated API schemas and payloads across environments, preventing downstream integration regressions during release cycles.</li>
                    <li>Designed and enforced API governance rules—versioning standards, schema validation layers, and deprecation workflows—reducing cross-team integration defects and improving platform interoperability.</li>
                    <li>Integrated operational health mechanisms, including custom metric counters, SLA-aware health endpoints, and dynamic readiness probes, enabling earlier detection of partial service degradation before it propagated upstream.</li>
                    <li>Resolved performance bottlenecks through deep JVM profiling (GC tuning, heap analysis, thread-state evaluation), addressing allocation hotspots and improving service stability during sustained load.</li>
                  </ul>
                </Reveal>
              </div>
            </Reveal>
          </section>

        <section id="projects" className="section section--performance">
            <Reveal className="section-popup" threshold={0.15}>
              <Reveal as="header" className="section__header" threshold={0.1}>
                <h2>{sections[1].title}</h2>
              </Reveal>

              <div className="performance__grid">
                <div className="performance__stats">
                  {performance.map((item, index) => (
                    <Reveal
                      key={item.label}
                      className="stat"
                      delay={index * 30}
                    >
                      {projectLinks[item.stat] ? (
                        <a href={projectLinks[item.stat]} target="_blank" rel="noreferrer" className="stat__link">
                          <div className="stat__header">
                            <span className="stat__value">{item.stat}</span>
                            {(item.stat === "SupportSafeAI" || item.stat === "TripMind.AI") && (
                              <span className={`stat__badge ${item.stat === "SupportSafeAI" ? "stat__badge--first" : "stat__badge--third"}`}>
                                {item.stat === "SupportSafeAI" ? "1st Prize" : "3rd Prize"}
                              </span>
                            )}
                          </div>
                          <span className="stat__label">{item.label}</span>
                        </a>
                      ) : (
                        <>
                          <div className="stat__header">
                            <span className="stat__value">{item.stat}</span>
                            {(item.stat === "SupportSafeAI" || item.stat === "TripMind.AI") && (
                              <span className={`stat__badge ${item.stat === "SupportSafeAI" ? "stat__badge--first" : "stat__badge--third"}`}>
                                {item.stat === "SupportSafeAI" ? "1st Prize" : "3rd Prize"}
                              </span>
                            )}
                          </div>
                          <span className="stat__label">{item.label}</span>
                        </>
                      )}
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

        <section id="certifications" className="section section--colors">
            <Reveal className="section-popup" threshold={0.15}>
              <Reveal as="header" className="section__header" threshold={0.1}>
                <h2>TECHNICAL SKILLS</h2>
              </Reveal>

              <div className="colors__grid">
                {colorways.map((color, index) => (
                  <Reveal
                    key={color.name}
                    className="color-card"
                    delay={index * 40}
                  >
                    <div className="color-card__swatch" aria-hidden="true">
                      {getSkillIcon(color.name)}
                    </div>
                    <span className="color-card__name">{color.name}</span>
                    {"description" in color ? (
                      <div className="skill-chips">
                        {(color as any).description
                          .split("•")
                          .map((item: string) => item.trim())
                          .filter(Boolean)
                          .map((item: string) => (
                            <span className="skill-chip" key={`${color.name}-${item}`}>
                              {item}
                            </span>
                          ))}
                      </div>
                    ) : null}
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </section>

        <section id="certs" className="section section--design">
            <Reveal className="section-popup" threshold={0.15}>
              <Reveal as="header" className="section__header" threshold={0.1}>
                <h2>CERTIFICATIONS & ACHIEVEMENTS</h2>
              </Reveal>
              <div className="certs__grid">
                {certifications.map((cert, index) => (
                  <Reveal
                    key={cert.id}
                    className="cert__item"
                    delay={index * 20}
                  >
                    <div
                      className="cert__card"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <div className="cert__image-wrapper">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="cert__image"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const placeholder = e.currentTarget.parentElement?.querySelector(".cert__placeholder");
                            if (placeholder) (placeholder as HTMLElement).style.display = "flex";
                          }}
                        />
                        <div className="cert__placeholder" style={{ display: "none" }}>
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 9h6v6H9z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </section>

          {selectedCert && (
            <div
              className="cert__modal"
              onClick={() => setSelectedCert(null)}
            >
              <div
                className="cert__modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="cert__modal-close"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="cert__modal-image"
                  loading="eager"
                />
              </div>
            </div>
          )}

        <section id="education" className="section section--cta">
            <Reveal className="section-popup" threshold={0.15}>
              <Reveal as="header" className="section__header" threshold={0.1}>
                <h2>WHERE I STUDIED</h2>
              </Reveal>
              <div className="edu">
                <div className="edu__item">
                  <div className="edu__badge">M.S.</div>
                  <div className="edu__body">
                    <div className="edu__header">
                      <h3 className="edu__title">Stony Brook University</h3>
                      <span className="edu__meta">Aug 2025 – May 2027 · Stony Brook, NY</span>
                    </div>
                    <p className="edu__degree">Master of Science in Data Science</p>
                    <p className="edu__coursework">Coursework: Distributed Systems, Cloud Computing, Computer Vision, Data Structures & Algorithms, Database Systems</p>
                  </div>
                </div>
                <div className="edu__item">
                  <div className="edu__badge">B.E.</div>
                  <div className="edu__body">
                    <div className="edu__header">
                      <h3 className="edu__title">Savitribai Phule Pune University</h3>
                      <span className="edu__meta">Aug 2016 – May 2020 · Pune, India</span>
                    </div>
                    <p className="edu__degree">Electronics & Telecommunications</p>
                    <p className="edu__coursework">Coursework: Operating Systems, Object‑Oriented Programming, Computer Networks & Security, Machine Learning</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </main>

        <footer id="contact" className="footer">
          <div className="footer__content">
            <div className="footer__links">
              <a href="#about">Summary</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#certifications">Skills</a>
              <a href="#certs">Certifications & Achievements</a>
              <a href="#education">Education</a>
              <a href="/resume.pdf" download="Kartik_Pagey_Resume.pdf">Download Resume</a>
            </div>
            <div className="footer__social">
              <a href="https://www.linkedin.com/in/kartik-pagey/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://github.com/bugfree-kartik" target="_blank" rel="noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
            <span>
              Stony Brook, NY 11790 &nbsp;|&nbsp;{" "}
              <a href="tel:+17325896422">+1 (732) 589‑6422</a> &nbsp;|&nbsp;{" "}
              <a href="mailto:kartik.pagey.dev@gmail.com">kartik.pagey.dev@gmail.com</a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
