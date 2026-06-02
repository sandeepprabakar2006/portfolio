import os

# Append CSS
css_additions = """
/* ═══════════════════════════════════════════════
   CUSTOM CURSOR & MAGNETIC EFFECT
═══════════════════════════════════════════════ */
.cursor-dot, .cursor-glow {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background-color 0.2s;
  display: none;
}
@media (min-width: 900px) {
  .cursor-dot, .cursor-glow { display: block; }
}
.cursor-dot {
  width: 10px; height: 10px;
  background-color: var(--c-primary);
  transition: transform 0.15s cubic-bezier(0.2, 0, 0.2, 1);
}
.cursor-glow {
  width: 60px; height: 60px;
  background-color: transparent;
  border: 1.5px solid rgba(99, 179, 237, 0.4);
  box-shadow: 0 0 20px rgba(99, 179, 237, 0.2);
  transition: transform 0.4s cubic-bezier(0.2, 0, 0.2, 1);
}
.cursor-hover .cursor-dot { transform: translate(-50%, -50%) scale(1.5); background-color: var(--c-neon); }
.cursor-hover .cursor-glow { transform: translate(-50%, -50%) scale(1.5); border-color: rgba(0, 212, 255, 0.6); }

/* ═══════════════════════════════════════════════
   GALLERY (LIFE)
═══════════════════════════════════════════════ */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}
.gallery-card {
  background: var(--grad-card);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);
  transform-style: preserve-3d;
  position: relative;
}
.gallery-img {
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  color: var(--c-text-muted);
}
.gallery-emoji { font-size: 3rem; margin-bottom: 8px; }
.gallery-img p { font-size: 0.85rem; }
.gallery-content { padding: 24px; position: relative; z-index: 10; transform: translateZ(30px); }
.gallery-content h3 { font-size: 1.1rem; color: var(--c-text); margin-bottom: 8px; }
.gallery-content p { font-size: 0.88rem; color: var(--c-text-dim); }

/* Magnetic button */
.magnetic {
  position: relative;
  display: inline-block;
}
"""

with open("/home/sandy/portfolio/style.css", "a") as f:
    f.write("\n" + css_additions)


# Append JS
js_additions = """
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
"""

with open("/home/sandy/portfolio/script.js", "a") as f:
    f.write("\n" + js_additions)

print("Appended UI WOW elements successfully!")
