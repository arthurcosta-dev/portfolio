import { getSupabase } from "./supabase";

// A home lê os destaques com fetch simples: quem só visita não baixa o Supabase.
export const fetchFeaturedNames = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/featured_projects?select=repo_name&order=position`,
    { headers: { apikey: import.meta.env.VITE_SUPABASE_ANON_KEY } },
  );

  if (!response.ok) {
    throw new Error(`Supabase respondeu ${response.status}`);
  }

  const rows = await response.json();
  return rows.map((row) => row.repo_name);
};

// Grava primeiro e só depois apaga: uma falha no meio não deixa a home sem destaques.
export const saveFeaturedNames = async (names) => {
  const supabase = await getSupabase();

  if (names.length > 0) {
    const { error } = await supabase
      .from("featured_projects")
      .upsert(names.map((repo_name, position) => ({ repo_name, position })));
    if (error) {
      throw error;
    }
  }

  const removal = supabase.from("featured_projects").delete();
  const quoted = names.map((name) => `"${name}"`).join(",");
  const { error } = await (names.length > 0
    ? removal.not("repo_name", "in", `(${quoted})`)
    : removal.neq("repo_name", ""));

  if (error) {
    throw error;
  }
};
