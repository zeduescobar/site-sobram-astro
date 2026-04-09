declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, params: Record<string, string>) => Promise<unknown>;
    };
  }
}

let formInitialized = false;

export function initContactForm() {
  if (formInitialized || typeof document === 'undefined') return;
  formInitialized = true;

  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const submitButton = form.querySelector<HTMLButtonElement>('#submit-btn');
  const status = form.querySelector<HTMLElement>('#form-status');
  const statusText = form.querySelector<HTMLElement>('#form-status-text');
  const phoneInput = form.querySelector<HTMLInputElement>('#telefone');

  const emailJsPublicKey = form.dataset.emailjsPublicKey ?? '';
  const emailJsServiceId = form.dataset.emailjsServiceId ?? '';
  const emailJsTemplateId = form.dataset.emailjsTemplateId ?? '';
  const whatsappUrl = form.dataset.whatsappUrl ?? '';

  const setStatus = (message: string, tone: 'loading' | 'success' | 'error') => {
    if (!status || !statusText) return;
    status.hidden = false;
    status.dataset.tone = tone;
    statusText.textContent = message;
  };

  const setLoading = (loading: boolean) => {
    if (!submitButton) return;
    submitButton.disabled = loading;
    submitButton.textContent = loading ? 'Enviando...' : 'Solicitar orçamento';
  };

  const buildWhatsAppUrl = (nome: string, telefone: string, email: string, modalidade: string) => {
    const message = `Olá! Gostaria de solicitar um orçamento de plano de saúde.\n\nNome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}\nModalidade: ${modalidade}\n\nAguardo o contato!`;
    const base = new URL(whatsappUrl);
    base.searchParams.set('text', message);
    return base.toString();
  };

  const validatePhone = (value: string) => /^\d{10,11}$/.test(value.replace(/\D/g, ''));
  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const ensureEmailJs = () =>
    new Promise<void>((resolve, reject) => {
      const attempt = () => {
        if (window.emailjs) {
          window.emailjs.init(emailJsPublicKey);
          resolve();
          return;
        }
        reject(new Error('EmailJS indisponível'));
      };

      if (window.emailjs) {
        attempt();
        return;
      }

      window.setTimeout(attempt, 300);
    });

  phoneInput?.addEventListener('input', () => {
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    const masked = digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    phoneInput.value = masked;
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const nome = String(formData.get('nome') ?? '').trim();
    const telefone = String(formData.get('telefone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const modalidade = String(formData.get('modalidade') ?? '').trim();

    if (!nome || !telefone || !email || !modalidade) {
      setStatus('Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (!validatePhone(telefone)) {
      setStatus('Informe um telefone válido com DDD.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('Informe um e-mail válido.', 'error');
      return;
    }

    const whatsappFallbackUrl = buildWhatsAppUrl(nome, telefone, email, modalidade);

    try {
      setLoading(true);
      setStatus('Enviando formulário...', 'loading');

      await ensureEmailJs();
      await window.emailjs?.send(emailJsServiceId, emailJsTemplateId, {
        to_name: 'Equipe SOBAM',
        from_name: nome,
        from_email: email,
        from_phone: telefone,
        modalidade,
        reply_to: email
      });

      setStatus('Formulário enviado com sucesso. Vamos falar com você em breve.', 'success');
      form.reset();
      window.setTimeout(() => {
        window.open(whatsappFallbackUrl, '_blank', 'noopener,noreferrer');
      }, 1200);
    } catch {
      setStatus('Não conseguimos enviar agora. Abrindo o WhatsApp para não perder sua solicitação.', 'error');
      window.open(whatsappFallbackUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(false);
    }
  });
}
