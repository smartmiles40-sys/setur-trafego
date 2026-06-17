// ============================================================================
//  BANCO DE DADOS DAS EXPEDIÇÕES
//  (reaproveitado da "Setur Central LP" — fonte única da verdade)
//
//  COMO EDITAR (Bruno):
//  - Para adicionar/trocar uma expedição, copie um bloco { ... } abaixo e
//    altere os campos. Cada bloco é um card que aparece na seção "Expedições".
//  - `status`: 'ativa' (vagas abertas) | 'esgotada' (histórico) | 'em-breve'
//  - `imagem`: cole a URL completa da foto (já hospedada no site) OU troque
//    por um arquivo local em /assets/... (veja IMAGENS-NECESSARIAS.md)
//  - `link`: o endereço da Landing Page daquele destino. Use '#' se ainda
//    não existir.
// ============================================================================

export type StatusExpedicao = 'ativa' | 'esgotada' | 'em-breve';

export type HoraDoDia = 'amanhecer' | 'manha' | 'meio-dia' | 'por-do-sol' | 'noite' | 'aurora';

export interface Expedicao {
  id: string;
  destino: string;
  ano: number;
  periodo: string;
  dias: number;
  resumo: string;
  imagem: string;
  link: string;
  status: StatusExpedicao;
  hora: HoraDoDia;
}

