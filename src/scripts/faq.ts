let faqInitialized = false;

export function initFaq() {
  if (faqInitialized || typeof document === 'undefined') return;
  faqInitialized = true;

  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-faq-button]'));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';

      buttons.forEach((otherButton) => {
        const panelId = otherButton.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        otherButton.setAttribute('aria-expanded', 'false');
        panel?.setAttribute('hidden', '');
      });

      if (!expanded) {
        const panelId = button.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        button.setAttribute('aria-expanded', 'true');
        panel?.removeAttribute('hidden');
      }
    });
  });
}
