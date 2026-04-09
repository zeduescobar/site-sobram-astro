let menuInitialized = false;

export function initMenu() {
  if (menuInitialized || typeof document === 'undefined') return;
  menuInitialized = true;

  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const openIcon = document.querySelector<HTMLElement>('[data-menu-icon-open]');
  const closeIcon = document.querySelector<HTMLElement>('[data-menu-icon-close]');

  if (!header || !toggle || !menu) return;

  const updateHeader = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 32);
  };

  const setOpen = (isOpen: boolean) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    menu.hidden = !isOpen;
    if (openIcon) openIcon.hidden = isOpen;
    if (closeIcon) closeIcon.hidden = !isOpen;
  };

  setOpen(false);
  updateHeader();

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!expanded);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('scroll', updateHeader, { passive: true });
}