export const expedicoes: Expedicao[] = [
  {
    id: 'egito-2026',
    destino: 'Egito',
    ano: 2026,
    periodo: '05/10 a 18/10',
    dias: 14,
    resumo: 'Pirâmides, templos milenares e um cruzeiro pelo Rio Nilo.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/egypt-Bc8e9fZK.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'meio-dia',
  },
  {
    id: 'japao-china-2026-b',
    destino: 'Japão & China',
    ano: 2026,
    periodo: '26/10 a 12/11',
    dias: 18,
    resumo: 'Do Monte Fuji às muralhas da China — uma jornada entre dois mundos.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/japan-C2RpIZN9.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'por-do-sol',
  },
  {
    id: 'peru-2026-b',
    destino: 'Peru',
    ano: 2026,
    periodo: '22/08 a 30/08',
    dias: 9,
    resumo: 'Machu Picchu, cultura inca e gastronomia premiada.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/peru-DZk1N_sD.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'manha',
  },
  {
    id: 'islandia-2027',
    destino: 'Islândia',
    ano: 2027,
    periodo: '13 a 23/02',
    dias: 11,
    resumo: 'Aurora boreal, glaciares e paisagens de outro mundo.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/iceland-Dc4A9ybH.jpg',
    link: '/islandia',
    status: 'ativa',
    hora: 'aurora',
  },
  {
    id: 'japao-china-2027-mar',
    destino: 'Japão & China',
    ano: 2027,
    periodo: '27/03 a 13/04',
    dias: 18,
    resumo: 'Tradição milenar e modernidade extrema em uma jornada única.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/japan-C2RpIZN9.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'por-do-sol',
  },
  {
    id: 'peru-2027',
    destino: 'Peru',
    ano: 2027,
    periodo: '22 a 30/08',
    dias: 9,
    resumo: 'Machu Picchu, cultura inca e gastronomia premiada.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/peru-DZk1N_sD.jpg',
    link: '/peru',
    status: 'ativa',
    hora: 'manha',
  },
  {
    id: 'amazonia-2027',
    destino: 'Amazônia',
    ano: 2027,
    periodo: '07 a 11/07',
    dias: 5,
    resumo: 'A maior floresta tropical do mundo em uma expedição única.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/amazon-3Ga2FEMi.jpg',
    link: '/amazonia',
    status: 'ativa',
    hora: 'amanhecer',
  },
  {
    id: 'egito-2027',
    destino: 'Egito',
    ano: 2027,
    periodo: '16 a 29/09',
    dias: 14,
    resumo: 'Pirâmides, templos milenares e um cruzeiro pelo Rio Nilo.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/egypt-Bc8e9fZK.jpg',
    link: '/egito',
    status: 'ativa',
    hora: 'meio-dia',
  },
  {
    id: 'japao-china-2027-out',
    destino: 'Japão & China',
    ano: 2027,
    periodo: '14 a 31/10',
    dias: 18,
    resumo: 'Outono japonês com folhas vermelhas e a imensidão cultural da China.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/japan-C2RpIZN9.jpg',
    link: '/japao-china',
    status: 'ativa',
    hora: 'por-do-sol',
  },
  {
    id: 'tailandia-2027',
    destino: 'Tailândia',
    ano: 2027,
    periodo: '06 a 21/11',
    dias: 16,
    resumo: 'Templos dourados, praias paradisíacas e a cultura tailandesa.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/thailand-D2WHjF8d.jpg',
    link: '/tailandia',
    status: 'ativa',
    hora: 'por-do-sol',
  },
  {
    id: 'turquia-grecia-2027-jun',
    destino: 'Turquia & Grécia',
    ano: 2027,
    periodo: '12 a 24/06',
    dias: 13,
    resumo: 'Capadócia, Santorini e o melhor de dois mundos.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/turkey-greece-CRQORUZB.jpg',
    link: '/turquia-grecia',
    status: 'ativa',
    hora: 'meio-dia',
  },

  // ESGOTADAS (histórico como prova social)
  {
    id: 'islandia-2026',
    destino: 'Islândia',
    ano: 2026,
    periodo: '12/02 a 21/02',
    dias: 10,
    resumo: 'Aurora boreal, glaciares e paisagens de outro mundo.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/iceland-Dc4A9ybH.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'aurora',
  },
  {
    id: 'japao-china-2026-a',
    destino: 'Japão & China',
    ano: 2026,
    periodo: '28/03 a 14/04',
    dias: 18,
    resumo: 'Cerejeiras em flor, templos milenares e a modernidade de Tóquio.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/japan-C2RpIZN9.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'por-do-sol',
  },
  {
    id: 'egito-2026-a',
    destino: 'Egito',
    ano: 2026,
    periodo: '19/09 a 02/10',
    dias: 14,
    resumo: 'Pirâmides, templos milenares e um cruzeiro pelo Rio Nilo.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/egypt-Bc8e9fZK.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'meio-dia',
  },
  {
    id: 'tailandia-2026',
    destino: 'Tailândia',
    ano: 2026,
    periodo: '13/11 a 28/11',
    dias: 16,
    resumo: 'Templos dourados, praias paradisíacas e a cultura tailandesa.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/thailand-D2WHjF8d.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'por-do-sol',
  },
  {
    id: 'peru-2026-a',
    destino: 'Peru',
    ano: 2026,
    periodo: '30/05 a 07/06',
    dias: 9,
    resumo: 'Machu Picchu, cultura inca e gastronomia premiada.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/peru-DZk1N_sD.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'manha',
  },
  {
    id: 'turquia-grecia-2027-a',
    destino: 'Turquia & Grécia',
    ano: 2027,
    periodo: '29/05 a 12/06',
    dias: 14,
    resumo: 'Capadócia, Santorini e o melhor de dois mundos.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/turkey-greece-CRQORUZB.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'meio-dia',
  },
  {
    id: 'turquia-grecia-2027-b',
    destino: 'Turquia & Grécia',
    ano: 2027,
    periodo: '05/06 a 17/06',
    dias: 14,
    resumo: 'Capadócia, Santorini e o melhor de dois mundos.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/turkey-greece-CRQORUZB.jpg',
    link: '#',
    status: 'esgotada',
    hora: 'meio-dia',
  },

  {
    id: 'italia-amalfi-2027',
    destino: 'Itália – Costa Amalfitana',
    ano: 2027,
    periodo: '04 a 14/09',
    dias: 11,
    resumo: 'Vilarejos coloridos, gastronomia e o Mediterrâneo italiano.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/italy-amalfi-Djd5udwJ.jpg',
    link: '/italia',
    status: 'ativa',
    hora: 'por-do-sol',
  },

  // EM BREVE (FOMO estruturado)
  {
    id: 'japao-china-2027-abr',
    destino: 'Japão & China',
    ano: 2027,
    periodo: 'Abril',
    dias: 18,
    resumo: 'Nova turma em breve — tradição milenar e modernidade extrema em uma jornada única.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/japan-C2RpIZN9.jpg',
    link: '#avisar',
    status: 'em-breve',
    hora: 'por-do-sol',
  },
  {
    id: 'china-2027',
    destino: 'China',
    ano: 2027,
    periodo: '08 a 24/05',
    dias: 17,
    resumo: 'A Grande Muralha, cidades milenares e a cultura chinesa.',
    imagem: 'https://lp.setuforeuvouviagens.com.br/assets/china-CYYMI2Ex.jpg',
    link: '#avisar',
    status: 'em-breve',
    hora: 'manha',
  },
];

export const totalPorStatus = {
  ativa: expedicoes.filter((e) => e.status === 'ativa').length,
  esgotada: expedicoes.filter((e) => e.status === 'esgotada').length,
  'em-breve': expedicoes.filter((e) => e.status === 'em-breve').length,
};
