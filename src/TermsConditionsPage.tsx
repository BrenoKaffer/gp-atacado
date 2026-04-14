import './TermsConditionsPage.css'

type Props = {
  currentYear: number
  whatsappCtaHref: string
}

const sitePurpose = [
  'Apresentar produtos e serviços',
  'Facilitar o contato com clientes',
  'Permitir solicitações de orçamento',
]

const forbiddenUsage = [
  'Tentar invadir ou explorar vulnerabilidades',
  'Usar dados de terceiros sem autorização',
  'Utilizar o site para fins fraudulentos',
]

const businessConditions = [
  'Produtos podem variar conforme disponibilidade',
  'Preços podem sofrer alterações',
  'Condições comerciais são definidas no momento da negociação',
]

const noLiability = [
  'Interrupções ou falhas técnicas do site',
  'Danos decorrentes do uso indevido',
  'Decisões tomadas com base nas informações do site',
]

const externalLinks = ['Conteúdo', 'Políticas', 'Práticas desses sites']

export default function TermsConditionsPage({
  currentYear,
  whatsappCtaHref,
}: Props) {
  return (
    <div className="terms-page">
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
            <a className="nav-link" href="/politica-de-privacidade">
              Privacidade
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

      <main className="terms-main">
        <section className="section terms-hero">
          <div className="container terms-hero-inner">
            <span className="pill">Regras de uso</span>
            <h1 className="title">Termos e Condições de Uso</h1>
            <p className="lead">
              Ao acessar ou utilizar o site da GP Atacado, você concorda com os
              Termos descritos abaixo.
            </p>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container terms-content">
            <article className="card terms-block">
              <h2 className="h2">1. Aceitação dos Termos</h2>
              <p className="body">
                Ao acessar o site, você declara que leu, entendeu e concorda com
                estes Termos e com a nossa Política de Privacidade.
              </p>
              <p className="body">
                Caso não concorde, recomendamos que não utilize o site.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">2. Finalidade do site</h2>
              <p className="body">O site da GP Atacado tem como objetivo:</p>
              <ul className="terms-list">
                {sitePurpose.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="body">
                Importante: este site <strong>não é uma plataforma de e-commerce</strong>.
                Pedidos e negociações são realizados via atendimento direto,
                como WhatsApp.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">3. Uso adequado</h2>
              <p className="body">
                Você concorda em utilizar o site de forma legal, ética e sem
                prejudicar terceiros ou o funcionamento do sistema.
              </p>
              <p className="body">É proibido:</p>
              <ul className="terms-list">
                {forbiddenUsage.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card terms-block">
              <h2 className="h2">4. Informações e condições comerciais</h2>
              <p className="body">
                A GP Atacado se esforça para manter as informações atualizadas,
                porém:
              </p>
              <ul className="terms-list">
                {businessConditions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="body">
                Nenhuma informação do site constitui proposta vinculante.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">5. Processo de cotação e pedidos</h2>
              <ul className="terms-list">
                <li>
                  Solicitações via site ou WhatsApp são tratadas como pedido de
                  cotação.
                </li>
                <li>
                  A confirmação do pedido depende de validação comercial.
                </li>
                <li>
                  Prazos e condições de entrega são informados no momento do
                  fechamento.
                </li>
              </ul>
            </article>

            <article className="card terms-block">
              <h2 className="h2">6. Cadastro e envio de dados</h2>
              <p className="body">
                Ao preencher formulários ou entrar em contato, você declara que
                as informações fornecidas são verdadeiras e que possui autorização
                para compartilhar dados empresariais, quando aplicável.
              </p>
              <p className="body">
                O uso dos dados segue nossa Política de Privacidade.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">7. Propriedade intelectual</h2>
              <p className="body">
                Todo o conteúdo do site, incluindo textos, imagens, logotipos e
                layout, é de propriedade da GP Atacado ou licenciado.
              </p>
              <p className="body">
                É proibido copiar, reproduzir ou distribuir sem autorização.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">8. Limitação de responsabilidade</h2>
              <p className="body">A GP Atacado não se responsabiliza por:</p>
              <ul className="terms-list">
                {noLiability.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="body">O uso do site é por conta e risco do usuário.</p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">9. Links externos</h2>
              <p className="body">
                O site pode conter links para terceiros. Não nos
                responsabilizamos por:
              </p>
              <ul className="terms-list">
                {externalLinks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card terms-block">
              <h2 className="h2">10. Disponibilidade do serviço</h2>
              <p className="body">
                O site pode ser alterado, suspenso ou descontinuado a qualquer
                momento, sem aviso prévio.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">11. Alterações dos Termos</h2>
              <p className="body">
                A GP Atacado pode atualizar estes Termos a qualquer momento.
              </p>
              <p className="body">
                A versão mais recente estará sempre disponível nesta página.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">12. Legislação aplicável</h2>
              <p className="body">
                Estes Termos são regidos pelas leis da República Federativa do
                Brasil.
              </p>
            </article>

            <article className="card terms-block">
              <h2 className="h2">13. Contato</h2>
              <p className="body">
                Para dúvidas ou solicitações relacionadas a estes Termos:
              </p>
              <p className="terms-email">
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
