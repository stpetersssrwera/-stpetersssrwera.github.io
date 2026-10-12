(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  toggle?.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
    toggle.textContent = opened ? '×' : '☰';
  });
  document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) { toggle.textContent = '☰'; toggle.setAttribute('aria-label', 'Open navigation'); }
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const toTop = document.querySelector('.to-top');
  const updateTop = () => toTop?.classList.toggle('visible', window.scrollY > 450);
  window.addEventListener('scroll', updateTop, { passive: true });
  updateTop();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const dialog = document.getElementById('lightbox');
  const dialogImage = dialog?.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    if (!dialog || !dialogImage) return;
    dialogImage.src = item.dataset.full;
    dialogImage.alt = item.querySelector('img')?.alt || 'School photograph';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open(item.dataset.full, '_blank', 'noopener');
  }));
  dialog?.querySelector('.close-lightbox')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
