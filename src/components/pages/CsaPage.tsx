import React, { useEffect } from 'react';

const CsaPage: React.FC = () => {
  useEffect(() => {
    // set year
    const setYear = () => {
      const y = document.getElementById('year');
      if (y) y.textContent = String(new Date().getFullYear());
    };
    setYear();

    // IntersectionObserver for reveal animations
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | null = null;
    if (!prefersReduced && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal').forEach(el => io?.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    // Back to top
    const toTop = document.getElementById('toTop');
    const onTopClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const onScroll = () => {
      if (!toTop) return;
      if (window.scrollY > 400) (toTop as HTMLElement).style.display = 'inline-block';
      else (toTop as HTMLElement).style.display = 'none';
    };
    toTop?.addEventListener('click', onTopClick);
    window.addEventListener('scroll', onScroll);
    if (toTop) (toTop as HTMLElement).style.display = 'none';

    // Smooth offset for hash links (if fixed header present)
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
    const anchorHandler = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute('href') || '';
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          const y = el.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };
    anchors.forEach(a => a.addEventListener('click', anchorHandler));

    // cleanup
    return () => {
      if (io) {
        document.querySelectorAll('.reveal').forEach(el => io?.unobserve(el));
        io.disconnect();
      }
      toTop?.removeEventListener('click', onTopClick);
      window.removeEventListener('scroll', onScroll);
      anchors.forEach(a => a.removeEventListener('click', anchorHandler));
    };
  }, []);

  return (
    <div className="csa-page">
      <style>{`
    :root{
      --blue-900:#4a1a1a;
      --blue-700:#800000;
      --blue-500:#b22222;
      --muted:#fdf8f8;
      --text:#2d1010;
      --glass: rgba(255,255,255,0.55);
      --card-shadow: 0 6px 20px rgba(128,0,0,0.08);
      --radius:12px;
      --max-width:1100px;
      font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    }
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;color:var(--text);background:linear-gradient(180deg,var(--muted),#fff);-webkit-font-smoothing:antialiased}
    a{color:inherit}

    /* Container */
    .container{max-width:var(--max-width);margin:0 auto;padding:1rem}

  /* Header */
  header{background:linear-gradient(90deg,rgba(128,0,0,0.08),transparent);backdrop-filter:blur(4px)}
    .nav{display:flex;align-items:center;justify-content:space-between;padding:1rem 0}
    .brand{display:flex;gap:0.75rem;align-items:center}
  .logo{width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;background:linear-gradient(135deg,#800000,#b22222);box-shadow:0 6px 18px rgba(176,34,34,0.18);color:white;font-weight:700}
    nav ul{Display:flex;gap:1rem;list-style:none;margin:0;padding:0}
    nav a{padding:0.5rem 0.75rem;border-radius:8px;color:var(--blue-900);text-decoration:none;font-weight:600}
    nav a:hover, nav a:focus{background:var(--glass);outline:none}
    .cta{background:var(--blue-700);color:white;padding:0.5rem 0.9rem;border-radius:10px;box-shadow:var(--card-shadow);transition:transform .18s ease, box-shadow .18s}
    .cta:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(128,0,0,0.18)}

    /* Hero */
    .hero{display:grid;grid-template-columns:1fr 420px;gap:2rem;align-items:center;padding:3rem 0}
    .hero-inner h1{font-size:2.1rem;margin:0 0 0.5rem;color:var(--blue-900);line-height:1.05}
    .hero-inner p{margin:0 0 1.25rem;color:#334155}
    .hero-actions{display:flex;gap:0.75rem;align-items:center}
    .hero-figure{background:linear-gradient(180deg,#ffffff, var(--muted));border-radius:16px;padding:1rem;box-shadow:var(--card-shadow)}
    .feature-list{display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem}

    /* Sections */
    section{padding:2.5rem 0}
    h2.section-title{font-size:1.25rem;margin:0 0 1rem;color:var(--blue-900)}
    .card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
  .card{background:white;border-radius:12px;padding:1rem;box-shadow:var(--card-shadow);transition:transform .18s, box-shadow .18s}
    .card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(128,0,0,0.09)}
    .card h3{margin:0 0 0.5rem;font-size:1rem}
    .muted{color:#6b7280;font-size:0.95rem}

  .card-thumb{width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:0.6rem}

  .hero-image{width:100%;height:100%;max-height:350px;object-fit:cover;border-radius:12px;display:block}

    .avatar-img{width:84px;height:84px;border-radius:50%;object-fit:cover;display:block;margin-bottom:0.5rem;box-shadow:0 8px 20px rgba(128,0,0,0.08)}    /* Team */
    .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
    .person{display:flex;flex-direction:column;align-items:center;padding:1rem;text-align:center}
    .avatar{width:84px;height:84px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--blue-700),var(--blue-500));color:white;font-weight:700;margin-bottom:0.5rem}

    /* Contact */
    .contact-grid{display:grid;grid-template-columns:1fr 380px;gap:1rem;align-items:start}
    form{display:flex;flex-direction:column;gap:0.6rem}
    label{font-size:0.9rem}
    input,textarea{padding:0.65rem;border-radius:8px;border:1px solid #e6eefc;background:white}
    input:focus,textarea:focus{outline:2px solid rgba(128,0,0,0.12);border-color:var(--blue-700)}

    /* Footer */
    footer{padding:2rem 0;border-top:1px solid #eef3ff;margin-top:2rem}
    .footer-grid{display:flex;justify-content:space-between;align-items:center;gap:1rem}

    /* Back to top */
    .to-top{position:fixed;right:18px;bottom:18px;background:var(--blue-700);color:white;border-radius:999px;padding:0.6rem 0.8rem;box-shadow:0 10px 30px rgba(128,0,0,0.18);cursor:pointer;border:none}

    /* Responsive */
    @media (max-width:1000px){.hero{grid-template-columns:1fr}.card-grid{grid-template-columns:repeat(2,1fr)}.team-grid{grid-template-columns:repeat(2,1fr)}.contact-grid{grid-template-columns:1fr}}
    @media (max-width:640px){nav ul{display:none}.container{padding:1rem}.card-grid{grid-template-columns:1fr}.team-grid{grid-template-columns:1fr}.hero-inner h1{font-size:1.6rem}.brand .logo{width:42px;height:42px}}

    /* Reduce motion preference */
    @media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}

    /* Reveal animation helper */
    .reveal{opacity:0;transform:translateY(12px);transition:opacity .65s ease, transform .65s ease}
    .reveal.visible{opacity:1;transform:none}
  `}</style>

      <header>
        <div className="container nav">
          <div className="brand">
            <div className="logo" aria-hidden="true">CSA</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--blue-900)' }}>Computer Science Association</div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>SSIPMT</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Hero */}
        <section id="home" className="hero">
          <div className="hero-inner reveal">
            <h1>Empowering Coders and Innovators</h1>
            <p>CSA at SSIPMT brings together students and faculty to learn, build, and showcase technology ΓÇö through workshops, hackathons, and mentorship.</p>
            <div className="hero-actions">
              <a className="cta" href="#events">Explore Events</a>
              <a style={{ padding: '.5rem .75rem', borderRadius: 8, background: 'transparent', border: '1px solid var(--blue-700)', color: 'var(--blue-700)', textDecoration: 'none', fontWeight: 600 }} href="#about">About CSA</a>
            </div>
            <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'linear-gradient(90deg,rgba(11,87,208,0.04),transparent)', padding: '.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20v-6" stroke="var(--blue-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.5 14.5l5.5-3.5 5.5 3.5" stroke="var(--blue-500)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <div style={{ fontWeight: 600 }}>Workshops & Hackathons</div>
              </div>
            </div>
          </div>
          <aside className="hero-figure reveal" aria-hidden="true">
            <img className="hero-image" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" alt="Students collaborating on code" loading="lazy" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', display: 'block' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.7rem', gap: '0.5rem' }}>
              <div style={{ flex: 1, background: 'linear-gradient(180deg,#fff,#f8fbff)', padding: '.6rem', borderRadius: '10px', display: 'flex', gap: '.6rem', alignItems: 'center' }}>
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Hackathon event" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Hackathon</div>
                  <div className="muted" style={{ fontSize: '.85rem' }}>Nov 2025</div>
                </div>
              </div>
              <div style={{ flex: 1, background: 'linear-gradient(180deg,#fff,#f8fbff)', padding: '.6rem', borderRadius: '10px', display: 'flex', gap: '.6rem', alignItems: 'center' }}>
                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="AI Workshop" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>AI Workshop</div>
                  <div className="muted" style={{ fontSize: '.85rem' }}>Dec 2025</div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* About */}
        <section id="about" className="reveal">
          <h2 className="section-title">About CSA</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1rem', alignItems: 'start' }}>
            <div>
              <p style={{ marginTop: 0 }}>Our mission is to foster a culture of learning and innovation by providing students opportunities to build real-world projects, collaborate with peers, and gain industry-relevant skills.</p>
              <p className="muted">We organize regular workshops, mentorship programs, project sprints, and hackathons that help members gain practical experience. CSA connects students with faculty mentors and industry professionals to create a bridge between academic learning and real-world engineering challenges.</p>

              <h3 style={{ marginBottom: '.25rem' }}>Vision</h3>
              <p className="muted">To be a leading student community that inspires technological excellence and ethical innovation. We envision CSA as a launchpad for future engineers and founders ΓÇö a place where ideas are transformed into meaningful projects that positively impact society.</p>

              <h3 style={{ marginBottom: '.25rem' }}>Objectives</h3>
              <ul className="muted">
                <li><strong>Hands-on Learning:</strong> Host workshops, bootcamps, and hackathons to teach practical skills.</li>
                <li><strong>Project Mentorship:</strong> Pair students with faculty and industry mentors to build portfolio projects.</li>
                <li><strong>Industry Collaboration:</strong> Build partnerships with companies for talks, internships, and live projects.</li>
                <li><strong>Community & Inclusion:</strong> Foster a welcoming environment that encourages contributions from beginners to advanced students.</li>
                <li><strong>Research & Open Source:</strong> Support research initiatives and encourage members to publish or contribute to open-source projects.</li>
              </ul>
            </div>
            <div style={{ background: 'linear-gradient(180deg,#fff,#f6f9ff)', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
              <strong>Member benefits</strong>
              <ul className="muted">
                <li>Access to workshops</li>
                <li>Priority registration</li>
                <li>Mentorship & certificates</li>
                <li>Networking with industry</li>
                <li>Collaboration on funded projects</li>
              </ul>
              <a className="cta" href="#contact" style={{ display: 'inline-block', marginTop: '.6rem' }}>Become a member</a>
            </div>
          </div>
        </section>

        {/* Events */}
        <section id="events" className="reveal">
          <h2 className="section-title">Events & Activities</h2>
          <p className="muted">Cutting-edge, hands-on events tailored for the next generation of technologists.</p>
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
            <article className="card" tabIndex={0} aria-labelledby="e-ai">
              <img className="card-thumb" src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="AI Hackathon - Team collaboration on AI projects" loading="lazy" />
              <h3 id="e-ai">AI Hackathon</h3>
              <p className="muted">Intensive 48-hour teams challenge to prototype AI-powered solutions.</p>
            </article>
            <article className="card" tabIndex={0} aria-labelledby="e-ml">
              <img className="card-thumb" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="ML Bootcamp - Data science and machine learning workshop" loading="lazy" />
              <h3 id="e-ml">ML Bootcamp</h3>
              <p className="muted">Hands-on bootcamp covering model building, evaluation and deployment.</p>
            </article>
            <article className="card" tabIndex={0} aria-labelledby="e-web3">
              <img className="card-thumb" src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Web3 & Blockchain Sprint - Cryptocurrency and blockchain technology" loading="lazy" />
              <h3 id="e-web3">Web3 & Blockchain Sprint</h3>
              <p className="muted">Smart contracts, dApp prototyping and token design workshops.</p>
            </article>
            <article className="card" tabIndex={0} aria-labelledby="e-iot">
              <img className="card-thumb" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="IoT & Edge Lab - Internet of Things devices and sensors" loading="lazy" />
              <h3 id="e-iot">IoT & Edge Lab</h3>
              <p className="muted">Build connected devices, sensor networks, and real-time applications.</p>
            </article>
            <article className="card" tabIndex={0} aria-labelledby="e-cloud">
              <img className="card-thumb" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" alt="Cloud & DevOps Sprint - Cloud computing and infrastructure" loading="lazy" />
              <h3 id="e-cloud">Cloud & DevOps Sprint</h3>
              <p className="muted">CI/CD, containers, infra-as-code and deployment best-practices.</p>
            </article>
            <article className="card" tabIndex={0} aria-labelledby="e-arvr">
              <img className="card-thumb" src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="AR/VR Innovation Jam - Virtual and Augmented Reality trends 2025" loading="lazy" />
              <h3 id="e-arvr">AR/VR Innovation Jam</h3>
              <p className="muted">Create immersive prototypes and learn XR design fundamentals.</p>
            </article>
            <article className="card" tabIndex={0} aria-labelledby="e-ds">
              <img className="card-thumb" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Data Science Challenge - Data analysis and visualization" loading="lazy" />
              <h3 id="e-ds">Data Science Challenge</h3>
              <p className="muted">Analytics, modeling and storytelling with real-world datasets.</p>
            </article>
            <article className="card" tabIndex={0} aria-labelledby="e-cyber">
              <img className="card-thumb" src="https://www.parsons.com/wp-content/uploads/2022/02/events_category_images_capture_the_flag20.jpg" alt="Cybersecurity CTF - Capture the Flag competition" loading="lazy" />
              <h3 id="e-cyber">Cybersecurity CTF</h3>
              <p className="muted">Capture-the-Flag challenges covering modern security topics.</p>
            </article>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="reveal">
          <h2 className="section-title">Team & Coordinators</h2>

          {/* Featured Team Photo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div className="card" style={{ maxWidth: 540, padding: 0, overflow: 'hidden', background: 'linear-gradient(135deg,var(--blue-700),var(--blue-500))', position: 'relative' }}>
              <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden' }}>
                <iframe src="https://www.instagram.com/p/DPlwAEmgZWR/embed" width="540" height="540" frameBorder={0} scrolling="no" allowTransparency={true} style={{ border: 'none', display: 'block' }}></iframe>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(128,0,0,0.9))', color: 'white', padding: '1.2rem', textAlign: 'center', backdropFilter: 'blur(2px)' }}>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>Our Amazing Team in Action</h3>
                <p style={{ margin: '0.4rem 0 0', opacity: 0.95, fontSize: '0.9rem' }}>Computer Science Association - SSIPMT</p>
              </div>
            </div>
          </div>

          {/* Club Leadership Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--blue-900)', fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>Club Leadership</h3>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div className="card person" style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem' }}>
                <img className="avatar-img" src="assets/club-incharge1.svg" alt="Dr. Rajesh Kumar portrait (AI-generated)" loading="lazy" style={{ width: 100, height: 100 }} />
                <div style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '1.1rem' }}>Dr. Rajesh Kumar</div>
                <div className="muted" style={{ fontWeight: 600 }}>Club Incharge & Faculty Coordinator</div>
                <div className="muted" style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Department of Computer Science & Engineering</div>
                <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: '#6b7280', maxWidth: 300 }}>Leading CSA with 15+ years of experience in software engineering, research coordination, and student mentorship.</div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ background: 'rgba(11,87,208,0.1)', color: 'var(--blue-700)', padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.8rem' }}>Research Guidance</span>
                  <span style={{ background: 'rgba(11,87,208,0.1)', color: 'var(--blue-700)', padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.8rem' }}>Industry Connect</span>
                  <span style={{ background: 'rgba(11,87,208,0.1)', color: 'var(--blue-700)', padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.8rem' }}>Innovation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Coordinators Section */}
          <div>
            <h3 style={{ color: 'var(--blue-900)', fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>Student Coordinators</h3>
            <div className="team-grid">
              <div className="card person" tabIndex={0} style={{ padding: '1.2rem' }}>
                <img className="avatar-img" src="assets/rohit-agarwal.svg" alt="Rohit Agarwal portrait (AI-generated)" loading="lazy" />
                <div style={{ fontWeight: 700, marginTop: '0.4rem' }}>Rohit Agarwal</div>
                <div style={{ color: 'var(--blue-700)', fontWeight: 600, fontSize: '0.9rem' }}>Technical Head & Co-Coordinator</div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>Final Year B.Tech CSE</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.3rem' }}>Full-stack Development, AI/ML, System Design</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem' }}>
                  <div>ΓÇó Led 5+ technical workshops</div>
                  <div>ΓÇó National level hackathon winner</div>
                </div>
              </div>
              <div className="card person" tabIndex={0} style={{ padding: '1.2rem' }}>
                <img className="avatar-img" src="assets/sneha-nair.svg" alt="Sneha Nair portrait (AI-generated)" loading="lazy" />
                <div style={{ fontWeight: 700, marginTop: '0.4rem' }}>Sneha Nair</div>
                <div style={{ color: 'var(--blue-700)', fontWeight: 600, fontSize: '0.9rem' }}>Research & Project Coordinator</div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>Final Year B.Tech CSE</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.3rem' }}>Data Science, Machine Learning, Research</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem' }}>
                  <div>ΓÇó Published 2 research papers</div>
                  <div>ΓÇó Google Summer of Code participant</div>
                </div>
              </div>
              <div className="card person" tabIndex={0} style={{ padding: '1.2rem' }}>
                <img className="avatar-img" src="assets/aman-kumar.svg" alt="Aman Kumar portrait (AI-generated)" loading="lazy" />
                <div style={{ fontWeight: 700, marginTop: '0.4rem' }}>Aman Kumar</div>
                <div style={{ color: 'var(--blue-700)', fontWeight: 600, fontSize: '0.9rem' }}>Event Management Coordinator</div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>Third Year B.Tech CSE</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.3rem' }}>Web Development, UI/UX Design, Event Planning</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem' }}>
                  <div>ΓÇó Organized 10+ successful events</div>
                  <div>ΓÇó State level design competition winner</div>
                </div>
              </div>
              <div className="card person" tabIndex={0} style={{ padding: '1.2rem' }}>
                <img className="avatar-img" src="assets/priya-deshmukh.svg" alt="Priya Deshmukh portrait (AI-generated)" loading="lazy" />
                <div style={{ fontWeight: 700, marginTop: '0.4rem' }}>Priya Deshmukh</div>
                <div style={{ color: 'var(--blue-700)', fontWeight: 600, fontSize: '0.9rem' }}>Outreach & Industry Coordinator</div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>Third Year B.Tech CSE</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.3rem' }}>Cybersecurity, DevOps, Industry Relations</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.4rem' }}>
                  <div>ΓÇó Secured 15+ industry partnerships</div>
                  <div>ΓÇó Cybersecurity certification holder</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg,var(--muted),#fff)', borderRadius: 12, boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--blue-900)' }}>Want to Join Our Team?</h3>
            <p style={{ margin: '0 0 1rem', color: '#6b7280' }}>We're always looking for passionate and dedicated students to join our coordination team. Be part of the change!</p>
            <a href="#contact" className="cta" style={{ display: 'inline-block' }}>Get Involved</a>
          </div>
        </section>

        {/* Connect */}
        <section id="contact" className="reveal">
          <h2 className="section-title">Connect</h2>
          <div className="contact-grid">
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--blue-900)' }}>CSA Executive Committee</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: 12, background: 'linear-gradient(180deg,#fff,#fbfdff)', boxShadow: 'var(--card-shadow)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue-900)', marginBottom: '.5rem' }}>President</div>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Name: [President Name]</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Phone: +91 XXXXX XXXXX</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Email: president@csa.ssipmt.edu.in</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: 12, background: 'linear-gradient(180deg,#fff,#fbfdff)', boxShadow: 'var(--card-shadow)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue-900)', marginBottom: '.5rem' }}>Vice President</div>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Name: [Vice President Name]</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Phone: +91 XXXXX XXXXX</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Email: vicepresident@csa.ssipmt.edu.in</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: 12, background: 'linear-gradient(180deg,#fff,#fbfdff)', boxShadow: 'var(--card-shadow)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue-900)', marginBottom: '.5rem' }}>General Secretary</div>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Name: [General Secretary Name]</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Phone: +91 XXXXX XXXXX</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Email: secretary@csa.ssipmt.edu.in</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: 12, background: 'linear-gradient(180deg,#fff,#fbfdff)', boxShadow: 'var(--card-shadow)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue-900)', marginBottom: '.5rem' }}>Joint Secretary</div>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Name: [Joint Secretary Name]</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Phone: +91 XXXXX XXXXX</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Email: jointsec@csa.ssipmt.edu.in</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: 12, background: 'linear-gradient(180deg,#fff,#fbfdff)', boxShadow: 'var(--card-shadow)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue-900)', marginBottom: '.5rem' }}>Discipline Incharge</div>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Name: [Discipline Incharge Name]</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Phone: +91 XXXXX XXXXX</p>
                  <p className="muted" style={{ margin: '0.3rem 0' }}>Email: discipline@csa.ssipmt.edu.in</p>
                </div>
              </div>
            </div>
            <aside style={{ padding: '1rem', borderRadius: 12, background: 'linear-gradient(180deg,#fff,#fbfdff)', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ fontWeight: 700, color: 'var(--blue-900)' }}>Follow Us</div>
              <p className="muted">Stay connected with CSA for latest updates</p>
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem', flexDirection: 'column' }}>
                <a href="https://www.instagram.com/computer_science_association/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ textDecoration: 'none', padding: '.45rem', borderRadius: 8, background: 'rgba(128,0,0,0.06)', color: '#800000', textAlign: 'center' }}>≡ƒô╖ Instagram</a>
                <a href="https://www.facebook.com/ssipmtrpr/?ref=embed_page#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ textDecoration: 'none', padding: '.45rem', borderRadius: 8, background: 'rgba(128,0,0,0.06)', color: '#800000', textAlign: 'center' }}>≡ƒôÿ Facebook</a>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(128,0,0,0.1)' }}>
                <div style={{ fontWeight: 600, color: 'var(--blue-900)', marginBottom: '.5rem' }}>General Contact</div>
                <p className="muted" style={{ margin: '0.3rem 0' }}>≡ƒôº csa@ssipmt.edu.in</p>
                <p className="muted" style={{ margin: '0.3rem 0' }}>≡ƒô₧ +91 98765 43210</p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <button className="to-top" id="toTop" aria-label="Back to top" title="Back to top">Γåæ</button>
    </div>
  );
};

export default CsaPage;
