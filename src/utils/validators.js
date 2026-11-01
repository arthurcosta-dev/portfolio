// Os limites acompanham os check de supabase/schema.sql.
const NAME_MIN = 2;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Conta como o char_length do banco: um emoji vale 1, não 2.
const countChars = (text) => [...text].length;

export const validateName = (value) => {
  const name = value.trim();

  if (!name) return "Digite seu nome.";
  if (countChars(name) < NAME_MIN) {
    return "O nome precisa de pelo menos 2 letras.";
  }
  if (countChars(name) > NAME_MAX) return "Use até 100 caracteres no nome.";
  return "";
};

export const validateEmail = (value) => {
  const email = value.trim();

  if (!email) return "Digite seu e-mail.";
  if (countChars(email) > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    return "Digite um e-mail válido, como nome@dominio.com.";
  }
  return "";
};

export const validateMessage = (value) => {
  const message = value.trim();

  if (!message) return "Escreva sua mensagem.";
  if (countChars(message) < MESSAGE_MIN) {
    return "Escreva pelo menos 20 caracteres.";
  }
  if (countChars(message) > MESSAGE_MAX) {
    return "Use até 2000 caracteres na mensagem.";
  }
  return "";
};

export const validatePassword = (value) => (value ? "" : "Digite sua senha.");

export const CONTACT_VALIDATORS = {
  name: validateName,
  email: validateEmail,
  message: validateMessage,
};

// Devolve só os campos com erro; objeto vazio significa formulário válido.
export const validateContact = (values) =>
  Object.fromEntries(
    Object.entries(CONTACT_VALIDATORS)
      .map(([field, validate]) => [field, validate(values[field])])
      .filter(([, error]) => error),
  );
