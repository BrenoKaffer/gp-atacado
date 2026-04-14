export type CatalogGroup = {
  title: string
  desc: string
  micro: string
  categoryImage: string
  kind: string
  products: CatalogProduct[]
}

export type ProductCatalogItem = {
  id: number
  name: string
  category: string
  brand: string
  volume: string
  kind: string
  benefit: string
  image: string
}

export type CatalogProduct = {
  name: string
  image?: string
}

const inferVolume = (name: string) => {
  const match = name.match(/(\d+(?:[.,]\d+)?)\s?(ml|l|kg)/i)
  if (!match) return 'Não informado'
  const value = match[1].replace(',', '.')
  const unit = match[2].toLowerCase() === 'l' ? 'L' : match[2].toLowerCase()
  return `${value}${unit}`
}

const inferBrand = (name: string) => {
  const rules: Array<{ prefix: string; brand: string }> = [
    { prefix: 'Skol Beats', brand: 'Skol Beats' },
    { prefix: 'Ice 51', brand: 'Ice 51' },
    { prefix: 'Red Bull', brand: 'Red Bull' },
    { prefix: 'Água de Coco', brand: 'Ducoco' },
    { prefix: 'Açúcar Pérola', brand: 'Pérola' },
    { prefix: 'KitKat', brand: 'KitKat' },
    { prefix: 'Coca-Cola Zero', brand: 'Coca-Cola' },
    { prefix: 'Coca-Cola', brand: 'Coca-Cola' },
    { prefix: 'Guaraná Zero', brand: 'Guaraná' },
    { prefix: 'Guaraná', brand: 'Guaraná' },
    { prefix: 'São Francisco', brand: 'São Francisco' },
    { prefix: 'Chivas', brand: 'Chivas' },
    { prefix: 'Red Label', brand: 'Johnnie Walker' },
    { prefix: 'Old Parr', brand: 'Old Parr' },
    { prefix: 'Vodka Absolut', brand: 'Absolut' },
    { prefix: 'Brahma Duplo Malte', brand: 'Brahma' },
    { prefix: 'Brahma Chopp', brand: 'Brahma' },
    { prefix: 'Império', brand: 'Império' },
    { prefix: 'Água La Priori', brand: 'La Priori' },
  ]

  const matchedRule = rules.find((rule) => name.startsWith(rule.prefix))
  if (matchedRule) return matchedRule.brand
  return name.split(' ')[0]
}

const getBenefitByCategory = (category: string) => {
  const benefitMap: Record<string, string> = {
    'Long Neck': 'Alta saída para conveniência e bares.',
    'Cerveja em Lata': 'Categoria de giro rápido para volume.',
    'Destilados e Drinks Prontos': 'Eleva ticket médio em bares e eventos.',
    'Energéticos e Isotônicos': 'Excelente venda por impulso.',
    Refrigerantes: 'Base de giro para não perder venda.',
    Água: 'Reposição diária com demanda constante.',
  }
  return benefitMap[category] ?? 'Produto com boa saída no atacado.'
}

