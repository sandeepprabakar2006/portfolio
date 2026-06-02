/* jshint esversion: 11 */
'use strict';

// ═══════════════════════════════════════════════
//  DATA STORE
// ═══════════════════════════════════════════════
const state = {
  projects: [
    {
      id: 1,
      title: 'NetDictator – Cybersecurity Monitoring & Control System',
      description: 'Monitors network activity and detect sensitive data exposure using real-time traffic analysis. Applies automated protection actions such as encryption and data masking to secure critical information.',
      tech: ['Python', 'Flask', 'Monitoring', 'Encryption'],
      github: 'https://github.com/sandeepprabakar2006/Cyberathon',
      demo: '',
      cat: 'security',
    },
    {
      id: 2,
      title: 'DoS Detection – Network Security System',
      description: 'Identifies denial-of-service attacks by analyzing abnormal traffic spikes and connection patterns. Implements threshold-based detection with real-time alerts and logging for attack mitigation.',
      tech: ['Python', 'Sockets', 'Traffic Analysis', 'Logging'],
      github: 'https://github.com/sandeepprabakar2006/dos-detection',
      demo: '',
      cat: 'security',
    },
    {
      id: 3,
      title: 'OmniSec – Multi-Cloud Security Monitoring System',
      description: 'Monitors multi-cloud environments to detect misconfigurations, unauthorized access, and threats. Provides centralized dashboard with alerts, risk assessment, and security recommendations.',
      tech: ['Python', 'Cloud APIs', 'Monitoring'],
      github: 'https://github.com/sandeepprabakar2006',
      demo: '',
      cat: 'cloud',
    }
  ],
  certs: [
    { id: 1, title: 'Microsoft Azure', issuer: 'Udemy', date: '2026-01', url: '', fileDataUrl: null, filename: '' },
    { id: 2, title: 'Python Programming Masterclass', issuer: 'Udemy', date: '2025-01', url: '', fileDataUrl: null, filename: '' },
    { id: 3, title: 'Mastering Data Structures and Algorithm using C & C++', issuer: 'Udemy', date: '2025-01', url: '', fileDataUrl: null, filename: '' },
    { id: 4, title: 'Cloud Fundamentals', issuer: 'AWS Academy', date: '2024-01', url: '', fileDataUrl: null, filename: '' },
  ],
  milestones: [
    { id: 1, title: 'Cybersecurity Intern – Infoziant', desc: 'Developed a Capture The Flag (CTF) platform. Gained hands-on experience in cloud and on-premise environments focusing on securing systems and network monitoring.', date: '2025-05', type: 'internship' },
    { id: 2, title: '1st Place - Paper Presentation', desc: 'Achieved first place in paper presentation at Hindustan College of Engineering.', date: '2025-04', type: 'milestone' },
    { id: 3, title: '3rd Place - Intra College Hackathon', desc: 'Secured 3rd place in intra college hackathon at Sri Eshwar College of Engineering.', date: '2025-03', type: 'milestone' },
    { id: 4, title: '3rd Place - Mini Project Expo', desc: 'Secured 3rd place in Mini project expo at Sri Eshwar College of Engineering.', date: '2025-02', type: 'project' },
    { id: 5, title: 'B.E CSE(Cybersecurity)', desc: 'Started engineering degree at Sri Eshwar College of Engineering. Current CGPA: 7.5.', date: '2024-08', type: 'milestone' },
  ],
};
// ═══════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function showToast(msg, type = 'success') {
  const t = $('#toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

function genId() { return Date.now() + Math.floor(Math.random() * 1000); }

function formatDate(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

function catEmoji(c) {
  return { cloud: '☁️', devops: '⚙️', security: '🔒', other: '🔧', course: '📚', project: '🚀', internship: '💼', cert: '🏆', milestone: '⭐' }[c] || '📌';
}

// ═══════════════════════════════════════════════
//  NAVBAR — scroll + mobile
// ═══════════════════════════════════════════════
(function initNav() {
  const nav = $('#navbar');
  const ham = $('#hamburger');
  const links = $('#nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveSection();
  }, { passive: true });

  ham.addEventListener('click', () => links.classList.toggle('open'));

  // Close on link click
  $$('a', links).forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  function highlightActiveSection() {
    const sections = $$('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    $$('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  $('#year').textContent = new Date().getFullYear();
})();

// ═══════════════════════════════════════════════
//  THEME TOGGLE
// ═══════════════════════════════════════════════
(function initTheme() {
  const body = document.body;
  const btn = $('#themeToggle');
  const icon = $('#themeIcon');
  const saved = localStorage.getItem('portfolio_theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio_theme', next);
  });

  function applyTheme(t) {
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(`${t}-theme`);
    icon.textContent = t === 'dark' ? '☀️' : '🌙';
  }
})();

// ═══════════════════════════════════════════════
//  PARTICLES — Interactive DNA Network Effect
// ═══════════════════════════════════════════════
(function initParticles() {
  const canvas = $('#particle-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  // Mouse state (relative to canvas)
  const mouse = { x: -9999, y: -9999 };   // no 'active' flag — position alone drives glow

  const COLORS       = ['#63b3ed', '#9f7aea', '#4fd1c7', '#00d4ff', '#a78bfa'];
  const COUNT        = 150;
  const BASE_CONNECT = 130;
  const DNA_CONNECT  = 220;
  const MOUSE_RADIUS = 200;

  function Particle() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 1.6 + 0.5;
    this.vx   = (Math.random() - 0.5) * 0.45;
    this.vy   = (Math.random() - 0.5) * 0.45;
    this.baseAlpha  = Math.random() * 0.45 + 0.12;
    this.alpha      = this.baseAlpha;
    this.color      = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.glowing    = false;
    this.glowIntensity = 0;
  }

  Particle.prototype.update = function () {
    /* Constant drift — velocity NEVER changes, so they never accumulate */
    this.x += this.vx;
    this.y += this.vy;

    /* Wrap edges cleanly */
    if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;

    /* Glow state purely visual */
    const dx   = mouse.x - this.x;
    const dy   = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (mouse.x > -1000 && dist < MOUSE_RADIUS) {
      this.glowing       = true;
      this.glowIntensity = Math.min(1, this.glowIntensity + 0.05);
    } else {
      this.glowIntensity = Math.max(0, this.glowIntensity - 0.03);
      this.glowing       = this.glowIntensity > 0.01;
    }

    this.alpha = this.baseAlpha + this.glowIntensity * 0.5;
  };

  /* ── Draw a glowing line between two points ── */
  function drawLine(x1, y1, x2, y2, alpha, r, g, b, lineW) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.lineWidth   = lineW;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  /* ── Main render loop ── */
  function loop() {
    ctx.clearRect(0, 0, W, H);

    /* — particle-to-particle connections — */
    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const pj  = particles[j];
        const dx  = pi.x - pj.x;
        const dy  = pi.y - pj.y;
        const d   = Math.sqrt(dx * dx + dy * dy);

        if (d < BASE_CONNECT) {
          /* Normal faint connection */
          const a = 0.09 * (1 - d / BASE_CONNECT);
          drawLine(pi.x, pi.y, pj.x, pj.y, a, 99, 179, 237, 0.7);
        }

        /* DNA glow when both particles are near mouse */
        const bothGlow = pi.glowing && pj.glowing;
        if (bothGlow && d < DNA_CONNECT) {
          const t  = 1 - d / DNA_CONNECT;
          const gi = (pi.glowIntensity + pj.glowIntensity) / 2;
          const a  = t * gi * 0.75;
          /* Bright core line */
          drawLine(pi.x, pi.y, pj.x, pj.y, a,        100, 220, 255, 1.2);
          /* Wide soft halo */
          drawLine(pi.x, pi.y, pj.x, pj.y, a * 0.25, 160, 100, 255, 4);
        }
      }
    }

    /* — mouse-to-particle "epicenter" spokes — */
    if (mouse.active) {
      particles.forEach(p => {
        if (!p.glowing) return;
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS) {
          const t = 1 - d / MOUSE_RADIUS;
          const a = t * p.glowIntensity * 0.55;
          drawLine(mouse.x, mouse.y, p.x, p.y, a,        80, 220, 255, 0.9);
          drawLine(mouse.x, mouse.y, p.x, p.y, a * 0.18, 120, 80, 255, 5);
        }
      });

      /* Cursor node pulse */
      const pulse = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 28);
      pulse.addColorStop(0,   'rgba(80,220,255,0.18)');
      pulse.addColorStop(0.5, 'rgba(120,80,255,0.06)');
      pulse.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 28, 0, Math.PI * 2);
      ctx.fillStyle = pulse;
      ctx.fill();
    }

    /* — draw particles — */
    particles.forEach(p => {
      p.update();

      if (p.glowing && p.glowIntensity > 0.05) {
        /* Glow halo */
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6 * p.glowIntensity + 3);
        grad.addColorStop(0,   `rgba(80,220,255,${p.glowIntensity * 0.5})`);
        grad.addColorStop(0.5, `rgba(120,80,255,${p.glowIntensity * 0.18})`);
        grad.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6 * p.glowIntensity + 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      /* Core dot */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + p.glowIntensity * 1.2, 0, Math.PI * 2);
      ctx.fillStyle  = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(loop);
  }

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* ── Mouse tracking — position stored, valid when inside canvas bounds ── */
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left;
    const my   = e.clientY - rect.top;
    // Store real coords inside hero, reset to -9999 outside
    if (mx >= 0 && mx <= rect.width && my >= 0 && my <= rect.height) {
      mouse.x = mx;
      mouse.y = my;
    } else {
      mouse.x = -9999;
      mouse.y = -9999;
    }
  }, { passive: true });

  /* Reset when mouse leaves the browser window entirely */
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  /* ── Init — defer one frame so canvas has layout dimensions ── */
  requestAnimationFrame(() => {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
    loop();
  });

  window.addEventListener('resize', resize, { passive: true });
})();

