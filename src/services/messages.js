import { sendMessageEmail } from "./email";
import { getSupabase } from "./supabase";

// Sem .select(): o visitante pode inserir, mas não pode ler a linha de volta.
const insertMessage = async (message) => {
  const supabase = await getSupabase();
  const { error } = await supabase.from("messages").insert(message);

  if (error) {
    throw error;
  }
};

export const fetchMessages = async () => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .select("id, name, email, message, answered, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const setMessageAnswered = async ({ id, answered }) => {
  const supabase = await getSupabase();
  const { error } = await supabase
    .from("messages")
    .update({ answered })
    .eq("id", id);

  if (error) {
    throw error;
  }
};

// A mensagem salva já aparece no dashboard; o e-mail é só um aviso a mais.
export const sendContactMessage = async ({ name, email, message }) => {
  const contact = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  await insertMessage(contact);

  try {
    await sendMessageEmail(contact);
  } catch (error) {
    console.warn("Mensagem salva, mas o e-mail de aviso falhou.", error);
  }
};
