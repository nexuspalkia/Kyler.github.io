document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const tiltElements = document.querySelectorAll('.project-block, .hero');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
      el.style.transition = 'transform 0.1s ease-out';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s ease-out';
    });
  });

  let lastScroll = 0;
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80 && current > lastScroll) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = current;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.project-image').forEach(img => observer.observe(img));

});