// ═══════════════════════════════════════════════
//  TYPED ANIMATION
// ═══════════════════════════════════════════════
(function initTyped() {
  const roles = ['Cloud Engineer', 'DevOps Engineer', 'Security Enthusiast', 'CSE Student'];
  let ri = 0, ci = 0, deleting = false;
  const el = $('#typed');

  function tick() {
    const role = roles[ri];
    if (!deleting) {
      el.textContent = role.slice(0, ++ci);
      if (ci === role.length) { deleting = true; setTimeout(tick, 1600); return; }
    } else {
      el.textContent = role.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 55 : 90);
  }
  tick();
})();

// ═══════════════════════════════════════════════
//  COUNTER ANIMATION
// ═══════════════════════════════════════════════
(function initCounters() {
  const counters = $$('.counter');
  let done = false;

  function runCounters() {
    if (done) return;
    const heroRect = $('#hero').getBoundingClientRect();
    if (heroRect.top < window.innerHeight) {
      done = true;
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = target / 40;
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(interval);
        }, 35);
      });
    }
  }

  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();
})();

// ═══════════════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════════════
(function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });

  function observe() { $$('.reveal').forEach(el => obs.observe(el)); }
  observe();

  // Re-observe for dynamically added elements
  const mutObs = new MutationObserver(() => observe());
  mutObs.observe(document.body, { childList: true, subtree: true });
})();

