import './App.css'
import { useEffect, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  BadgeDollarSign,
  Boxes,
  CalendarClock,
  MessageCircleMore,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import ProductsPage from './ProductsPage'
import AboutOperationPage from './AboutOperationPage'
import ServicesPage from './ServicesPage'
import PrivacyPolicyPage from './PrivacyPolicyPage'
import TermsConditionsPage from './TermsConditionsPage'
import { catalogGroups } from './catalogData'

const sanitizeText = (value: string) =>
  value
    .replace(/[<>]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trimStart()

const sanitizeName = (value: string) =>
  sanitizeText(value)
    .replace(/[^A-Za-zÀ-ÿ\s'-]/g, '')
    .slice(0, 80)

const sanitizeCompany = (value: string) =>
  sanitizeText(value)
    .replace(/[^A-Za-zÀ-ÿ0-9\s&.,'/-]/g, '')
    .slice(0, 100)

const sanitizeEmail = (value: string) =>
  value.replace(/\s/g, '').toLowerCase().slice(0, 120)

const sanitizeMessage = (value: string) =>
  value.replace(/[<>]/g, '').replace(/\s{3,}/g, ' ').slice(0, 500)

const formatCnpj = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  }
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(
      5,
      8,
    )}/${digits.slice(8)}`
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(
    5,
    8,
  )}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function App() {
  const companyName = import.meta.env.VITE_COMPANY_NAME ?? 'GP Atacado'
  const currentYear = new Date().getFullYear()
  const whatsappNumber = (
    import.meta.env.VITE_WHATSAPP_NUMBER ?? '5561993692710'
  ).replace(/\D/g, '')

  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    businessTypes: [] as string[],
    email: '',
    cnpj: '',
    whatsapp: '',
    marketingOptIn: false,
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [contactStep, setContactStep] = useState<1 | 2>(1)
  const [submitState, setSubmitState] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [fabTextIndex, setFabTextIndex] = useState(0)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [activeCatalogTab, setActiveCatalogTab] = useState('Cervejas')
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<string, number>
  >({})
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const waLink = useMemo(() => {
    const base = whatsappNumber.length > 0 ? `https://wa.me/${whatsappNumber}` : ''
    return (text: string) => (base ? `${base}?text=${encodeURIComponent(text)}` : '#')
  }, [whatsappNumber])

  const isProductsRoute =
    typeof window !== 'undefined' && window.location.pathname === '/produtos'
  const isAboutOperationRoute =
    typeof window !== 'undefined' &&
    window.location.pathname === '/sobre-operacao'
  const isServicesRoute =
    typeof window !== 'undefined' && window.location.pathname === '/servicos'
  const isPrivacyPolicyRoute =
    typeof window !== 'undefined' &&
    window.location.pathname === '/politica-de-privacidade'
  const isTermsRoute =
    typeof window !== 'undefined' &&
    window.location.pathname === '/termos-e-condicoes'

  const navItems = useMemo(
    () => [
      { id: 'about', label: 'Sobre' },
      { id: 'products', label: 'Produtos' },
      { id: 'benefits', label: 'Diferenciais' },
      { id: 'how-it-works', label: 'Como funciona' },
      { id: 'faq', label: 'Dúvidas' },
      { id: 'reviews', label: 'Avaliações' },
      { id: 'contact', label: 'Contato' },
    ],
    [],
  )

  const handleNavClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMobileNavOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) return

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).classList.add('is-visible')
          io.unobserve(entry.target)
        }
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    for (const t of targets) io.observe(t)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!isCatalogOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isCatalogOpen])

  useEffect(() => {
    const labels = ['Pedir agora', 'Falar com vendedor', 'Cotação em minutos']
    const timer = window.setInterval(() => {
      setFabTextIndex((prev) => (prev + 1) % labels.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) setIsMobileNavOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileNavOpen(false)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const validateStep = (next: typeof form, step: 1 | 2) => {
    const nextErrors: Record<string, string> = {}
    if (step === 1) {
      if (next.fullName.trim().length < 2) {
        nextErrors.fullName = 'Informe seu nome completo.'
      }
      return nextErrors
    }

    const whatsappDigits = next.whatsapp.replace(/\D/g, '')
    if (whatsappDigits.length < 10) {
      nextErrors.whatsapp = 'Informe um WhatsApp válido.'
    }
    if (next.message.trim().length < 5) {
      nextErrors.message = 'Escreva uma mensagem curta.'
    }
    return nextErrors
  }

  const submitToWhatsApp = (next: typeof form) => {
    const whatsappDigits = next.whatsapp.replace(/\D/g, '')
    const segmentText =
      next.businessTypes.length > 0
        ? next.businessTypes.join(', ')
        : 'Não informado'
    const text =
      `Olá! Quero comprar com a ${companyName}.\n\n` +
      `Nome: ${next.fullName.trim()}\n` +
      `Empresa: ${next.companyName.trim() || 'Não informado'}\n` +
      `Segmento: ${segmentText}\n` +
      `E-mail: ${next.email.trim() || 'Não informado'}\n` +
      `CNPJ: ${next.cnpj.trim() || 'Não informado'}\n` +
      `WhatsApp: ${whatsappDigits}\n` +
      `Receber promoções: ${next.marketingOptIn ? 'Sim' : 'Não'}\n` +
      `Mensagem: ${next.message.trim()}`

    const url = waLink(text)
    if (url === '#') return false
    window.open(url, '_blank', 'noopener,noreferrer')
    return true
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validateStep(form, contactStep)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('error')
      return
    }

    if (contactStep === 1) {
      setSubmitState('idle')
      setContactStep(2)
      return
    }

    const ok = submitToWhatsApp(form)
    setSubmitState(ok ? 'success' : 'error')
  }

  const toggleBusinessType = (type: string) => {
    setForm((prev) => {
      const has = prev.businessTypes.includes(type)
      const nextBusiness = has
        ? prev.businessTypes.filter((item) => item !== type)
        : [...prev.businessTypes, type]
      return { ...prev, businessTypes: nextBusiness }
    })
    setSubmitState('idle')
  }

  const contactCtaText =
    'Quero comprar bebidas no atacado. Preciso de cotação rápida no WhatsApp.'
  const whatsappCtaHref = waLink(contactCtaText)

  const products = useMemo(
    () =>
      catalogGroups.map((group) => ({
        title: group.title,
        desc: group.desc,
        micro: group.micro,
        icon: 'catalog',
        categoryImage: group.categoryImage,
        items: group.products.map((product, index) => ({
          title: product.name,
          description: 'Disponível para cotação no atacado.',
          image: product.image ?? '/logo_gp_atacado.png',
          tag: index === 0 ? 'Destaque' : undefined,
        })),
      })),
    [],
  )

  const benefits = useMemo(
    () => [
      {
        title: 'Entrega rápida',
        desc: 'Receba sem atrasos e evite gôndola vazia em horário de pico.',
        support: 'Nunca fique sem estoque',
        icon: Truck,
      },
      {
        title: 'Preço competitivo',
        desc: 'Condições de atacado para proteger margem mesmo com giro alto.',
        support: 'Aumente sua margem',
        icon: BadgeDollarSign,
      },
      {
        title: 'Mix inteligente',
        desc: 'Seleção baseada no que realmente vende no seu tipo de operação.',
        support: 'Compre o que gira',
        icon: Boxes,
      },
      {
        title: 'Atendimento no WhatsApp',
        desc: 'Você cota e confirma pedido em minutos, sem burocracia.',
        support: 'Resposta rápida',
        icon: MessageCircleMore,
      },
      {
        title: 'Para eventos',
        desc: 'Dimensionamento de volume para evitar sobra cara ou ruptura.',
        support: 'Reduza desperdício',
        icon: CalendarClock,
      },
      {
        title: 'Confiabilidade',
        desc: 'Processo claro do pedido à entrega para você comprar com confiança.',
        support: 'Previsibilidade total',
        icon: ShieldCheck,
      },
    ],
    [],
  )

  const reviews = useMemo(
    () => [
      {
        name: 'Ana M. • Proprietária de bar • Asa Norte, DF',
        text: 'No sábado faltou cerveja no pico. Chamei no WhatsApp e recebi cotação em minutos, com entrega no mesmo turno.',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHyUdV8FmSK9qzhY8kD0jsU5MS3X8qoxBcw&s',
      },
      {
        name: 'Carlos P. • Dono de mercado • Ceilândia, DF',
        text: 'Fechei compra recorrente de refrigerantes e água. Parei de perder venda por ruptura e ganhei previsibilidade de estoque.',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4flijZSdqid0KcjM-CY2W0V1TJgRzZbyfw&s',
      },
      {
        name: 'João R. • Organizador de eventos • Samambaia, DF',
        text: 'Usei para evento de 800 pessoas. Ajustaram volume comigo no WhatsApp e evitei sobra de produto no final.',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoixAQdPwC5T4c9MZvH4juuM2qTqjFBE7N-A&s',
      },
      {
        name: 'Luciana T. • Gerente de conveniência • Taguatinga, DF',
        text: 'Os energéticos saem muito no fim do dia. Com reposição rápida, mantive prateleira cheia e aumentei o faturamento.',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5kSnQycvApyclTY-LveR0HLA9XXyzSA4EDQ&s',
      },
      {
        name: 'Rafael D. • Restaurante • Águas Claras, DF',
        text: 'Passei a comprar destilados e cerveja no mesmo fornecedor. Reduzi custo operacional e recebo tudo em uma entrega.',
        photo:
          'https://i1.rgstatic.net/ii/profile.image/906845233369088-1593220160925_Q512/Marcus-Vinicius-Alves.jpg',
      },
      {
        name: 'Paulo V. • Distribuição para eventos • Guará, DF',
        text: 'No feriado precisei de reforço urgente. Falaram comigo rápido no WhatsApp e consegui atender todos os pontos de venda.',
        photo: 'https://cryptoid.com.br/wp-content/uploads/2024/08/image-2.png',
      },
    ],
    [],
  )

  const fabLabels = useMemo(
    () => ['Pedir agora', 'Falar com vendedor', 'Cotação em minutos'],
    [],
  )
  const activeCatalogData = useMemo(
    () => products.find((p) => p.title === activeCatalogTab) ?? products[0],
    [activeCatalogTab, products],
  )
  const selectedEntries = useMemo(() => {
    const entries: Array<{ title: string; category: string; qty: number }> = []
    for (const category of products) {
      for (const item of category.items) {
        const key = `${category.title}::${item.title}`
        const qty = selectedQuantities[key] ?? 0
        if (qty > 0) entries.push({ title: item.title, category: category.title, qty })
      }
    }
    return entries
  }, [products, selectedQuantities])
  const selectedItemsCount = selectedEntries.length
  const selectedUnitsCount = selectedEntries.reduce((acc, item) => acc + item.qty, 0)
  const whatsappSelectedItemsHref = useMemo(() => {
    if (selectedEntries.length === 0) {
      return waLink(
        `Olá! Quero cotar a categoria ${activeCatalogData.title} com a ${companyName}.`,
      )
    }
    const lines = selectedEntries.map((item) => `- ${item.qty}x ${item.title}`)
    const text =
      `Olá, gostaria de cotar:\n` +
      `${lines.join('\n')}\n\n` +
      `Pode me enviar valores e prazo de entrega?`
    return waLink(text)
  }, [activeCatalogData.title, companyName, selectedEntries, waLink])

  const getItemKey = (categoryTitle: string, itemTitle: string) =>
    `${categoryTitle}::${itemTitle}`

  const getQty = (categoryTitle: string, itemTitle: string) =>
    selectedQuantities[getItemKey(categoryTitle, itemTitle)] ?? 0

  const updateQty = (
    categoryTitle: string,
    itemTitle: string,
    operation: 'inc' | 'dec',
  ) => {
    const key = getItemKey(categoryTitle, itemTitle)
    setSelectedQuantities((prev) => {
      const current = prev[key] ?? 0
      const next = operation === 'inc' ? current + 1 : Math.max(0, current - 1)
      if (next === 0) {
        const nextState = { ...prev }
        delete nextState[key]
        return nextState
      }
      return { ...prev, [key]: next }
    })
  }

  const setQtyValue = (categoryTitle: string, itemTitle: string, value: number) => {
    const key = getItemKey(categoryTitle, itemTitle)
    setSelectedQuantities((prev) => {
      const normalized = Math.max(0, Math.floor(Number(value) || 0))
      if (normalized === 0) {
        const nextState = { ...prev }
        delete nextState[key]
        return nextState
      }
      return { ...prev, [key]: normalized }
    })
  }

  if (isProductsRoute) {
    return (
      <ProductsPage
        currentYear={currentYear}
        whatsappCtaHref={waLink(
          'Olá! Quero pedir no atacado e receber uma cotação em minutos.',
        )}
      />
    )
  }

  if (isAboutOperationRoute) {
    return (
      <AboutOperationPage
        currentYear={currentYear}
        whatsappCtaHref={waLink(
          'Olá! Quero receber uma cotação agora para atacado de bebidas.',
        )}
      />
    )
  }

  if (isServicesRoute) {
    return (
      <ServicesPage
        currentYear={currentYear}
        whatsappCtaHref={waLink(
          'Olá! Quero cotar os serviços da GP Atacado agora.',
        )}
      />
    )
  }

  if (isPrivacyPolicyRoute) {
    return (
      <PrivacyPolicyPage
        currentYear={currentYear}
        whatsappCtaHref={waLink(
          'Olá! Tenho uma dúvida sobre privacidade e proteção de dados.',
        )}
      />
    )
  }

  if (isTermsRoute) {
    return (
      <TermsConditionsPage
        currentYear={currentYear}
        whatsappCtaHref={waLink(
          'Olá! Tenho uma dúvida sobre os Termos e Condições de Uso.',
        )}
      />
    )
  }

  return (
    <div className="page">
      <div className="bg" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
        <div className="grid-shine" />
      </div>

      <div className="urgency-bar" role="status" aria-live="polite">
        <div className="container urgency-inner">
          <span>
            ⚡ Resposta em minutos no{' '}
            <span className="urgency-whatsapp">WhatsApp</span> | Pedido mínimo
            R$5.000
          </span>
        </div>
      </div>

      <header className="nav-wrap">
        <nav className="nav" aria-label="Navegação principal">
          <a className="brand" href="#top" onClick={handleNavClick('top')}>
            <img
              src="/logo_gp_atacado.png"
              alt="Logo GP Distribuidora de Bebidas"
              className="brand-logo"
              loading="lazy"
              decoding="async"
            />
          </a>

          <button
            className={`nav-toggle ${isMobileNavOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav-links"
            aria-label="Abrir menu de navegação"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <div
            id="mobile-nav-links"
            className={`nav-links ${isMobileNavOpen ? 'is-open' : ''}`}
            role="navigation"
            aria-label="Seções"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                className="nav-link"
                href={`#${item.id}`}
                onClick={handleNavClick(item.id)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="nav-link nav-link--cta-mobile"
              href={whatsappCtaHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileNavOpen(false)}
            >
              Pedir pelo WhatsApp
            </a>
          </div>

          <div className="nav-cta">
            <a
              className="btn btn--primary btn--sm"
              href={whatsappCtaHref}
              target="_blank"
              rel="noreferrer"
            >
              Pedir pelo WhatsApp
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="section hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="pill">
                Resposta rápida • cotação em minutos
              </div>
              <h1 className="title hero-title-in">
                Compre bebidas no atacado com entrega rápida e cotação imediata
                pelo <span className="urgency-whatsapp hero-whatsapp">WhatsApp</span>
              </h1>
              <p className="subtitle hero-subtitle-in">
                Sem espera, sem burocracia. Você envia sua lista, recebe preço em
                minutos e evita ficar sem estoque no horário de maior venda. Somos
                distribuidora de bebidas no DF com foco em atacado de bebidas e
                fornecedor para bares.
              </p>

              <div className="hero-actions hero-cta-in">
                <a
                  className="btn btn--primary"
                  href={whatsappCtaHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Pedir agora pelo WhatsApp
                </a>
              </div>

              <div className="hero-social-proof">
                <span className="proof-chip">+300 clientes atendidos</span>
                <span className="proof-chip">Entrega em todo DF</span>
              </div>

              <div className="hero-metrics">
                <div className="metric">
                  <div className="metric-kpi">+150</div>
                  <div className="metric-label">Itens no mix</div>
                </div>
                <div className="metric">
                  <div className="metric-kpi">Rápido</div>
                  <div className="metric-label">Atendimento</div>
                </div>
                <div className="metric">
                  <div className="metric-kpi">Flexível</div>
                  <div className="metric-label">Atacado & eventos</div>
                </div>
              </div>
            </div>

            <div className="hero-art hero-mockup-in">
              <HeroArt />
              <div className="floating-card floating-card--top">
                <div className="floating-title">Cotação rápida</div>
                <div className="floating-text">
                  Envie sua lista e receba valores no WhatsApp.
                </div>
              </div>
              <div className="floating-card floating-card--bottom">
                <div className="floating-title">Reposição sem ruptura</div>
                <div className="floating-text">
                  Programação de entrega e mix por giro.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container split">
            <div className="reveal" data-reveal>
              <h2 className="h2">Sobre a distribuidora</h2>
              <p className="lead">
                Se você perde venda quando falta bebida, nossa operação resolve:
                cotação rápida, entrega ágil e reposição previsível.
              </p>
              <p className="body">
                Atendemos bares, mercados, conveniências, restaurantes e eventos
                com foco em giro, margem e velocidade de atendimento no WhatsApp.
              </p>
              <div className="cta-row">
                <a
                  className="btn btn--primary"
                  href={whatsappCtaHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Pedir agora pelo WhatsApp
                </a>
                <a className="btn btn--ghost" href="#products" onClick={handleNavClick('products')}>
                  Ver produtos
                </a>
              </div>
            </div>

            <div className="glass-stack reveal" data-reveal>
              <div className="glass-card">
                <div className="glass-kpi">Atacado</div>
                <div className="glass-text">Condições para revenda e recorrência</div>
              </div>
              <div className="glass-card">
                <div className="glass-kpi">Eventos</div>
                <div className="glass-text">Planejamento de volume e logística</div>
              </div>
              <div className="glass-card">
                <div className="glass-kpi">Mix</div>
                <div className="glass-text">Categorias com alta saída e margem</div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <div className="container">
            <div className="section-head reveal" data-reveal>
              <h2 className="h2">Produtos</h2>
              <p className="lead">
                Escolha as categorias com maior impacto no seu giro. A cotação sai
                em minutos no WhatsApp.
              </p>
            </div>

            <div className="grid cards" data-reveal>
              {products.map((p) => (
                <article key={p.title} className="card reveal" data-reveal>
                  <h3 className="h3">{p.title}</h3>
                  <img
                    src={p.categoryImage}
                    alt={`Categoria ${p.title}`}
                    className="product-category-image"
                    loading="lazy"
                  />
                  <p className="micro">{p.micro}</p>
                  <p className="body">{p.desc}</p>
                  <button
                    className="card-link card-link--button"
                    type="button"
                    onClick={() => {
                      setActiveCatalogTab(p.title)
                      setIsCatalogOpen(true)
                    }}
                  >
                    Ver catálogo
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="section">
          <div className="container">
            <div className="section-head reveal" data-reveal>
              <h2 className="h2">Diferenciais</h2>
              <p className="lead">
                Benefícios práticos para você vender mais hoje e com previsibilidade
                amanhã.
              </p>
            </div>

            <div className="grid features">
              {benefits.map((b) => (
                <div key={b.title} className="card card--feature reveal" data-reveal>
                  <div className="feature-top">
                    <div className="feature-badge" aria-hidden="true">
                      <FeatureIcon icon={b.icon} />
                    </div>
                    <h3 className="h3">{b.title}</h3>
                  </div>
                  <p className="micro">{b.support}</p>
                  <p className="body">{b.desc}</p>
                  <div className="feature-cta">
                    <a
                      className="btn btn--ghost btn--sm"
                      href={whatsappCtaHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pedir agora pelo WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section">
          <div className="container">
            <div className="section-head reveal" data-reveal>
              <h2 className="h2">Como pedir em menos de 1 minuto</h2>
              <p className="lead">
                Processo direto para você comprar rápido e voltar a focar no seu
                negócio.
              </p>
            </div>

            <div className="grid how-grid">
              {[
                'Clique no WhatsApp',
                'Envie sua lista',
                'Receba cotação',
                'Confirme o pedido',
              ].map((step, index) => (
                <article key={step} className="card how-step reveal" data-reveal>
                  <div className="step-number">0{index + 1}</div>
                  <h3 className="h3">{step}</h3>
                  <p className="body">
                    {index === 0 &&
                      'Você inicia em um clique, sem cadastro e sem espera.'}
                    {index === 1 &&
                      'Pode enviar texto, foto ou lista pronta do que precisa.'}
                    {index === 2 &&
                      'Nossa equipe retorna rápido com preço e condições.'}
                    {index === 3 &&
                      'Ajuste final, confirmação e entrega programada.'}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <div className="section-head reveal" data-reveal>
              <h2 className="h2">Dúvidas comuns</h2>
              <p className="lead">
                Respostas rápidas para você decidir agora, com mais segurança.
              </p>
            </div>

            <div className="faq-list">
              <details className="faq-item reveal" data-reveal>
                <summary>Tem pedido mínimo?</summary>
                <p className="body">
                  Sim. Trabalhamos com pedido mínimo de R$5.000 para manter
                  condições competitivas no atacado.
                </p>
              </details>
              <details className="faq-item reveal" data-reveal>
                <summary>Entrega onde?</summary>
                <p className="body">
                  Atendemos todo o DF com rotas organizadas para manter rapidez e
                  previsibilidade.
                </p>
              </details>
              <details className="faq-item reveal" data-reveal>
                <summary>Quanto tempo demora para responder?</summary>
                <p className="body">
                  Em horário comercial, normalmente retornamos em minutos no
                  WhatsApp.
                </p>
              </details>
              <details className="faq-item reveal" data-reveal>
                <summary>Precisa CNPJ para comprar?</summary>
                <p className="body">
                  Sim. Atendemos empresas com CNPJ para pedidos no modelo atacado.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section id="reviews" className="section">
          <div className="container">
            <div className="section-head reveal" data-reveal>
              <h2 className="h2">Avaliações</h2>
              <p className="lead">
                Resultados reais de quem precisava de resposta rápida e reposição
                sem falhas.
              </p>
            </div>

            <div className="grid reviews">
              {reviews.map((r) => (
                <article key={r.name} className="card card--review reveal" data-reveal>
                  <div className="review-head">
                    <img
                      src={r.photo}
                      alt={`Foto de ${r.name}`}
                      className="review-photo"
                      loading="lazy"
                    />
                    <div className="reviewer">{r.name}</div>
                  </div>
                  <div className="stars" aria-label="Avaliação 5 de 5">
                    ★★★★★
                  </div>
                  <p className="body">“{r.text}”</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-grid">
            <div className="contact-copy reveal" data-reveal>
              <h2 className="h2">Contato</h2>
              <p className="lead">
                Preencha os dados e envie direto para o WhatsApp. Sem cadastro,
                sem espera. Respondemos em minutos.
              </p>
              <div className="contact-card">
                <div className="contact-row">
                  <div className="contact-icon" aria-hidden="true">
                    <IconBolt />
                  </div>
                  <div>
                    <div className="contact-title">Resposta rápida</div>
                    <div className="contact-text">
                      Normalmente respondemos em poucos minutos no horário
                      comercial.
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <div className="contact-icon" aria-hidden="true">
                    <IconShield />
                  </div>
                  <div>
                    <div className="contact-title">Compra recorrente</div>
                    <div className="contact-text">
                      Combine periodicidade e reduza ruptura de estoque.
                    </div>
                  </div>
                </div>
                <a
                  className="btn btn--primary"
                  href={whatsappCtaHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Receber cotação em minutos
                </a>
                <p className="cta-micro">Sem compromisso. Resposta rápida.</p>
              </div>
            </div>

            <form
              className="form card reveal"
              data-reveal
              onSubmit={onSubmit}
              tabIndex={-1}
              aria-label="Formulário de contato"
            >
              <div className="form-grid">
                {contactStep === 1 ? (
                  <>
                    <Field
                      label="Nome Completo"
                      value={form.fullName}
                      onChange={(v) => {
                        setForm((prev) => ({
                          ...prev,
                          fullName: sanitizeName(v),
                        }))
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.fullName
                          return next
                        })
                        setSubmitState('idle')
                      }}
                      placeholder="Seu nome completo"
                      error={errors.fullName}
                      autoComplete="name"
                    />
                    <Field
                      label="Nome da empresa"
                      value={form.companyName}
                      onChange={(v) => {
                        setForm((prev) => ({
                          ...prev,
                          companyName: sanitizeCompany(v),
                        }))
                        setSubmitState('idle')
                      }}
                      placeholder="Nome da empresa"
                    />
                    <div className="field">
                      <span className="field-label">Segmento</span>
                      <div className="inline-checks">
                        {['Bar', 'Restaurante', 'Empório', 'Evento', 'Outro'].map(
                          (segment) => (
                            <label key={segment} className="inline-check">
                              <input
                                type="checkbox"
                                checked={form.businessTypes.includes(segment)}
                                onChange={() => toggleBusinessType(segment)}
                              />
                              <span>{segment}</span>
                            </label>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Field
                      label="E-mail"
                      value={form.email}
                      onChange={(v) => {
                        setForm((prev) => ({ ...prev, email: sanitizeEmail(v) }))
                        setSubmitState('idle')
                      }}
                      placeholder="seuemail@empresa.com"
                      autoComplete="email"
                    />
                    <div className="form-inline">
                      <Field
                        label="CNPJ"
                        value={form.cnpj}
                        onChange={(v) => {
                          setForm((prev) => ({
                            ...prev,
                            cnpj: formatCnpj(v),
                          }))
                          setSubmitState('idle')
                        }}
                        placeholder="00.000.000/0001-00"
                      />
                      <Field
                        label="WhatsApp"
                        value={form.whatsapp}
                        onChange={(v) => {
                          setForm((prev) => ({
                            ...prev,
                            whatsapp: formatPhone(v),
                          }))
                          setErrors((prev) => {
                            const next = { ...prev }
                            delete next.whatsapp
                            return next
                          })
                          setSubmitState('idle')
                        }}
                        placeholder="(61) 99999-9999"
                        autoComplete="tel"
                        error={errors.whatsapp}
                      />
                    </div>
                    <Field
                      label="Mensagem"
                      value={form.message}
                      onChange={(v) => {
                        setForm((prev) => ({
                          ...prev,
                          message: sanitizeMessage(v),
                        }))
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.message
                          return next
                        })
                        setSubmitState('idle')
                      }}
                      placeholder="Ex: Quero cotar cervejas e refrigerantes para revenda."
                      error={errors.message}
                      multiline
                    />
                    <label className="inline-check inline-check--wide">
                      <input
                        type="checkbox"
                        checked={form.marketingOptIn}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            marketingOptIn: e.target.checked,
                          }))
                        }
                      />
                      <span>
                        Desejo receber promoções, combos e/ou novidades por WhatsApp
                      </span>
                    </label>
                  </>
                )}
              </div>

              <div className="form-actions">
                {contactStep === 2 && (
                  <button
                    className="btn btn--ghost"
                    type="button"
                    onClick={() => {
                      setContactStep(1)
                      setSubmitState('idle')
                    }}
                  >
                    Voltar
                  </button>
                )}
                <button className="btn btn--primary" type="submit">
                  {contactStep === 1
                    ? 'Continuar'
                    : 'Pedir agora pelo WhatsApp'}
                </button>
                <a
                  className="btn btn--ghost"
                  href="#products"
                  onClick={handleNavClick('products')}
                >
                  Ver catálogo primeiro
                </a>
              </div>

              {submitState === 'success' && (
                <div className="form-note form-note--ok" role="status">
                  WhatsApp aberto. Se não abrir, tente novamente em “Pedir agora pelo WhatsApp”.
                </div>
              )}
              {submitState === 'error' && (
                <div className="form-note form-note--err" role="status">
                  Verifique os campos e tente novamente.
                </div>
              )}
            </form>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-left">
              <div className="brand brand--footer">
                <img
                  src="/logo_gp_atacado.png"
                  alt="Logo GP Distribuidora de Bebidas"
                  className="brand-logo brand-logo--footer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="footer-note">
                Cotação em minutos e atendimento rápido via WhatsApp.
              </div>
              <div className="footer-contact-info">
                <div className="info-group">
                  <div className="info-title">Fale conosco</div>
                  <div className="info-text">(61) 99369-2710</div>
                </div>
                <div className="info-group">
                  <div className="info-title">e-mail</div>
                  <div className="info-text">gpatacado2@gmail.com</div>
                </div>
                <div className="info-group">
                  <div className="info-title">De segunda à sábado</div>
                  <div className="info-text">De 8h às 19h</div>
                </div>
                <div className="info-group">
                  <div className="info-title">Domingos e feriados</div>
                  <div className="info-text">De 9h às 16h</div>
                </div>
              </div>
              <div className="footer-social">
                <a
                  className="social-link"
                  href="https://www.instagram.com/atacado.gp/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram da GP Distribuidora"
                >
                  <IconInstagram />
                  <span>Instagram</span>
                </a>
                <a
                  className="social-link"
                  href="https://www.facebook.com/atacado.gp"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook da GP Distribuidora"
                >
                  <IconFacebook />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
            <div className="footer-right footer-nav-columns">
              <div className="footer-col">
                <div className="footer-title">Links Rápidos</div>
                <a className="footer-link" href="/sobre-operacao">
                  Sobre a operação
                </a>
                <a className="footer-link" href="/servicos">
                  Serviços
                </a>
                <a className="footer-link" href="/produtos">
                  Produtos
                </a>
                <a className="footer-link" href="/contato.html">
                  Contato
                </a>
              </div>
              <div className="footer-col">
                <div className="footer-title">Links Úteis</div>
                <a className="footer-link" href="/politica-de-privacidade">
                  Política de Privacidade
                </a>
                <a className="footer-link" href="/termos-e-condicoes">
                  Termos & Condições
                </a>
              </div>
            </div>
          </div>
          <div className="container footer-copy">
            Todos os direitos estão reservados à GP Distribuidora de Bebidas |
            Copyright © {currentYear}
          </div>
        </footer>
      </main>

      <a
        className="wa-fab"
        href={whatsappCtaHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <IconWhatsApp />
        <span className="wa-fab-text">{fabLabels[fabTextIndex]}</span>
      </a>

      {isCatalogOpen && (
        <div
          className="catalog-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="catalog-title"
          onClick={() => setIsCatalogOpen(false)}
        >
          <div
            className="catalog-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="catalog-head">
              <h3 id="catalog-title" className="h3">
                Escolha seus produtos
              </h3>
              <p className="catalog-subtitle">
                Monte seu pedido em segundos e finalize no WhatsApp
              </p>
              <button
                type="button"
                className="catalog-close"
                onClick={() => setIsCatalogOpen(false)}
                aria-label="Fechar catálogo"
              >
                ✕
              </button>
            </div>
            <div className="catalog-tabs" role="tablist" aria-label="Categorias">
              {products.map((category) => (
                <button
                  key={category.title}
                  type="button"
                  className={`catalog-tab ${category.title === activeCatalogData.title ? 'is-active' : ''}`}
                  role="tab"
                  aria-selected={category.title === activeCatalogData.title}
                  onClick={() => setActiveCatalogTab(category.title)}
                >
                  {category.title}
                </button>
              ))}
            </div>
            <div className="catalog-grid">
              {activeCatalogData.items.map((item) => (
                <article key={item.title} className="catalog-item-card">
                  <img
                    src={item.image}
                    alt={`Imagem do produto ${item.title}`}
                    className="catalog-item-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="catalog-item-copy">
                    <h4 className="catalog-item-title">{item.title}</h4>
                    <p className="catalog-item-desc">{item.description}</p>
                    <div className="catalog-item-meta">
                      {item.tag && <span className="catalog-tag">{item.tag}</span>}
                      {getQty(activeCatalogData.title, item.title) > 0 && (
                        <span className="catalog-added">Added</span>
                      )}
                    </div>
                    <div className="qty-control">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() =>
                          updateQty(activeCatalogData.title, item.title, 'dec')
                        }
                        aria-label={`Remover quantidade de ${item.title}`}
                      >
                        -
                      </button>
                      <input
                        className="qty-input"
                        type="number"
                        min={0}
                        inputMode="numeric"
                        value={getQty(activeCatalogData.title, item.title)}
                        onChange={(e) =>
                          setQtyValue(
                            activeCatalogData.title,
                            item.title,
                            Number(e.target.value),
                          )
                        }
                        aria-label={`Quantidade de ${item.title}`}
                      />
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() =>
                          updateQty(activeCatalogData.title, item.title, 'inc')
                        }
                        aria-label={`Adicionar quantidade de ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="mini-cart-indicator"
              onClick={() => setIsSummaryOpen((prev) => !prev)}
            >
              {selectedItemsCount} itens selecionados
            </button>
            {isSummaryOpen && (
              <div className="catalog-summary">
                <div className="catalog-summary-title">
                  Resumo do pedido ({selectedUnitsCount} unidades)
                </div>
                <ul className="catalog-summary-list">
                  {selectedEntries.length === 0 && (
                    <li>Nenhum item selecionado ainda.</li>
                  )}
                  {selectedEntries.map((entry) => (
                    <li key={`${entry.category}-${entry.title}`}>
                      {entry.qty}x {entry.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="catalog-actions">
              <a
                className="btn btn--primary"
                href={whatsappSelectedItemsHref}
                target="_blank"
                rel="noreferrer"
              >
                Finalizar pedido no WhatsApp
              </a>
              <a className="catalog-secondary-link" href="/produtos">
                Ver catálogo completo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

function Field(props: {
  label: string
  value: string
  placeholder?: string
  autoComplete?: string
  error?: string
  multiline?: boolean
  onChange: (value: string) => void
}) {
  const id = useMemo(() => `f_${props.label.toLowerCase().replace(/\s+/g, '_')}`, [props.label])
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{props.label}</span>
      {props.multiline ? (
        <textarea
          id={id}
          className="input"
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(e.target.value)}
          rows={5}
        />
      ) : (
        <input
          id={id}
          className="input"
          value={props.value}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
      {props.error && <span className="field-error">{props.error}</span>}
    </label>
  )
}

function HeroArt() {
  return (
    <div className="art phone-scene" aria-hidden="true">
      <div className="mockup-bottles">
        <div className="hero-bottle hero-bottle--left-a" />
        <div className="hero-bottle hero-bottle--left-b" />
        <div className="hero-bottle hero-bottle--right-a" />
        <div className="hero-bottle hero-bottle--right-b" />
      </div>

      <div className="floating-drink floating-drink--can" />
      <div className="floating-drink floating-drink--bottle" />
      <div className="floating-drink floating-drink--pack" />

      <div className="phone-shell">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-app">
            <div className="phone-app-top">
              <img
                src="/logo_gp_atacado.png"
                alt=""
                className="phone-logo"
                loading="lazy"
                decoding="async"
              />
              <span className="phone-app-title">Pedido rápido</span>
            </div>
            <div className="phone-list">
              <div className="phone-list-item">
                <span className="phone-item-name">Heineken</span>
                <span className="phone-item-qty">10x</span>
              </div>
              <div className="phone-list-item">
                <span className="phone-item-name">Coca-Cola</span>
                <span className="phone-item-qty">5x</span>
              </div>
              <div className="phone-list-item">
                <span className="phone-item-name">Energético</span>
                <span className="phone-item-qty">8x</span>
              </div>
            </div>
            <div className="phone-send">Enviar pedido</div>
          </div>
        </div>
      </div>
      <div className="phone-glow" />
      <div className="mockup-badges">
        <span className="mockup-badge">🍺 Cervejas</span>
        <span className="mockup-badge">🥤 Refrigerantes</span>
        <span className="mockup-badge">⚡ Energéticos</span>
      </div>
    </div>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.601 2.326A7.854 7.854 0 0 0 8 0C3.58 0 0 3.58 0 8c0 1.414.37 2.744 1.017 3.896L0 16l4.228-1.108A7.95 7.95 0 0 0 8 16c4.42 0 8-3.58 8-8 0-2.136-.83-4.146-2.399-5.674zM8 14.5a6.47 6.47 0 0 1-3.301-.902l-.236-.141-2.51.658.67-2.445-.154-.25a6.477 6.477 0 0 1-.992-3.42C1.477 4.42 4.42 1.477 8 1.477c1.73 0 3.355.674 4.578 1.897A6.44 6.44 0 0 1 14.5 8c0 3.58-2.92 6.5-6.5 6.5zm3.72-4.99c-.204-.102-1.204-.595-1.39-.663-.185-.068-.32-.102-.457.103-.136.204-.525.663-.644.8-.118.136-.237.153-.44.05-.204-.102-.86-.317-1.637-1.01-.605-.54-1.013-1.206-1.132-1.41-.118-.203-.013-.313.09-.415.092-.092.204-.238.305-.356.102-.119.136-.204.204-.34.068-.136.034-.255-.017-.357-.05-.102-.457-1.102-.627-1.51-.166-.398-.335-.344-.457-.35l-.39-.007c-.136 0-.357.05-.543.255-.186.204-.712.695-.712 1.695 0 1 .729 1.966.83 2.102.102.136 1.43 2.183 3.467 3.06.484.209.86.333 1.153.426.484.154.925.132 1.273.08.389-.058 1.204-.492 1.374-.968.17-.475.17-.883.119-.968-.051-.085-.187-.136-.39-.238z"
      />
    </svg>
  )
}

function FeatureIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Icon size={20} strokeWidth={2.1} aria-hidden="true" />
  )
}

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13 2 3 14h7l-1 8 12-14h-7l-1-6Z"
      />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 4 5.5V11c0 5.25 3.4 9.9 8 11 4.6-1.1 8-5.75 8-11V5.5L12 2Zm0 18c-3.3-1.05-6-4.74-6-9V6.6l6-2.25 6 2.25V11c0 4.26-2.7 7.95-6 9Z"
      />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.9A3.9 3.9 0 0 0 3.9 7.8v8.4a3.9 3.9 0 0 0 3.9 3.9h8.4a3.9 3.9 0 0 0 3.9-3.9V7.8a3.9 3.9 0 0 0-3.9-3.9H7.8Zm8.9 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Z"
      />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.4 22v-8h2.7l.4-3h-3V9.1c0-.87.26-1.45 1.52-1.45H16.6V5c-.28-.04-1.22-.12-2.32-.12-2.29 0-3.86 1.35-3.86 3.85V11H8v3h2.42v8h2.98Z"
      />
    </svg>
  )
}
