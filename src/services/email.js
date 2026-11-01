// Importado só no envio, para o EmailJS não pesar na abertura do site.
export const sendMessageEmail = async ({ name, email, message }) => {
  const { default: emailjs } = await import("@emailjs/browser");

  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    { name, email, message },
    { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
  );
};