// ═══════════════════════════════════════════════
//  SKILL BARS
// ═══════════════════════════════════════════════
(function initSkillBars() {
  const tabs = $$('.skill-tab');
  const cats = $$('.skill-category');

  function animateBars(cat) {
    $$('.skill-bar-fill', cat).forEach(fill => {
      fill.style.width = '0';
      setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 80);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      cats.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const active = $(`.skill-category[data-cat="${tab.dataset.cat}"]`);
      active.classList.add('active');
      animateBars(active);
    });
  });

  // Initial animation
  const activeCat = $('.skill-category.active');
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateBars(activeCat); skillObs.disconnect(); } });
  }, { threshold: 0.3 });
  skillObs.observe($('#skills'));
})();


// ═══════════════════════════════════════════════
//  PROJECTS
// ═══════════════════════════════════════════════
function renderProjects() {
  const grid = $('#projectsGrid');
  grid.innerHTML = '';
  state.projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.innerHTML = `
      <div class="project-cat">${catEmoji(p.cat)} ${p.cat.toUpperCase()}</div>
      <h3 class="project-title">${esc(p.title)}</h3>
      <p class="project-desc">${esc(p.description)}</p>
      <div class="project-tech">${p.tech.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
      <div class="project-links">
        ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" class="project-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>` : ''}
        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener" class="project-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Demo
        </a>` : ''}
        
      </div>
    `;
    grid.appendChild(card);
  });
}


