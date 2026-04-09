import heroDesktop from '../assets/images/team-young-specialist-doctors-standing-corridor-hospital.jpg';
import heroMobile from '../assets/images/fundo-hero-mobile.jpg';
import logo from '../assets/images/sobam-logo.png';
import footerLogo from '../assets/images/logo-sobam-1.png';
import vaicoLogo from '../assets/images/Logo-VaiCo_horizontal_BRANCO_-1.png';
import ansLogo from '../assets/images/ans-branca.png';
import favicon from '../assets/images/transferir.png';
import planFamily from '../assets/images/individual-e-familiar.jpg';
import planBusiness from '../assets/images/empresarial.jpg';
import hospitalCaieiras from '../assets/images/hospitais/Hospital-Clinicas-Caieiras-.jpg';
import hospitalPitangueiras from '../assets/images/hospitais/Hospital-Pitangueiras-Jundiai-SP.jpg';
import hospitalItupeva from '../assets/images/hospitais/hospital-psiquiatrico-itupeva.jpeg';
import policlinicaCabreuva from '../assets/images/policlinicas/Policlinica-Cabreuva.jpg';
import policlinicaCampoLimpo from '../assets/images/policlinicas/Policlinica-Campo-Limpo-PTA.jpg';
import policlinicaVarzea from '../assets/images/policlinicas/Policlinica-Varzea-PTA.jpg';
import centroOrtopedia from '../assets/images/policlinicas/Centro-de-Ortopedia-Jundiai.jpg';
import centroPediatria from '../assets/images/policlinicas/Centro-de-Pediatria-Jundiai.jpg';
import centroEspecialidades from '../assets/images/policlinicas/Centro-de-Especialidades-Jundiai.jpg';
import laboratorioCta from '../assets/images/Laboratorios/CTA-Caieiras.jpg';
import laboratorioCampoLimpo from '../assets/images/Laboratorios/Anchieta-Campo-Limpo-PTA.jpg';
import laboratorioItupeva from '../assets/images/Laboratorios/Anchieta-Itupeva.jpg';
import laboratorioAnchieta from '../assets/images/Laboratorios/Anchieta-Rua-Anchieta-Jundiai.jpg';
import laboratorio23 from '../assets/images/Laboratorios/Anchieta-Rua-23-de-Maio-Jundiai.jpg';
import laboratorioItalia from '../assets/images/Laboratorios/Anchieta-Rua-Italia-Jundiai.jpg';

export const siteConfig = {
  siteUrl: 'https://planosobam.com.br',
  siteName: 'SOBAM Planos',
  title: 'SOBAM Planos | Plano de saúde familiar e empresarial em Jundiaí e região',
  description:
    'Planos de saúde SOBAM com cobertura ANS, rede própria e atendimento em Jundiaí e região. Solicite seu orçamento gratuito para plano familiar ou empresarial.',
  keywords:
    'plano de saúde, planos de saúde sobam, plano de saúde jundiaí, plano de saúde empresarial, plano de saúde familiar, orçamento plano de saúde, sobam jundiaí',
  themeColor: '#0070BA',
  whatsappUrl:
    'https://api.whatsapp.com/send?phone=5511967660060&text=Ol%C3%A1!%20Gostaria%20de%20receber%20um%20or%C3%A7amento%20dos%20planos%20de%20sa%C3%BAde%20Sobam.',
  phoneDisplay: '(11) 4805-5293',
  phoneRaw: '1148055293',
  address: 'Rua das Pitangueiras 660 - Jundiaí/SP',
  gtmId: 'GTM-PDP7B2XV',
  emailJs: {
    publicKey: 'DYP-ZCfj9GmFyfXd0',
    serviceId: 'service_7lksfa7',
    templateId: 'template_fd93bol'
  }
};

export const brandAssets = {
  logo,
  footerLogo,
  vaicoLogo,
  ansLogo,
  favicon,
  heroDesktop,
  heroMobile
};

export const navigation = [
  { label: 'Individual e Familiar', href: '#individual' },
  { label: 'Empresarial', href: '#empresarial' },
  { label: 'Rede', href: '#rede' },
  { label: 'Planos', href: '#planos' }
];

export const heroHighlights = [
  { icon: 'shield', label: 'Cobertura ANS' },
  { icon: 'hospital', label: 'Rede própria' },
  { icon: 'clock', label: 'Atendimento 24h' }
] as const;

export const benefits = [
  {
    icon: 'shield',
    title: 'Cobertura Completa ANS',
    description: 'Planos regulamentados pela Agência Nacional de Saúde.'
  },
  {
    icon: 'pills',
    title: 'Descontos em Farmácias',
    description: 'Rede credenciada com descontos especiais em medicamentos.'
  },
  {
    icon: 'bed',
    title: 'Acomodação Flexível',
    description: 'Opções coletivas ou privativas conforme sua preferência.'
  },
  {
    icon: 'pin',
    title: 'Atendimento Regional',
    description: 'Rede própria em várias cidades da região de Jundiaí.'
  }
] as const;

