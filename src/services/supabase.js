let clientPromise;

// Importado só quando usado, para o Supabase não pesar na abertura do site.
export const getSupabase = () => {
  clientPromise ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
    ),
  );

  return clientPromise;
};