renderProjects();

// ═══════════════════════════════════════════════
//  CERTIFICATIONS
// ═══════════════════════════════════════════════
function renderCerts() {
  const grid = $('#certsGrid');
  grid.innerHTML = '';
  const certIcons = ['🏆','🎓','☁️','🔒','⚙️','🌐','🛡️','📜'];
  state.certs.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card reveal';
    card.innerHTML = `
      <div class="cert-badge">${certIcons[i % certIcons.length]}</div>
      ${c.fileDataUrl && c.filename && !c.filename.endsWith('.pdf')
        ? `<img src="${c.fileDataUrl}" alt="Certificate" class="cert-preview-thumb" />`
        : (c.fileDataUrl && c.filename && c.filename.endsWith('.pdf')
          ? `<div style="background:rgba(99,179,237,0.08);border:1px solid var(--c-border);border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:0.8rem;color:var(--c-primary)">📄 PDF: ${esc(c.filename)}</div>` : '')}
      <div class="cert-title">${esc(c.title)}</div>
      <div class="cert-issuer">${esc(c.issuer)}</div>
      <div class="cert-date">${formatDate(c.date)}</div>
      <div class="cert-actions">
        ${c.url ? `<a href="${esc(c.url)}" target="_blank" class="btn btn-sm btn-outline">View</a>` : ''}
        ${c.fileDataUrl ? `<a href="${c.fileDataUrl}" download="${esc(c.filename || 'certificate')}" class="btn btn-sm btn-outline">Download</a>` : '' }
        
      </div>
    `;
    grid.appendChild(card);
  });
}


renderCerts();

