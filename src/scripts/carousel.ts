let carouselInitialized = false;
const carouselControllers = new Map<HTMLElement, { start: () => void; stop: () => void }>();

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setupTabs() {
  const tabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-tab-trigger]'));
  const tabPanels = Array.from(document.querySelectorAll<HTMLElement>('[data-tab-panel]'));

  const activateTab = (targetId: string) => {
    tabButtons.forEach((button) => {
      const active = button.dataset.target === targetId;
      button.setAttribute('aria-selected', String(active));
      button.classList.toggle('is-active', active);
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.category === targetId;
      panel.hidden = !isActive;

      const carousel = panel.querySelector<HTMLElement>('[data-carousel]');
      const controller = carousel ? carouselControllers.get(carousel) : undefined;

      if (isActive) {
        controller?.start();
      } else {
        controller?.stop();
      }
    });
  };

  activateTab(tabButtons[0]?.dataset.target ?? '');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!button.dataset.target) return;
      activateTab(button.dataset.target);
    });
  });
}

function setupCarousel(carousel: HTMLElement) {
  const viewport = carousel.querySelector<HTMLElement>('[data-carousel-viewport]');
  const slides = Array.from(carousel.querySelectorAll<HTMLElement>('[data-carousel-slide]'));
  const prevButton = carousel.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const nextButton = carousel.querySelector<HTMLButtonElement>('[data-carousel-next]');
  const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]'));

  if (!viewport || !slides.length) return;

  let activeIndex = 0;
  let autoplayTimer: number | undefined;
  let interacting = false;

  const getStep = () => viewport.clientWidth;

  const updateDots = () => {
    dots.forEach((dot, index) => {
      const active = index === activeIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
    if (prevButton) prevButton.disabled = activeIndex === 0;
    if (nextButton) nextButton.disabled = activeIndex === slides.length - 1;
  };

  const goTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    activeIndex = (index + slides.length) % slides.length;
    viewport.scrollTo({ left: activeIndex * getStep(), behavior });
    updateDots();
  };

  const syncFromScroll = () => {
    const nextIndex = Math.round(viewport.scrollLeft / Math.max(getStep(), 1));
    if (nextIndex !== activeIndex) {
      activeIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
      updateDots();
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = undefined;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();

    const panel = carousel.closest<HTMLElement>('[data-tab-panel]');
    const panelVisible = panel ? !panel.hidden : true;

    if (slides.length <= 1 || interacting || prefersReducedMotion() || document.hidden || !panelVisible) {
      return;
    }

    autoplayTimer = window.setInterval(() => {
      goTo(activeIndex + 1);
    }, 4200);
  };

  const pauseInteraction = () => {
    interacting = true;
    stopAutoplay();
  };

  const resumeInteraction = () => {
    interacting = false;
    startAutoplay();
  };

  prevButton?.addEventListener('click', () => {
    pauseInteraction();
    goTo(activeIndex - 1);
    window.setTimeout(resumeInteraction, 5000);
  });

  nextButton?.addEventListener('click', () => {
    pauseInteraction();
    goTo(activeIndex + 1);
    window.setTimeout(resumeInteraction, 5000);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      pauseInteraction();
      goTo(index);
      window.setTimeout(resumeInteraction, 5000);
    });
  });

  viewport.addEventListener(
    'scroll',
    () => {
      window.requestAnimationFrame(syncFromScroll);
    },
    { passive: true }
  );

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      pauseInteraction();
      goTo(activeIndex - 1);
      window.setTimeout(resumeInteraction, 5000);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      pauseInteraction();
      goTo(activeIndex + 1);
      window.setTimeout(resumeInteraction, 5000);
    }
  });

  viewport.addEventListener('mouseenter', pauseInteraction);
  viewport.addEventListener('mouseleave', resumeInteraction);
  viewport.addEventListener('focusin', pauseInteraction);
  viewport.addEventListener('focusout', resumeInteraction);
  viewport.addEventListener('pointerdown', pauseInteraction, { passive: true });
  viewport.addEventListener('pointerup', () => window.setTimeout(resumeInteraction, 3000), { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  window.addEventListener('resize', () => goTo(activeIndex, 'auto'));
  updateDots();
  carouselControllers.set(carousel, { start: startAutoplay, stop: stopAutoplay });
  startAutoplay();
}

export function initCarouselTabs() {
  if (carouselInitialized || typeof document === 'undefined') return;
  carouselInitialized = true;

  setupTabs();
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(setupCarousel);
}
