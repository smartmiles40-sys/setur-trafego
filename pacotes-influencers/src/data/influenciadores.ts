// Os influenciadores da campanha.
//
// Cada um divulga o próprio link:  https://stfev.setuforeuvouviagens.com.br/<slug>
// (também vale ?influ=<slug>). O slug vai no JSON de todo lead em
// `influenciador` e vira utm_source no Bitrix quando o link vem sem UTM.
//
// O link aceita variações do slug: maiúscula, acento, ponto, hífen ou "_"
// (/Camila-Trianda, /joãozinho) caem no slug daqui — ver `canonico` em lib/origem.ts.
// Slug que NÃO está nesta lista continua sendo registrado no lead (nada se
// perde), mas não mostra o selo "convite de …" — assim um link digitado errado
// não vira convite de alguém que não existe.

export type Influenciador = { slug: string; nome: string }

export const influenciadores: Influenciador[] = [
  { slug: 'camilatrianda', nome: 'Camila Trianda' },
  { slug: 'jessieshen', nome: 'Jessie Shen' },
  { slug: 'coutinhonc', nome: 'Coutinho Nc' },
  { slug: 'allanvaz', nome: 'Allan Vaz' },
  { slug: 'camilaviseu', nome: 'Camila Viseu' },
  { slug: 'rafaelbaricala', nome: 'Rafael Baricala' },
  { slug: 'joebrunno', nome: 'Joe Brunno' },
  { slug: 'joaozinho', nome: 'Joãozinho' },
]
