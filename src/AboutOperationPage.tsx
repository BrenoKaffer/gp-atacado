import './AboutOperationPage.css'

type Props = {
  currentYear: number
  whatsappCtaHref: string
}

const operationalMetrics = [
  '+300 clientes atendidos',
  'Entrega em todo DF',
  'Mix com +150 produtos',
]

const clientProblems = [
  'Falta de reposição nos horários de maior venda',
  'Fornecedor lento para responder cotação',
  'Preço instável que derruba margem',
]

const operationSolutions = [
  'Cotação em minutos no WhatsApp',
  'Entrega rápida e previsível',
  'Mix inteligente baseado em giro',
]

const businessDifferentials = [
  'Reposição sem ruptura',
  'Previsibilidade de estoque',
  'Atendimento rápido e objetivo',
]

const trustPoints = [
  'Atuação em várias regiões do DF',
  'Operação logística estruturada para atacado',
  'Variedade de produtos para bares, mercados e eventos',
]

export default function AboutOperationPage({
  currentYear,
  whatsappCtaHref,
}: Props) {
  return (
    <div className="about-operation-page">
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
              Catálogo
            </a>
            <a className="nav-link" href="/servicos">
              Serviços
            </a>
            <a className="nav-link" href="/#reviews">
              Avaliações
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
              Receber cotação
            </a>
          </div>
        </nav>
      </header>

      <main className="about-operation-main">
        <section className="section about-hero">
          <div className="container about-hero-inner">
            <span className="pill">Sobre a operação</span>
            <h1 className="title">Distribuição de bebidas sem complicação</h1>
            <p className="lead">
              Atendemos bares, mercados e eventos com entrega rápida e reposição
              contínua.
            </p>
            <div className="cta-row">
              <a
                className="btn btn--primary"
                href={whatsappCtaHref}
                target="_blank"
                rel="noreferrer"
              >
                Receber cotação agora no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container">
            <div className="about-grid about-grid--three">
              {operationalMetrics.map((metric) => (
                <article key={metric} className="card about-stat-card">
                  <strong>{metric}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container about-grid about-grid--two">
            <article className="card">
              <h2 className="h2">Por que a maioria perde venda?</h2>
              <ul className="about-list">
                {clientProblems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h2 className="h2">Como resolvemos isso</h2>
              <ul className="about-list">
                {operationSolutions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="h2">Como funciona nossa distribuição</h2>
              <p className="lead">
                Fluxo simples para você comprar rápido e manter estoque saudável.
              </p>
            </div>
            <div className="about-grid about-grid--four">
              <article className="card about-step-card">
                <span className="about-step-index">01</span>
                <h3 className="h3">Envia sua lista</h3>
              </article>
              <article className="card about-step-card">
                <span className="about-step-index">02</span>
                <h3 className="h3">Recebe cotação</h3>
              </article>
              <article className="card about-step-card">
                <span className="about-step-index">03</span>
                <h3 className="h3">Confirma pedido</h3>
              </article>
              <article className="card about-step-card">
                <span className="about-step-index">04</span>
                <h3 className="h3">Recebe entrega</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container about-grid about-grid--two">
            <article className="card">
              <h2 className="h2">Diferencial real</h2>
              <ul className="about-list">
                {businessDifferentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h2 className="h2">Bloco de confiança</h2>
              <ul className="about-list">
                {trustPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container card about-copy-block">
            <h2 className="h2">Nossa operação no seu dia a dia</h2>
            <p className="body">
              Não somos apenas uma distribuidora. Somos a operação por trás de
              bares, mercados e eventos que não podem ficar sem estoque.
            </p>
            <p className="body">
              Sabemos que perder venda por falta de produto custa caro. Por isso,
              criamos um processo simples: você envia sua lista, recebe cotação
              em minutos e garante reposição sem ruptura.
            </p>
            <p className="body">Sem burocracia. Sem espera. Sem complicação.</p>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container card about-final-cta">
            <h2 className="h2">Receber cotação agora no WhatsApp</h2>
            <p className="lead">Resposta em minutos. Sem compromisso.</p>
            <a
              className="btn btn--primary"
              href={whatsappCtaHref}
              target="_blank"
              rel="noreferrer"
            >
              Falar com vendedor agora
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
              <a className="footer-link" href="/servicos">
                Nossos serviços
              </a>
              <a className="footer-link" href="/sobre-operacao">
                Sobre a operação
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
