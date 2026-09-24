// Os influenciadores da campanha.
//
// Cada um divulga o próprio link:  https://<dominio>/<slug>
// (também vale https://<dominio>/?influ=<slug>).
// O slug vai no JSON de todo lead em `influenciador` e `metadados.origem`.
//
// Slug que NÃO está nesta lista continua sendo registrado no lead
// (nada se perde); a lista só serve pra mostrar o nome na página.
// `nome` é exibido no selo "convite de …" no topo da página.

export type Influenciador = { slug: string; nome: string }

export const influenciadores: Influenciador[] = [
  // { slug: 'fulano', nome: '@fulano' },
]