const getCategoryImage = (category: string) => {
  const imageMap: Record<string, string> = {
    'Long Neck':
      'https://img.dhost.cloud/T6gSY1G8wA6dIPCwiV47C7CMBFE=/970x545/smart/https://al1-media.s3.us-west-004.backblazeb2.com/images/a4f839c42220a168be836a280eaab16b.jpg',
    'Cerveja em Lata':
      'https://thumbs.dreamstime.com/b/chiangmai-tail%C3%A2ndia-de-julho-de-latas-da-cerveja-de-heineken-75990550.jpg',
    'Destilados e Drinks Prontos':
      'https://images.unsplash.com/photo-1656203549811-271798314d85?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Energéticos e Isotônicos':
      'https://images.unsplash.com/photo-1677177751361-0416255ff002?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Refrigerantes:
      'https://images.unsplash.com/photo-1665359045452-bfa257a2a6bf?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Água:
      'https://images.unsplash.com/photo-1536939459926-301728717817?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
  return imageMap[category] ?? '/logo_gp_atacado.png'
}

export const catalogGroups: CatalogGroup[] = [
  {
    title: 'Long Neck',
    desc: 'Rótulos premium para aumentar valor por pedido.',
    micro: 'Alto valor agregado no balcão',
    categoryImage: getCategoryImage('Long Neck'),
    kind: 'Long Neck',
    products: [
      { name: 'Budweiser', image: '/fotos_long_neck/budweiser.jpg' },
      { name: 'Heineken', image: '/fotos_long_neck/heineken.jpg' },
      { name: 'Corona', image: '/fotos_long_neck/corona.jpg' },
      { name: 'Coronita', image: '/fotos_long_neck/coronita.jpg' },
      { name: 'Stella Artois', image: '/fotos_long_neck/estela_artois.jpg' },
      { name: 'Spaten', image: '/fotos_long_neck/spaten.jpg' },
    ],
  },
  {
    title: 'Cerveja em Lata',
    desc: 'Base de volume para bares, mercados e conveniências.',
    micro: 'Giro rápido no atacado',
    categoryImage: getCategoryImage('Cerveja em Lata'),
    kind: 'Lata',
    products: [
      { name: 'Brahma Duplo Malte' },
      { name: 'Spaten' },
      { name: 'Devassa' },
      { name: 'Skol' },
      { name: 'Budweiser' },
      { name: 'Heineken' },
      { name: 'Antarctica' },
      { name: 'Brahma Chopp' },
      { name: 'Kaiser' },
      { name: 'Amstel' },
      { name: 'Original' },
      { name: 'Eisenbahn' },
      { name: 'Império Pilsen' },
      { name: 'Império Lager' },
      { name: 'Império Puro Malte' },
    ],
  },
  {
    title: 'Destilados e Drinks Prontos',
    desc: 'Portfólio para elevar margem em bares e eventos.',
    micro: 'Maior ticket por operação',
    categoryImage: getCategoryImage('Destilados e Drinks Prontos'),
    kind: 'Destilado/Drink',
    products: [
      { name: 'Xeque Mate' },
      { name: 'Skol Beats Senses' },
      { name: 'Skol Beats GT' },
      { name: 'Smirnoff 998ml' },
      { name: 'São Francisco 975ml' },
      { name: 'Campari 1L' },
      { name: 'Buchanans 1L' },
      { name: 'Chivas 12 anos 1L' },
      { name: 'Red Label 1L' },
      { name: 'White Horse 1L' },
      { name: 'Old Parr 12 anos 1L' },
      { name: 'Vodka Absolut 1L' },
    ],
  },
  {
    title: 'Energéticos e Isotônicos',
    desc: 'Itens de impulso para manter caixa girando o dia todo.',
    micro: 'Alta recorrência em conveniência',
    categoryImage: getCategoryImage('Energéticos e Isotônicos'),
    kind: 'Energético/Isotônico',
    products: [
      { name: 'Limoneto' },
      { name: 'Energético Baly' },
      { name: 'Ice 51 Sabores' },
      { name: 'Red Bull Tradicional' },
      { name: 'Água de Coco Ducoco' },
      { name: 'Gatorade' },
    ],
  },
  {
    title: 'Refrigerantes',
    desc: 'Categoria essencial para evitar ruptura de venda.',
    micro: 'Base de giro para todo tipo de operação',
    categoryImage: getCategoryImage('Refrigerantes'),
    kind: 'Refrigerante',
    products: [
      { name: 'Coca-Cola' },
      { name: 'Coca-Cola Zero' },
      { name: 'Guaraná' },
      { name: 'Guaraná Zero' },
      { name: 'Açúcar Pérola 5kg' },
      { name: 'KitKat Display' },
    ],
  },
  {
    title: 'Água',
    desc: 'Reposição diária com demanda previsível.',
    micro: 'Categoria de alta recorrência',
    categoryImage: getCategoryImage('Água'),
    kind: 'Água',
    products: [{ name: 'Água LaPriori' }, { name: 'Água La Priori com Gás' }],
  },
]

export const productsData: ProductCatalogItem[] = catalogGroups.flatMap(
  (group, categoryIndex) =>
    group.products.map((product, productIndex) => ({
      id: categoryIndex * 100 + productIndex + 1,
      name: product.name,
      category: group.title,
      brand: inferBrand(product.name),
      volume: inferVolume(product.name),
      kind: group.kind,
      benefit: getBenefitByCategory(group.title),
      image: product.image ?? getCategoryImage(group.title),
    })),
)
