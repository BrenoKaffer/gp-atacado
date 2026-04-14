import './ServicesPage.css'

type Props = {
  currentYear: number
  whatsappCtaHref: string
}

const serviceHighlights = [
  {
    title: 'Cotação rápida',
    lines: [
      'Envie sua lista e receba valores em minutos direto no WhatsApp.',
      'Sem cadastro. Sem espera. Sem complicação.',
    ],
  },
  {
    title: 'Entrega eficiente',
    lines: [
      'Reposição rápida para evitar ruptura de estoque.',
      'Logística organizada e previsível para seu abastecimento.',
    ],
  },
  {
    title: 'Mix inteligente de produtos',
    lines: [
      'Selecionamos produtos com alto giro e boa margem para seu negócio.',
      'Você compra melhor e vende mais.',
    ],
  },
]

const partnerSegments = [
  'Bares e restaurantes',
  'Mercados e conveniências',
  'Eventos e distribuidores',
]

const operationalGoals = [
  'Manter seu estoque rodando',
  'Garantir reposição rápida',
  'Facilitar seu processo de compra',
]

export default function ServicesPage({ currentYear, whatsappCtaHref }: Props) {
  return (
    <div className="services-page">
      <div className="urgency-bar">
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
          <a className="brand" href="/" aria-label="Página inicial">
            <img
              src="/logo_gp_atacado.png"
              alt="Logo GP Distribuidora de Bebidas"
              className="brand-logo"
            />
          </a>
          <div className="nav-links" role="navigation">
            <a className="nav-link" href="/">
              Início
            </a>
            <a className="nav-link" href="/produtos">
              Produtos
            </a>
            <a className="nav-link" href="/sobre-operacao">
              Sobre a operação
            </a>
            <a className="nav-link" href="/#contact">
              Contato
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

      <main className="services-main">
        <section className="section services-hero">
          <div className="container services-hero-inner">
            <span className="pill">Nossos serviços</span>
            <h1 className="title">
              Mais que distribuição: uma operação para você não perder vendas
            </h1>
            <p className="lead">
              Na GP Atacado, nosso papel não é apenas entregar bebidas. É
              garantir que seu negócio nunca fique sem estoque nos momentos de
              maior venda.
            </p>
            <p className="body">
              Atendemos bares, mercados e eventos com um processo simples,
              rápido e sem burocracia.
            </p>
            <div className="cta-row">
              <a
                className="btn btn--primary"
                href={whatsappCtaHref}
                target="_blank"
                rel="noreferrer"
              >
                Pedir pelo WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container services-grid services-grid--three">
            {serviceHighlights.map((service) => (
              <article key={service.title} className="card">
                <h2 className="h2">{service.title}</h2>
                {service.lines.map((line) => (
                  <p key={line} className="body">
                    {line}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container services-grid services-grid--two">
            <article className="card">
              <h2 className="h2">Parceria para o seu crescimento</h2>
              <p className="body">
                Atendemos empresas que precisam de constância, com condições
                especiais e atendimento direto.
              </p>
              <ul className="services-list">
                {partnerSegments.map((segment) => (
                  <li key={segment}>{segment}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h2 className="h2">Por que isso importa?</h2>
              <p className="body">
                Porque perder venda por falta de bebida custa caro.
              </p>
              <p className="body">Nosso objetivo é simples:</p>
              <ul className="services-list">
                {operationalGoals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container card services-cta">
            <h2 className="h2">Faça sua cotação agora</h2>
            <p className="lead">
              Receba valores em minutos e organize seu próximo pedido sem
              burocracia.
            </p>
            <a
              className="btn btn--primary"
              href={whatsappCtaHref}
              target="_blank"
              rel="noreferrer"
            >
              Pedir pelo WhatsApp
            </a>
          </div>
        </section>
      </main>

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
              <a className="footer-link" href="/">
                Início
              </a>
              <a className="footer-link" href="/produtos">
                Produtos
              </a>
              <a className="footer-link" href="/sobre-operacao">
                Sobre a operação
              </a>
              <a className="footer-link" href="/servicos">
                Nossos serviços
              </a>
            </div>
          </div>
        </div>
        <div className="container footer-copy">
          Todos os direitos estão reservados à GP Distribuidora de Bebidas |
          Copyright © {currentYear}
        </div>
      </footer>
    </div>
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
