declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (
        serviceId: string,
        templateId: string,
        templateParams: Record<string, string>
      ) => Promise<{ status: number; text: string }>;
    };
    requestAnimationFrame: typeof requestAnimationFrame;
  }
}

const EMAILJS_PUBLIC_KEY = 'DYP-ZCfj9GmFyfXd0';
const EMAILJS_SERVICE_ID = 'service_7lksfa7';
const EMAILJS_TEMPLATE_ID = 'template_fd93bol';
const WHATSAPP_PHONE = '5511967660060';

const buildWhatsappMessage = (nome: string, telefone: string, email: string, modalidade: string) =>
  `Olá! Gostaria de solicitar um orçamento de plano de saúde.

Nome: ${nome}
Telefone: ${telefone}
E-mail: ${email}
Modalidade: ${modalidade}

Aguardo o contato!`;

const buildWhatsappUrl = (message: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;

const showFormStatus = (status: 'loading' | 'success' | 'error', form: HTMLFormElement) => {
  const formStatus = document.getElementById('form-status');
  const loadingStatus = document.getElementById('loading-status');
  const successStatus = document.getElementById('success-status');
  const errorStatus = document.getElementById('error-status');
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;

  if (!formStatus || !loadingStatus || !successStatus || !errorStatus || !submitBtn) {
    return;
  }

  loadingStatus.classList.add('hidden');
  successStatus.classList.add('hidden');
  errorStatus.classList.add('hidden');
  formStatus.classList.remove('hidden');

  if (status === 'loading') {
    loadingStatus.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
    return;
  }

  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Solicitar orçamento';

  if (status === 'success') {
    successStatus.classList.remove('hidden');
    window.setTimeout(() => {
      form.reset();
      formStatus.classList.add('hidden');
    }, 5000);
    return;
  }

  errorStatus.classList.remove('hidden');
};

const initMobileMenu = () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) {
    return;
  }

  const setExpanded = (expanded: boolean) => {
    mobileMenu.classList.toggle('hidden', !expanded);
    mobileMenuBtn.setAttribute('aria-expanded', String(expanded));
    mobileMenuBtn.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');

    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      icon.className = expanded ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
    }
  };

  setExpanded(false);

  mobileMenuBtn.addEventListener('click', () => {
    setExpanded(mobileMenu.classList.contains('hidden'));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setExpanded(false);
    });
  });
};

const initHeaderScroll = () => {
  const header = document.querySelector('header');
  const heroSection = document.getElementById('home');

  if (!header || !heroSection) {
    return;
  }

  let ticking = false;

  const updateHeader = () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    header.classList.toggle('header-scrolled', window.scrollY > heroBottom - 100);
    ticking = false;
  };

  updateHeader();

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeader);
      }
    },
    { passive: true }
  );
};

const initPhoneMask = () => {
  const telefoneInput = document.getElementById('telefone') as HTMLInputElement | null;

  if (!telefoneInput) {
    return;
  }

  telefoneInput.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    let value = target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      target.value = value;
    }
  });
};

const initSmoothScroll = () => {
  const header = document.querySelector('header');

  if (!header) {
    return;
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;

    if (!link) {
      return;
    }

    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') {
      return;
    }

    const targetElement = document.querySelector<HTMLElement>(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    const targetPosition = targetElement.offsetTop - header.getBoundingClientRect().height;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
};

const initFaq = () => {
  const faqItems = Array.from(document.querySelectorAll<HTMLElement>('.faq-item'));

  const closeItem = (item: HTMLElement) => {
    const trigger = item.querySelector<HTMLElement>('.faq-question');
    const answer = item.querySelector<HTMLElement>('.faq-answer');
    item.classList.remove('active');
    trigger?.setAttribute('aria-expanded', 'false');
    if (answer) {
      answer.hidden = true;
    }
  };

  const openItem = (item: HTMLElement) => {
    const trigger = item.querySelector<HTMLElement>('.faq-question');
    const answer = item.querySelector<HTMLElement>('.faq-answer');
    item.classList.add('active');
    trigger?.setAttribute('aria-expanded', 'true');
    if (answer) {
      answer.hidden = false;
    }
  };

  faqItems.forEach((item, index) => {
    const trigger = item.querySelector<HTMLElement>('.faq-question');
    const answer = item.querySelector<HTMLElement>('.faq-answer');

    if (!trigger || !answer) {
      return;
    }

    const answerId = answer.id || `faq-answer-${index + 1}`;
    answer.id = answerId;
    trigger.setAttribute('aria-controls', answerId);
    trigger.setAttribute('aria-expanded', 'false');
    answer.hidden = true;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(closeItem);
      if (!isActive) {
        openItem(item);
      }
    });
  });
};