// ═══════════════════════════════════════════════
//  TIMELINE / JOURNEY
// ═══════════════════════════════════════════════
function renderTimeline() {
  const container = $('#timeline');
  container.innerHTML = '';
  [...state.milestones].sort((a, b) => b.date.localeCompare(a.date)).forEach(m => {
    const item = document.createElement('div');
    item.className = 'timeline-item reveal';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-date">${formatDate(m.date)}</div>
      <div class="timeline-card">
        <span class="timeline-type">${catEmoji(m.type)} ${m.type}</span>
        <div class="timeline-title">${esc(m.title)}</div>
        <div class="timeline-desc">${esc(m.desc)}</div>

      </div>
    `;
    container.appendChild(item);
  });
}


renderTimeline();

// ═══════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════
$('#contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = $('#contactSubmit');
  btn.disabled = true; btn.textContent = 'Sending…';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
    $('#formNote').textContent = '✓ Message sent! I\'ll get back to you soon.';
    this.reset();
    setTimeout(() => { $('#formNote').textContent = ''; }, 4000);
    showToast('Message sent! ✉️');
  }, 1200);
});

// ═══════════════════════════════════════════════
//  UTIL — escape HTML
// ═══════════════════════════════════════════════
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════
//  RESUME
// ═══════════════════════════════════════════════
const resumeBtn = $('#resumeBtn');
if (resumeBtn) {
  resumeBtn.href = 'resume.pdf';
  resumeBtn.download = 'resume.pdf';
}


// ═══════════════════════════════════════════════
//  CUSTOM CURSOR & MAGNETIC EFFECT
// ═══════════════════════════════════════════════
(function initCursorAndMagnetic() {
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');
  
  if(window.innerWidth < 900) return; // Disable on mobile

  window.addEventListener('mousemove', e => {
    if(dot && glow) {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      // Glow lags slightly for trail effect
      setTimeout(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }, 60);
    }
  });

  // Add hover effect to interactive elements
  const interactivables = document.querySelectorAll('a, button, .project-card, .tilt, .skill-tab');
  interactivables.forEach(el => {
    el.addEventListener('mouseenter', () => { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', () => { document.body.classList.remove('cursor-hover'); });
  });

  // Magnetic button effect on main buttons
  const magnetics = document.querySelectorAll('.btn');
  magnetics.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
})();

// ═══════════════════════════════════════════════
//  3D TILT EFFECT
// ═══════════════════════════════════════════════
(function initTilt() {
  const tiltElements = document.querySelectorAll('.tilt, .project-card, .cert-card');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    el.addEventListener('mouseleave', function() {
      this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
})();

// ═══════════════════════════════════════════════
//  SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// ═══════════════════════════════════════════════
//  BACK TO TOP
// ═══════════════════════════════════════════════
(function initBackToTop() {
  const btn = document.getElementById('bttBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ═══════════════════════════════════════════════
//  TERMINAL ANIMATION (about section)
// ═══════════════════════════════════════════════
(function initTerminal() {
  const body = document.getElementById('termBody');
  if (!body) return;

  const script = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'sandeep-prabakar', cls: 'success' },
    { type: 'cmd', text: 'cat degree.txt' },
    { type: 'out', text: 'B.E CSE (Cybersecurity) · CGPA: 7.5', cls: 'info' },
    { type: 'out', text: 'Sri Eshwar College of Engineering', cls: 'info' },
    { type: 'cmd', text: 'nmap -sV skills.txt' },
    { type: 'out', text: 'PORT    SERVICE    STACK', cls: '' },
    { type: 'out', text: '22/tcp  cloud      AWS · Azure · GCP', cls: 'info' },
    { type: 'out', text: '80/tcp  devops     Docker · K8s · CI/CD', cls: 'info' },
    { type: 'out', text: '443/tcp security   Kali · IAM · OWASP', cls: 'warn' },
    { type: 'cmd', text: 'systemctl status availability' },
    { type: 'out', text: '● Active — Open to Internships', cls: 'success' },
  ];

  let li = 0, ci = 0;

  function typeNext() {
    if (li >= script.length) {
      const cur = document.createElement('span');
      cur.className = 't-cursor';
      body.appendChild(cur);
      return;
    }
    const item = script[li];
    if (item.type === 'cmd') {
      if (ci === 0) {
        const row = document.createElement('div');
        row.className = 't-line';
        row.innerHTML = `<span class="t-prompt">$</span><span class="t-cmd" id="tc${li}"></span>`;
        body.appendChild(row);
      }
      const span = document.getElementById(`tc${li}`);
      if (ci < item.text.length) {
        span.textContent += item.text[ci++];
        setTimeout(typeNext, 58);
      } else {
        ci = 0; li++;
        setTimeout(typeNext, 200);
      }
    } else {
      const row = document.createElement('div');
      row.className = `t-out ${item.cls || ''}`;
      row.textContent = item.text;
      body.appendChild(row);
      li++; ci = 0;
      setTimeout(typeNext, 110);
    }
  }

  const target = document.getElementById('about') || body;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { obs.disconnect(); setTimeout(typeNext, 400); }
  }, { threshold: 0.25 });
  obs.observe(target);
})();
