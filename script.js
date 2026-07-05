/* ============================================================
   script.js — Portfolio Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // smooth ring follow
  const animRing = () => {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  };
  animRing();

  // cursor hover effect
  document.querySelectorAll('a, button, .proj-card, .skill-card, .stat-card, .c-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── MOBILE HAMBURGER ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ── SKILL BARS ── */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

  /* ── PROJECT FILTER ── */
  const filterBtns = document.querySelectorAll('.flt-btn');
  const projCards  = document.querySelectorAll('.proj-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        if (show) {
          card.style.opacity = '1';
          card.style.transform = '';
          card.style.display = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { if (!show) card.style.display = 'none'; }, 400);
        }
      });
    });
  });

  /* ── CONTACT FORM ── */
  const form = document.querySelector('.c-form');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.f-submit');
    const originalBtnHTML = btn.innerHTML;
    
    // Change button to loading state
    btn.innerHTML = `Sending... <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    btn.style.opacity = '0.7';

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Success state
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sent!`;
        btn.style.background = 'linear-gradient(135deg, #2A7B8E, #1B3A6B)';
        form.reset();
      } else {
        // Error state
        const resData = await response.json();
        btn.innerHTML = `Error: ${resData.message || 'Failed'}`;
        btn.style.background = '#C47A1E'; // Amber
      }
    } catch (err) {
      btn.innerHTML = `Error: Failed to connect`;
      btn.style.background = '#C47A1E';
    }

    btn.style.opacity = '1';

    // Reset button after 4 seconds
    setTimeout(() => {
      btn.innerHTML = originalBtnHTML;
      btn.style.background = '';
    }, 4000);
  });

  /* ── TYPED EFFECT in hero subtitle ── */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const phrases = ['MERN Stack Developer', 'Full Stack Engineer', 'Figma UI Designer', 'WordPress Developer'];
    let pi = 0, ci = 0, deleting = false;
    const type = () => {
      const phrase = phrases[pi];
      typedEl.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
      if (!deleting && ci > phrase.length)      { deleting = true; setTimeout(type, 1500); return; }
      if (deleting && ci < 0)                   { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
      setTimeout(type, deleting ? 45 : 80);
    };
    type();
  }

  /* ── SMOOTH ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ── PARALLAX orbs ── */
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 22;
    const y = (e.clientY / window.innerHeight - 0.5) * 22;
    document.querySelectorAll('.orb').forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

});
