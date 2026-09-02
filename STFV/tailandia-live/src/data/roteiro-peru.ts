/**
 * ROTEIRO E COPY DA SEÇÃO "ROTEIRO" — expedição PERU 2027.
 *
 * O par deste arquivo é `roteiro-japao.ts`. Quem escolhe qual dos dois a página
 * usa é `expedicao.ts`, pelo slug da live.
 *
 * Copiado do roteiro da LP de tráfego do Peru (`STFV/peru`), com UMA diferença:
 * o campo `data` ('22/08', '23/08'...) foi removido de cada dia, porque o
 * `components/Roteiro.tsx` desta LP não renderiza dia do mês — o carrossel
 * mostra "Dia 1, Dia 2...". A data da turma aparece uma vez só, no rodapé
 * (`expedicao.resumoExpedicao`, em live-peru.ts).
 *
 * ⚠️ Se o roteiro mudar na LP de tráfego, ele NÃO muda sozinho aqui: são dois
 * arquivos, em dois projetos. Conferir os dois quando a operação alterar o
 * itinerário.
 */

/** Cabeçalho da seção: "Conheça <destino> <complemento>" + o parágrafo. */
export const copyRoteiroPeru = {
  destino: 'o Peru',
  complemento: 'no ritmo certo.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". São 9 dias que começam pela aclimatação em Cusco, sobem a Machu Picchu ao amanhecer, atravessam a Montanha Colorida e terminam no oásis de Huacachina — respeitando altitude, ritmo, pausas e acompanhamento constante.',
}

export const roteiroPeru = [
  {
    dia: 1,
    cidade: 'Cusco, Peru',
    titulo: 'Chegada em Cusco',
    atividades: ['Chegada ao aeroporto de Cusco', 'Traslado ao hotel', 'Aclimatação à altitude', 'Tarde livre para descanso'],
    logistica: 'Transfer aeroporto → hotel incluso',
    imagem: `${import.meta.env.BASE_URL}assets/peru/dia-01-cusco.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '✈️', label: 'Chegada a Cusco' },
      { emoji: '🚐', label: 'Transfer → hotel' },
    ],
  },
  {
    dia: 2,
    cidade: 'Vale Sagrado dos Incas',
    titulo: 'Vale Sagrado & Chinchero',
    atividades: ['Tecelãs tradicionais de Chinchero', 'Terraços e mercado de Pisac', 'Fortaleza de Ollantaytambo', 'Trem Expedition a Águas Calientes'],
    logistica: 'Transfer privativo + guia + Trem Expedition · pernoite em Águas Calientes',
    imagem: `${import.meta.env.BASE_URL}assets/peru/dia-02-vale-sagrado.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚐', label: 'Transfer privativo' },
      { emoji: '🚆', label: 'Trem Expedition' },
    ],
  },
  {
    dia: 3,
    cidade: 'Machu Picchu',
    titulo: 'Machu Picchu',
    atividades: ['Subida a Machu Picchu ao amanhecer', 'Tour guiado pela cidadela inca', 'Tempo livre para fotos', 'Retorno a Cusco no Trem Expedition'],
    logistica: 'Ônibus de subida + guia especializado + Trem Expedition · retorno a Cusco',
    imagem: `${import.meta.env.BASE_URL}assets/peru/machu-picchu.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚆', label: 'Trem Expedition' },
      { emoji: '🚌', label: 'Ônibus a Machu Picchu' },
    ],
  },
  {
    dia: 4,
    cidade: 'Cusco',
    titulo: 'Dia Livre em Cusco',
    atividades: ['Manhã livre para descanso', 'Passeios opcionais pela cidade', 'Gastronomia e compras locais', 'Suporte do líder brasileiro'],
    logistica: 'Suporte do líder brasileiro o dia todo',
    imagem: `${import.meta.env.BASE_URL}assets/peru/cusco-livre.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Dia livre em Cusco' }],
  },
  {
    dia: 5,
    cidade: 'Montanha Colorida',
    titulo: 'Vinicunca — Montanha Colorida',
    atividades: ['Trekking à Montanha Colorida (Vinicunca)', 'Trecho de acesso em mototáxi', 'Paisagens únicas dos Andes', 'Retorno a Cusco'],
    logistica: 'Transfer + trecho de mototáxi + guia + alimentação',
    imagem: `${import.meta.env.BASE_URL}assets/peru/vinicunca.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛺', label: 'Trecho de mototáxi' }],
  },
  {
    dia: 6,
    cidade: 'Cusco → Lima',
    titulo: 'Cusco → Lima',
    atividades: ['Voo Cusco → Lima', 'Traslado ao hotel em Lima', 'Tarde livre na capital', 'Primeiro contato com Miraflores'],
    logistica: 'Voo doméstico + transfer + suporte do líder',
    imagem: `${import.meta.env.BASE_URL}assets/peru/lima-chegada.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '✈️', label: 'Voo Cusco → Lima' },
      { emoji: '🚐', label: 'Transfer → hotel' },
    ],
  },
  {
    dia: 7,
    cidade: 'Paracas & Huacachina',
    titulo: 'Ilhas Ballestas & Huacachina',
    atividades: ['Passeio de barco pelas Ilhas Ballestas', 'Oásis de Huacachina', 'Buggy nas dunas + sandboarding', 'Pernoite em Ica'],
    logistica: 'Transfer privativo + barco + guia · pernoite em Ica',
    imagem: `${import.meta.env.BASE_URL}assets/peru/huacachina.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚐', label: 'Transfer privativo' },
      { emoji: '🚤', label: 'Barco Ilhas Ballestas' },
    ],
  },
  {
    dia: 8,
    cidade: 'Ica → Lima',
    titulo: 'Retorno a Lima',
    atividades: ['Saída de Ica rumo a Lima', 'Traslado ao hotel', 'Tarde livre em Miraflores', 'Exploração opcional de Barranco e Centro Histórico'],
    logistica: 'Transfer Ica → Lima + suporte do líder',
    imagem: `${import.meta.env.BASE_URL}assets/peru/lima-chegada.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer Ica → Lima' }],
  },
  {
    dia: 9,
    cidade: 'Lima → Brasil',
    titulo: 'Retorno ao Brasil',
    atividades: ['Manhã livre em Lima', 'Traslado ao aeroporto', 'Voo internacional de volta', 'Despedida da equipe'],
    logistica: 'Transfers e voos de retorno inclusos',
    imagem: `${import.meta.env.BASE_URL}assets/peru/lima-chegada.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer → aeroporto' },
      { emoji: '✈️', label: 'Voo de retorno' },
    ],
  },
]