export const plans = [
  {
    id: 'individual',
    title: 'Individual/Familiar',
    subtitle: 'Perfeito para você e sua família',
    image: planFamily,
    imageAlt: 'Família sorrindo para representar plano individual e familiar',
    featured: false,
    items: [
      'Cobertura para consultas médicas',
      'Exames laboratoriais',
      'Internação hospitalar',
      'Cirurgias eletivas',
      'Atendimento de urgência'
    ]
  },
  {
    id: 'empresarial',
    title: 'Empresarial',
    subtitle: 'MEI e CNPJ com cuidado para a sua equipe',
    image: planBusiness,
    imageAlt: 'Equipe profissional representando plano empresarial',
    featured: true,
    badge: 'Mais popular',
    items: [
      'Todos os benefícios do plano individual',
      'Descontos especiais para empresas',
      'Gestão simplificada de beneficiários',
      'Suporte dedicado para empresas'
    ]
  }
];

export const networkCategories = [
  {
    id: 'hospitais',
    label: 'Hospitais',
    description: 'Hospitais de referência para atendimento regional.',
    slides: [
      {
        title: 'Hospital Clínicas Caieiras',
        description: 'Atendimento especializado em Caieiras.',
        image: hospitalCaieiras,
        alt: 'Fachada do Hospital Clínicas Caieiras'
      },
      {
        title: 'Hospital Pitangueiras',
        description: 'Referência hospitalar em Jundiaí.',
        image: hospitalPitangueiras,
        alt: 'Fachada do Hospital Pitangueiras em Jundiaí'
      },
      {
        title: 'Hospital Psiquiátrico Itupeva',
        description: 'Atendimento psiquiátrico especializado em Itupeva.',
        image: hospitalItupeva,
        alt: 'Hospital Psiquiátrico em Itupeva'
      }
    ]
  },
  {
    id: 'policlinicas',
    label: 'Policlínicas',
    description: 'Rede ambulatorial com várias especialidades.',
    slides: [
      {
        title: 'Policlínica Cabreúva',
        description: 'Atendimento em Cabreúva.',
        image: policlinicaCabreuva,
        alt: 'Policlínica Cabreúva'
      },
      {
        title: 'Policlínica Campo Limpo PTA',
        description: 'Atendimento em Campo Limpo Paulista.',
        image: policlinicaCampoLimpo,
        alt: 'Policlínica Campo Limpo PTA'
      },
      {
        title: 'Policlínica Várzea PTA',
        description: 'Atendimento em Várzea Paulista.',
        image: policlinicaVarzea,
        alt: 'Policlínica Várzea PTA'
      },
      {
        title: 'Centro de Ortopedia Jundiaí',
        description: 'Especializado em ortopedia.',
        image: centroOrtopedia,
        alt: 'Centro de Ortopedia em Jundiaí'
      },
      {
        title: 'Centro de Pediatria Jundiaí',
        description: 'Especializado em pediatria.',
        image: centroPediatria,
        alt: 'Centro de Pediatria em Jundiaí'
      },
      {
        title: 'Centro de Especialidades Jundiaí',
        description: 'Múltiplas especialidades em um só lugar.',
        image: centroEspecialidades,
        alt: 'Centro de Especialidades em Jundiaí'
      }
    ]
  },
  {
    id: 'laboratorios',
    label: 'Laboratórios',
    description: 'Exames laboratoriais em unidades da região.',
    slides: [
      {
        title: 'CTA Caieiras',
        description: 'Laboratório em Caieiras.',
        image: laboratorioCta,
        alt: 'CTA Caieiras'
      },
      {
        title: 'Anchieta Campo Limpo PTA',
        description: 'Laboratório em Campo Limpo Paulista.',
        image: laboratorioCampoLimpo,
        alt: 'Laboratório Anchieta Campo Limpo PTA'
      },
      {
        title: 'Anchieta Itupeva',
        description: 'Laboratório em Itupeva.',
        image: laboratorioItupeva,
        alt: 'Laboratório Anchieta Itupeva'
      },
      {
        title: 'Anchieta Rua Anchieta Jundiaí',
        description: 'Laboratório em Jundiaí.',
        image: laboratorioAnchieta,
        alt: 'Laboratório Anchieta na Rua Anchieta em Jundiaí'
      },
      {
        title: 'Anchieta Rua 23 de Maio Jundiaí',
        description: 'Laboratório em Jundiaí.',
        image: laboratorio23,
        alt: 'Laboratório Anchieta na Rua 23 de Maio em Jundiaí'
      },
      {
        title: 'Anchieta Rua Itália Jundiaí',
        description: 'Laboratório em Jundiaí.',
        image: laboratorioItalia,
        alt: 'Laboratório Anchieta na Rua Itália em Jundiaí'
      }
    ]
  }
];

export const faqs = [
  {
    question: 'Qual a vantagem em contratar um plano coparticipativo?',
    answer: 'A principal vantagem é o valor. Os planos SOBAM coparticipativos podem ter custo até 20% menor.'
  },
  {
    question: 'Quais procedimentos médicos os planos SOBAM cobrem?',
    answer:
      'Os planos cobrem os procedimentos previstos no Rol da ANS, incluindo consultas, exames, cirurgias, internações, transplantes e tratamentos complexos.'
  },
  {
    question: 'Como funciona a contratação?',
    answer:
      'A contratação é totalmente online, com um processo rápido, prático e sem burocracia para facilitar o fechamento do plano.'
  },
  {
    question: 'Como recebo o orçamento com os valores do meu plano?',
    answer:
      'Preencha o formulário e um consultor especializado entra em contato por telefone ou WhatsApp para montar seu orçamento e orientar a contratação.'
  }
] as const;
