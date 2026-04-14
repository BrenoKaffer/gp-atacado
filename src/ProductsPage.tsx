import { useEffect, useMemo, useState } from 'react'
import './ProductsPage.css'
import { productsData } from './catalogData'

const CART_STORAGE_KEY = 'gp_products_page_cart_v1'
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

const sanitizeStreetNumber = (value: string) =>
  value.replace(/[^0-9A-Za-z-]/g, '').slice(0, 12)

const formatCep = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

type Props = {
  currentYear: number
  whatsappCtaHref: string
}

export default function ProductsPage({ currentYear, whatsappCtaHref }: Props) {
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    category: [],
    brand: [],
    volume: [],
    kind: [],
  })
  const [cart, setCart] = useState<Record<number, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}')
    } catch {
      return {}
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    companyName: '',
    businessTypes: [] as string[],
    email: '',
    cnpj: '',
    whatsapp: '',
    marketingOptIn: false,
  })
  const [cartFormStep, setCartFormStep] = useState<1 | 2>(1)
  const [cartFormErrors, setCartFormErrors] = useState<Record<string, string>>(
    {},
  )
  const [cep, setCep] = useState('')
  const [streetNumber, setStreetNumber] = useState('')
  const [resolvedAddress, setResolvedAddress] = useState('')
  const [cepStatus, setCepStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const categories = useMemo(
    () => [...new Set(productsData.map((p) => p.category))],
    [],
  )
  const brands = useMemo(() => [...new Set(productsData.map((p) => p.brand))], [])
  const volumes = useMemo(
    () => [...new Set(productsData.map((p) => p.volume))],
    [],
  )
  const kinds = useMemo(() => [...new Set(productsData.map((p) => p.kind))], [])

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()
    return productsData.filter((p) => {
      const searchOk =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      const categoryOk =
        activeFilters.category.length === 0 ||
        activeFilters.category.includes(p.category)
      const brandOk =
        activeFilters.brand.length === 0 || activeFilters.brand.includes(p.brand)
      const volumeOk =
        activeFilters.volume.length === 0 ||
        activeFilters.volume.includes(p.volume)
      const kindOk =
        activeFilters.kind.length === 0 || activeFilters.kind.includes(p.kind)
      return searchOk && categoryOk && brandOk && volumeOk && kindOk
    })
  }, [activeFilters, search])

  const selectedItems = useMemo(() => {
    return productsData
      .map((p) => ({ ...p, qty: cart[p.id] ?? 0 }))
      .filter((p) => p.qty > 0)
  }, [cart])

  const totalItems = selectedItems.length
  const totalUnits = selectedItems.reduce((sum, item) => sum + item.qty, 0)
  const businessTypeOptions = ['Bar', 'Restaurante', 'Empório', 'Evento', 'Outro']

  const deliveryAddress = useMemo(() => {
    if (!resolvedAddress) return ''
    const numberPart = streetNumber.trim().length > 0 ? `, nº ${streetNumber.trim()}` : ''
    return `${resolvedAddress}${numberPart}`
  }, [resolvedAddress, streetNumber])
  const canCheckout =
    totalItems > 0 &&
    deliveryAddress.trim().length > 0 &&
    leadForm.fullName.trim().length > 1 &&
    leadForm.whatsapp.replace(/\D/g, '').length >= 10

  const validateCartStep = (step: 1 | 2) => {
    const nextErrors: Record<string, string> = {}
    if (step === 1) {
      if (leadForm.fullName.trim().length < 2) {
        nextErrors.fullName = 'Informe seu nome completo.'
      }
      return nextErrors
    }
    if (deliveryAddress.trim().length < 5) {
      nextErrors.address = 'Informe CEP e número para entrega.'
    }
    if (leadForm.whatsapp.replace(/\D/g, '').length < 10) {
      nextErrors.whatsapp = 'Informe um WhatsApp válido.'
    }
    return nextErrors
  }

  const buildWhatsappQuoteHref = (address?: string) => {
    if (selectedItems.length === 0) return whatsappCtaHref
    const lines = selectedItems
      .map((item) => `- ${item.qty}x ${item.name} ${item.volume}`)
      .join('\n')
    const addressLine =
      address && address.trim().length > 0
        ? `\n\nEntrega em: ${address.trim()}`
        : ''
    const customerInfo = [
      `Nome: ${leadForm.fullName.trim() || 'Não informado'}`,
      `Empresa: ${leadForm.companyName.trim() || 'Não informado'}`,
      `Segmento: ${leadForm.businessTypes.length > 0 ? leadForm.businessTypes.join(', ') : 'Não informado'}`,
      `E-mail: ${leadForm.email.trim() || 'Não informado'}`,
      `CNPJ: ${leadForm.cnpj.trim() || 'Não informado'}`,
      `WhatsApp: ${leadForm.whatsapp.trim() || 'Não informado'}`,
      `Receber promoções: ${leadForm.marketingOptIn ? 'Sim' : 'Não'}`,
    ].join('\n')
    const message = `Olá, gostaria de cotar:\n${lines}${addressLine}\n\nDados para contato:\n${customerInfo}`
    const base = whatsappCtaHref.split('?')[0]
    return `${base}?text=${encodeURIComponent(message)}`
  }

  const whatsappQuoteHref = useMemo(() => buildWhatsappQuoteHref(deliveryAddress), [deliveryAddress, selectedItems, whatsappCtaHref])

  const persistCart = (next: Record<number, number>) => {
    setCart(next)
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next))
  }

  const updateQty = (id: number, nextQty: number) => {
    const qty = Math.max(0, Math.floor(Number(nextQty) || 0))
    const next = { ...cart }
    if (qty === 0) delete next[id]
    else next[id] = qty
    persistCart(next)
  }

  const toggleFilter = (group: 'category' | 'brand' | 'volume' | 'kind', value: string) => {
    setActiveFilters((prev) => {
      const list = prev[group]
      const has = list.includes(value)
      const nextList = has ? list.filter((v) => v !== value) : [...list, value]
      return { ...prev, [group]: nextList }
    })
  }

  const toggleBusinessType = (type: string) => {
    setLeadForm((prev) => {
      const has = prev.businessTypes.includes(type)
      const nextTypes = has
        ? prev.businessTypes.filter((t) => t !== type)
        : [...prev.businessTypes, type]
      return { ...prev, businessTypes: nextTypes }
    })
  }

  useEffect(() => {
    if (totalItems > 0) setIsCartOpen(true)
  }, [totalItems])

  useEffect(() => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length < 8) {
      setResolvedAddress('')
      setCepStatus('idle')
      return
    }

    let active = true
    const timeout = window.setTimeout(async () => {
      setCepStatus('loading')
      try {
        const endpoints = [
          `https://www.gov.br/conecta/catalogo/apis/cep-codigo-de-enderecamento-postal/consulta/cep/${digits}`,
          `https://viacep.com.br/ws/${digits}/json/`,
        ]

        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint)
            if (!response.ok) continue
            const data = await response.json()
            const street =
              data?.logradouro ??
              data?.street ??
              data?.address ??
              data?.endereco ??
              ''
            const district =
              data?.bairro ??
              data?.district ??
              data?.neighborhood ??
              ''
            const city =
              data?.localidade ??
              data?.cidade ??
              data?.city ??
              ''
            const state = data?.uf ?? data?.estado ?? data?.state ?? ''

            const full = [street, district, city && state ? `${city} - ${state}` : city || state]
              .filter(Boolean)
              .join(', ')

            if (full) {
              if (!active) return
              setResolvedAddress(full)
              setCepStatus('success')
              return
            }
          } catch {
            // Try next endpoint
          }
        }

        if (!active) return
        setResolvedAddress('')
        setCepStatus('error')
      } catch {
        if (!active) return
        setResolvedAddress('')
        setCepStatus('error')
      }
    }, 350)

    return () => {
      active = false
      window.clearTimeout(timeout)
    }
  }, [cep])

  return (
    <div className="products-page">
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
            <img src="/logo_gp_atacado.png" alt="Logo GP Distribuidora de Bebidas" className="brand-logo" />
          </a>
          <div className="nav-links" role="navigation">
            <a className="nav-link" href="/">Início</a>
            <a className="nav-link" href="/#about">Sobre</a>
            <a className="nav-link" href="/#products">Produtos</a>
            <a className="nav-link" href="/#contact">Contato</a>
          </div>
          <div className="nav-cta">
            <a className="btn btn--primary btn--sm" href={whatsappCtaHref} target="_blank" rel="noreferrer">
              Pedir pelo WhatsApp
            </a>
          </div>
        </nav>
      </header>

      <main className="products-shell">
        <section className="products-header">
          <h1>Catálogo completo</h1>
          <p>Filtre e monte seu pedido rapidamente</p>
          <input
            className="products-search"
            placeholder="Buscar por nome, marca ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        <section className="products-layout">
          <aside className="products-sidebar">
            <img
              src="/logo_gp_atacado.png"
              alt="Logo GP Atacado"
              className="products-sidebar-logo"
            />
            <h2>Filtros</h2>
            <FilterGroup title="Categoria" values={categories} selected={activeFilters.category} onToggle={(value) => toggleFilter('category', value)} />
            <FilterGroup title="Marca" values={brands} selected={activeFilters.brand} onToggle={(value) => toggleFilter('brand', value)} />
            <FilterGroup title="Volume" values={volumes} selected={activeFilters.volume} onToggle={(value) => toggleFilter('volume', value)} />
            <FilterGroup title="Tipo" values={kinds} selected={activeFilters.kind} onToggle={(value) => toggleFilter('kind', value)} />
          </aside>

          <section>
            <div className="products-main-head">
              <h2>Produtos disponíveis</h2>
              <span className="products-count">{filteredProducts.length} resultados</span>
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-state">Nenhum produto encontrado</div>
            )}

            <div className="products-grid">
              {filteredProducts.map((product) => {
                const qty = cart[product.id] ?? 0
                return (
                  <article key={product.id} className="product-item">
                    <div className="product-top">
                      <div>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-meta">{product.brand} • {product.volume} • {product.kind}</p>
                      </div>
                    </div>
                    <p className="product-benefit">{product.benefit}</p>
                    <img
                      src={product.image}
                      alt={`Produto ${product.name}`}
                      className="product-mid-image"
                      loading="lazy"
                    />
                    <div className="qty-row">
                      <button className="qty-btn" type="button" onClick={() => updateQty(product.id, qty - 1)}>-</button>
                      <input className="qty-input" type="number" min={0} value={qty} onChange={(e) => updateQty(product.id, Number(e.target.value))} />
                      <button className="qty-btn" type="button" onClick={() => updateQty(product.id, qty + 1)}>+</button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </section>
      </main>

      <button
        type="button"
        className={`cart-tab-toggle ${isCartOpen ? 'is-open' : ''}`}
        onClick={() => setIsCartOpen((prev) => !prev)}
        aria-expanded={isCartOpen}
        aria-controls="quote-drawer"
      >
        <span>{isCartOpen ? 'Fechar carrinho' : 'Ver carrinho'}</span>
        <strong>{totalItems} itens</strong>
      </button>

      {isCartOpen && (
        <div id="quote-drawer" className="quote-drawer" role="dialog" aria-label="Resumo do pedido">
          <div className="quote-drawer-head">
            <strong>Carrinho</strong>
            <span>{totalItems} itens</span>
          </div>
          <ul className="quote-drawer-list">
            {selectedItems.length === 0 && (
              <li className="quote-drawer-list--empty">Seu carrinho está vazio.</li>
            )}
            {selectedItems.map((item) => (
              <li key={item.id}>
                <div className="quote-item-info">
                  <span className="quote-item-name">{item.name}</span>
                  <small>{item.volume}</small>
                </div>
                <div className="quote-item-actions">
                  <strong>{item.qty}x</strong>
                  <button
                    type="button"
                    className="quote-remove"
                    onClick={() => updateQty(item.id, 0)}
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-form">
            <div className="cart-step-head">
              <strong>
                {cartFormStep === 1 ? 'Passo 1 de 2' : 'Passo 2 de 2'}
              </strong>
              <span>
                {cartFormStep === 1
                  ? 'Identificação rápida'
                  : 'Contato e entrega'}
              </span>
            </div>
            {cartFormStep === 1 ? (
              <>
                <input
                  className="address-input"
                  type="text"
                  value={leadForm.fullName}
                  onChange={(e) => {
                    setLeadForm((prev) => ({
                      ...prev,
                      fullName: sanitizeName(e.target.value),
                    }))
                    setCartFormErrors((prev) => {
                      const next = { ...prev }
                      delete next.fullName
                      return next
                    })
                  }}
                  placeholder="Nome Completo"
                />
                {cartFormErrors.fullName && (
                  <span className="cart-field-error">{cartFormErrors.fullName}</span>
                )}
                <input
                  className="address-input"
                  type="text"
                  value={leadForm.companyName}
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      companyName: sanitizeCompany(e.target.value),
                    }))
                  }
                  placeholder="Nome da empresa"
                />
                <div className="business-type-grid">
                  {businessTypeOptions.map((type) => (
                    <label key={type} className="business-type-option">
                      <input
                        type="checkbox"
                        checked={leadForm.businessTypes.includes(type)}
                        onChange={() => toggleBusinessType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    const nextErrors = validateCartStep(1)
                    setCartFormErrors(nextErrors)
                    if (Object.keys(nextErrors).length === 0) setCartFormStep(2)
                  }}
                >
                  Continuar
                </button>
              </>
            ) : (
              <>
                <label className="cart-address-field">
                  <span>Endereço de entrega</span>
                  <input
                    className="address-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={9}
                    value={cep}
                    onChange={(e) => {
                      setCep(formatCep(e.target.value))
                      setCartFormErrors((prev) => {
                        const next = { ...prev }
                        delete next.address
                        return next
                      })
                    }}
                    placeholder="CEP (somente números)"
                  />
                  <input
                    className="address-input"
                    type="text"
                    inputMode="numeric"
                    value={streetNumber}
                    onChange={(e) => {
                      setStreetNumber(sanitizeStreetNumber(e.target.value))
                      setCartFormErrors((prev) => {
                        const next = { ...prev }
                        delete next.address
                        return next
                      })
                    }}
                    placeholder="Número"
                  />
                  {cepStatus !== 'idle' && (
                    <div className={`resolved-address resolved-address--${cepStatus}`}>
                      {cepStatus === 'loading' && 'Buscando CEP...'}
                      {cepStatus === 'success' && resolvedAddress}
                      {cepStatus === 'error' &&
                        'Informe um CEP válido para autocompletar o endereço.'}
                    </div>
                  )}
                </label>
                <input
                  className="address-input"
                  type="email"
                  value={leadForm.email}
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      email: sanitizeEmail(e.target.value),
                    }))
                  }
                  placeholder="E-mail"
                />
                <div className="cart-form-row">
                  <input
                    className="address-input"
                    type="text"
                    value={leadForm.cnpj}
                    onChange={(e) =>
                      setLeadForm((prev) => ({
                        ...prev,
                        cnpj: formatCnpj(e.target.value),
                      }))
                    }
                    placeholder="CNPJ"
                  />
                  <input
                    className="address-input"
                    type="text"
                    value={leadForm.whatsapp}
                    onChange={(e) => {
                      setLeadForm((prev) => ({
                        ...prev,
                        whatsapp: formatPhone(e.target.value),
                      }))
                      setCartFormErrors((prev) => {
                        const next = { ...prev }
                        delete next.whatsapp
                        return next
                      })
                    }}
                    placeholder="WhatsApp"
                  />
                </div>
                {cartFormErrors.whatsapp && (
                  <span className="cart-field-error">{cartFormErrors.whatsapp}</span>
                )}
                {cartFormErrors.address && (
                  <span className="cart-field-error">{cartFormErrors.address}</span>
                )}
                <label className="business-type-option">
                  <input
                    type="checkbox"
                    checked={leadForm.marketingOptIn}
                    onChange={(e) =>
                      setLeadForm((prev) => ({
                        ...prev,
                        marketingOptIn: e.target.checked,
                      }))
                    }
                  />
                  <span>
                    Desejo receber promoções, combos e/ou novidades por WhatsApp
                  </span>
                </label>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => setCartFormStep(1)}
                >
                  Voltar
                </button>
              </>
            )}
          </div>

          <div className="cart-cta-wrap">
            <a
              className={`btn btn--primary ${canCheckout ? '' : 'is-disabled'}`}
              href={canCheckout && cartFormStep === 2 ? whatsappQuoteHref : '#'}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!canCheckout || cartFormStep !== 2}
              onClick={(e) => {
                const nextErrors = validateCartStep(2)
                if (Object.keys(nextErrors).length > 0 || cartFormStep !== 2) {
                  e.preventDefault()
                  setCartFormErrors(nextErrors)
                }
              }}
            >
              Finalizar pedido no WhatsApp
            </a>
            <span className="cart-secondary-link">{totalUnits} unidades selecionadas</span>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <div className="brand brand--footer">
              <img src="/logo_gp_atacado.png" alt="Logo GP Distribuidora de Bebidas" className="brand-logo brand-logo--footer" loading="lazy" decoding="async" />
            </div>
            <div className="footer-note">Cotação em minutos e atendimento rápido via WhatsApp.</div>
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
              <a className="social-link" href="https://www.instagram.com/atacado.gp/" target="_blank" rel="noreferrer" aria-label="Instagram da GP Distribuidora">
                <IconInstagram />
                <span>Instagram</span>
              </a>
              <a className="social-link" href="https://www.facebook.com/atacado.gp" target="_blank" rel="noreferrer" aria-label="Facebook da GP Distribuidora">
                <IconFacebook />
                <span>Facebook</span>
              </a>
            </div>
          </div>
          <div className="footer-right footer-nav-columns">
            <div className="footer-col">
              <div className="footer-title">Links Rápidos</div>
              <a className="footer-link" href="/sobre-operacao">Sobre a operação</a>
              <a className="footer-link" href="/servicos">Serviços</a>
              <a className="footer-link" href="/produtos">Produtos</a>
              <a className="footer-link" href="/contato.html">Contato</a>
            </div>
            <div className="footer-col">
              <div className="footer-title">Links Úteis</div>
              <a className="footer-link" href="/politica-de-privacidade">Política de Privacidade</a>
              <a className="footer-link" href="/termos-e-condicoes">Termos & Condições</a>
            </div>
          </div>
        </div>
        <div className="container footer-copy">
          Todos os direitos estão reservados à GP Distribuidora de Bebidas | Copyright © {currentYear}
        </div>
      </footer>
    </div>
  )
}

function FilterGroup({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string
  values: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="filter-block">
      <h3>{title}</h3>
      <div className="filter-list">
        {values.map((value) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
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