const initForm = () => {
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;

  if (!contactForm) {
    return;
  }

  if (window.emailjs) {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nome = String(formData.get('nome') || '').trim();
    const telefone = String(formData.get('telefone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const modalidade = String(formData.get('modalidade') || '').trim();

    if (!nome || !telefone || !email || !modalidade) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(telefone.replace(/\D/g, ''))) {
      alert('Por favor, insira um telefone válido.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    showFormStatus('loading', contactForm);

    const whatsappUrl = buildWhatsappUrl(buildWhatsappMessage(nome, telefone, email, modalidade));

    try {
      if (!window.emailjs) {
        throw new Error('EmailJS indisponível');
      }

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_name: 'Equipe SOBAM',
        from_name: nome,
        from_email: email,
        from_phone: telefone,
        modalidade,
        reply_to: email
      });

      showFormStatus('success', contactForm);
      window.setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener');
      }, 2000);
    } catch (error) {
      console.error('FAILED...', error);
      showFormStatus('error', contactForm);
      window.open(whatsappUrl, '_blank', 'noopener');
    }
  });
};

const initCategoryTabs = () => {
  const categoryButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.category-btn'));
  const categoryContents = Array.from(document.querySelectorAll<HTMLElement>('.category-content'));

  if (!categoryButtons.length || !categoryContents.length) {
    return () => {};
  }

  const setCategory = (category: string) => {
    categoryButtons.forEach((button) => {
      const isActive = button.dataset.category === category;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    categoryContents.forEach((content) => {
      const isActive = content.dataset.category === category;
      content.classList.toggle('hidden', !isActive);
      content.classList.toggle('active', isActive);
      content.setAttribute('aria-hidden', String(!isActive));
    });
  };

  const initialCategory =
    categoryButtons.find((button) => button.classList.contains('active'))?.dataset.category || 'hospitais';

  setCategory(initialCategory);

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.category) {
        setCategory(button.dataset.category);
      }
    });
  });

  return {
    get activeCategory() {
      return categoryButtons.find((button) => button.classList.contains('active'))?.dataset.category || initialCategory;
    },
    setCategory
  };
};

