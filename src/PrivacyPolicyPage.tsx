import './PrivacyPolicyPage.css'

type Props = {
  currentYear: number
  whatsappCtaHref: string
}

const collectedData = [
  'Nome',
  'Telefone',
  'E-mail',
  'Dados da empresa (quando aplicável)',
  'Informações enviadas voluntariamente em formulários ou WhatsApp',
]

const dataUsage = [
  'Entrar em contato com você',
  'Responder solicitações e enviar orçamentos',
  'Processar pedidos',
  'Melhorar nosso atendimento e serviços',
  'Enviar comunicações sobre produtos e ofertas (quando autorizado)',
]

const dataSharing = [
  'Execução dos serviços (ex: logística e entrega)',
  'Cumprimento de obrigações legais',
  'Autoridades públicas, quando exigido por lei',
]

const cookieUsage = [
  'Análise de navegação',
  'Melhorar desempenho',
  'Personalizar conteúdo',
]

const lgpdRights = [
  'Solicitar acesso aos seus dados',
  'Corrigir informações incorretas',
  'Solicitar exclusão dos dados',
  'Revogar consentimentos',
]

export default function PrivacyPolicyPage({
  currentYear,
  whatsappCtaHref,
}: Props) {
  return (
    <div className="privacy-page">
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
            <a className="nav-link" href="/servicos">
              Serviços
            </a>
            <a className="nav-link" href="/sobre-operacao">
              Sobre a operação
            </a>
          </div>
          <div className="nav-cta">
            <a
              className="btn btn--primary btn--sm"
              href={whatsappCtaHref}
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      </header>

      <main className="privacy-main">
        <section className="section privacy-hero">
          <div className="container privacy-hero-inner">
            <span className="pill">Transparência e LGPD</span>
            <h1 className="title">Política de Privacidade</h1>
            <p className="lead">
              A GP Atacado valoriza a transparência e o respeito à sua
              privacidade. Esta Política explica como coletamos, utilizamos e
              protegemos seus dados pessoais, em conformidade com a LGPD (Lei
              nº 13.709/2018).
            </p>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container privacy-content">
            <article className="card privacy-block">
              <h2 className="h2">1. Dados que coletamos</h2>
              <p className="body">
                Podemos coletar as seguintes informações quando você interage
                com nossos canais:
              </p>
              <ul className="privacy-list">
                {collectedData.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card privacy-block">
              <h2 className="h2">2. Como utilizamos seus dados</h2>
              <p className="body">Seus dados são utilizados para:</p>
              <ul className="privacy-list">
                {dataUsage.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card privacy-block">
              <h2 className="h2">3. Compartilhamento de dados</h2>
              <p className="body">
                A GP Atacado <strong>não vende seus dados pessoais</strong>.
              </p>
              <p className="body">
                Seus dados podem ser compartilhados apenas quando necessário
                para:
              </p>
              <ul className="privacy-list">
                {dataSharing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card privacy-block">
              <h2 className="h2">4. Armazenamento e segurança</h2>
              <p className="body">
                Adotamos medidas técnicas e organizacionais para proteger seus
                dados contra acesso não autorizado, vazamentos e alterações
                indevidas.
              </p>
              <p className="body">
                Os dados são armazenados apenas pelo tempo necessário para
                cumprir as finalidades descritas nesta Política.
              </p>
            </article>

            <article className="card privacy-block">
              <h2 className="h2">5. Uso de cookies</h2>
              <p className="body">
                Utilizamos cookies para melhorar sua experiência no site.
              </p>
              <p className="body">Eles podem ser usados para:</p>
              <ul className="privacy-list">
                {cookieUsage.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="body">
                Você pode desativá-los nas configurações do seu navegador.
              </p>
            </article>

            <article className="card privacy-block">
              <h2 className="h2">6. Seus direitos (LGPD)</h2>
              <p className="body">Você pode, a qualquer momento:</p>
              <ul className="privacy-list">
                {lgpdRights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="body">Para isso, basta entrar em contato conosco.</p>
            </article>

            <article className="card privacy-block">
              <h2 className="h2">7. Alterações nesta política</h2>
              <p className="body">
                Esta Política pode ser atualizada periodicamente. Recomendamos a
                revisão desta página para se manter informado.
              </p>
            </article>

            <article className="card privacy-block">
              <h2 className="h2">8. Contato</h2>
              <p className="body">
                Para dúvidas ou solicitações relacionadas à privacidade, entre
                em contato pelo e-mail:
              </p>
              <p className="privacy-email">
                <a href="mailto:gpatacado2@gmail.com">gpatacado2@gmail.com</a>
              </p>
            </article>
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
