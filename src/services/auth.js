import { getSupabase } from "./supabase";

export const signIn = async ({ email, password }) => {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }
};

export const signOut = async () => {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

// O Supabase avisa logo ao assinar, com a sessão atual ou null. Devolve como cancelar.
export const onAuthChange = async (callback) => {
  const supabase = await getSupabase();
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    callback(session),
  );

  return () => data.subscription.unsubscribe();
};

export const isInvalidCredentials = (error) =>
  error?.code === "invalid_credentials";
