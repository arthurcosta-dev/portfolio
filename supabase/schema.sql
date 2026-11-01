-- Rode uma única vez no SQL Editor do Supabase.

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 254),
  message text not null check (char_length(message) between 20 and 2000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.featured_projects (
  repo_name text primary key check (char_length(repo_name) between 1 and 100),
  position int not null default 0
);

alter table public.messages enable row level security;
alter table public.featured_projects enable row level security;

-- Permissões por tabela: o que cada papel pode tentar fazer.
-- As policies abaixo decidem, linha a linha, o que ele consegue de fato.
revoke all on public.messages, public.featured_projects from anon, authenticated;
grant insert (name, email, message) on public.messages to anon, authenticated;
grant select on public.messages to authenticated;
grant update (answered) on public.messages to authenticated;
grant select on public.featured_projects to anon, authenticated;
grant insert, update, delete on public.featured_projects to authenticated;

-- visitantes (anon) só podem inserir mensagens, nunca ler
create policy "anon insere mensagens" on public.messages
  for insert to anon, authenticated with check (answered = false);

-- só o dono logado lê e atualiza mensagens
create policy "dono le mensagens" on public.messages
  for select to authenticated using (true);
create policy "dono atualiza mensagens" on public.messages
  for update to authenticated using (true) with check (true);

-- destaques: todos leem, só o dono escreve
create policy "todos leem destaques" on public.featured_projects
  for select to anon, authenticated using (true);
create policy "dono escreve destaques" on public.featured_projects
  for all to authenticated using (true) with check (true);