const initHospitalCarousel = (getActiveCategory: () => string) => {
  const track = document.querySelector<HTMLElement>('.auto-carousel-track[data-category="hospitais"]');
  const container = document.querySelector<HTMLElement>('.auto-carousel-container');
  const prevBtn = document.querySelector<HTMLButtonElement>('.carousel-nav-btn.prev-btn[data-category="hospitais"]');
  const nextBtn = document.querySelector<HTMLButtonElement>('.carousel-nav-btn.next-btn[data-category="hospitais"]');

  if (!track || !container || !prevBtn || !nextBtn) {
    return;
  }

  const slides = Array.from(track.querySelectorAll<HTMLElement>('.carousel-slide'));
  if (!slides.length) {
    return;
  }

  let index = 0;
  let autoplayId = 0;
  let resumeId = 0;
  let pauseAutoplay = false;
  let touchStartX = 0;
  let touchCurrentX = 0;

  const getSlideStep = () => {
    const slide = slides[0];
    const gap = Number.parseFloat(getComputedStyle(track).gap || '0');
    return slide.getBoundingClientRect().width + gap;
  };

  const render = (animate = true) => {
    track.style.transition = animate ? 'transform 0.8s ease-in-out' : 'none';
    track.style.transform = `translate3d(-${index * getSlideStep()}px, 0, 0)`;
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayId);
    autoplayId = 0;
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (pauseAutoplay || getActiveCategory() !== 'hospitais' || slides.length <= 1) {
      return;
    }

    autoplayId = window.setInterval(() => {
      index = (index + 1) % slides.length;
      render();
    }, 3000);
  };

  const pauseTemporarily = () => {
    pauseAutoplay = true;
    stopAutoplay();
    window.clearTimeout(resumeId);
    resumeId = window.setTimeout(() => {
      pauseAutoplay = false;
      startAutoplay();
    }, 5000);
  };

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
    pauseTemporarily();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
    pauseTemporarily();
  });

  track.setAttribute('tabindex', '0');
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevBtn.click();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextBtn.click();
    }
  });

  container.addEventListener('mouseenter', () => {
    pauseAutoplay = true;
    stopAutoplay();
  });

  container.addEventListener('mouseleave', () => {
    pauseAutoplay = false;
    startAutoplay();
  });

  container.addEventListener('focusin', () => {
    pauseAutoplay = true;
    stopAutoplay();
  });

  container.addEventListener('focusout', () => {
    pauseAutoplay = false;
    startAutoplay();
  });

  track.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.touches[0]?.clientX || 0;
      touchCurrentX = touchStartX;
      pauseAutoplay = true;
      stopAutoplay();
    },
    { passive: true }
  );

  track.addEventListener(
    'touchmove',
    (event) => {
      touchCurrentX = event.touches[0]?.clientX || touchCurrentX;
    },
    { passive: true }
  );

  track.addEventListener('touchend', () => {
    const deltaX = touchCurrentX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevBtn.click();
      } else {
        nextBtn.click();
      }
    } else {
      render(false);
    }
    pauseTemporarily();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  window.addEventListener('resize', () => {
    render(false);
    startAutoplay();
  });

  render(false);
  startAutoplay();
};

const initMobileTrack = (content: HTMLElement) => {
  const track = content.querySelector<HTMLElement>('.carousel-track');
  const prevBtn = content.querySelector<HTMLButtonElement>('.carousel-btn.prev');
  const nextBtn = content.querySelector<HTMLButtonElement>('.carousel-btn.next');
  const slides = track ? Array.from(track.querySelectorAll<HTMLElement>('.carousel-slide')) : [];

  if (!track || !prevBtn || !nextBtn || !slides.length) {
    return;
  }

  let index = 0;
  let touchStartX = 0;
  let touchCurrentX = 0;

  const render = (animate = true) => {
    const step = slides[0].getBoundingClientRect().width;
    track.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
    track.style.transform = `translate3d(-${index * step}px, 0, 0)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= slides.length - 1;
    prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '1';
  };

  prevBtn.addEventListener('click', () => {
    index = Math.max(index - 1, 0);
    render();
  });

  nextBtn.addEventListener('click', () => {
    index = Math.min(index + 1, slides.length - 1);
    render();
  });

  track.setAttribute('tabindex', '0');
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevBtn.click();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextBtn.click();
    }
  });

  track.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.touches[0]?.clientX || 0;
      touchCurrentX = touchStartX;
    },
    { passive: true }
  );

  track.addEventListener(
    'touchmove',
    (event) => {
      touchCurrentX = event.touches[0]?.clientX || touchCurrentX;
    },
    { passive: true }
  );

  track.addEventListener('touchend', () => {
    const deltaX = touchCurrentX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevBtn.click();
      } else {
        nextBtn.click();
      }
    } else {
      render(false);
    }
  });

  window.addEventListener('resize', () => render(false));
  render(false);
};

const initCarousels = () => {
  const tabs = initCategoryTabs();

  initHospitalCarousel(() => tabs.activeCategory);

  document
    .querySelectorAll<HTMLElement>('.category-content[data-category="policlinicas"], .category-content[data-category="laboratorios"]')
    .forEach(initMobileTrack);
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initPhoneMask();
  initSmoothScroll();
  initFaq();
  initForm();
  initCarousels();
});
