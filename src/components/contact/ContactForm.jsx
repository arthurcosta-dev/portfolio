import { SITE } from "../../config/site";
import useContactForm from "../../hooks/useContactForm";
import Button from "../ui/Button";
import Card from "../ui/Card";
import FormField from "../ui/FormField";
import Spinner from "../ui/Spinner";

const ContactForm = () => {
  const {
    values,
    errors,
    isSending,
    wasSent,
    hasFailed,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  const fieldProps = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    disabled: isSending,
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return (
    <Card
      variant="field"
      className="relative z-10 mx-auto mt-8 max-w-[560px] rounded-[22px] p-6 md:mt-10 md:rounded-[24px] md:p-9"
    >
      <form
        aria-label="Formulário de contato"
        aria-busy={isSending}
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-[18px] md:gap-5"
      >
        <FormField
          id="nome"
          label="Nome"
          type="text"
          placeholder="Seu nome"
          autoComplete="name"
          {...fieldProps("name")}
        />
        <FormField
          id="email"
          label="E-mail"
          type="email"
          placeholder="nome@dominio.com"
          autoComplete="email"
          {...fieldProps("email")}
        />
        <FormField
          id="mensagem"
          label="Mensagem"
          multiline
          placeholder="Como posso ajudar?"
          {...fieldProps("message")}
        />
        {/* Campo isca: pessoas não o veem; robôs costumam preencher. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={values.website}
          onChange={handleChange}
          className="sr-only"
        />
        <div className="mt-1.5 md:mt-2">
          <Button
            type="submit"
            disabled={isSending}
            aria-busy={isSending}
            className="h-14 w-full"
          >
            {isSending && <Spinner />}
            {isSending ? "Enviando…" : "Enviar mensagem"}
          </Button>
          {/* Sempre montada: o leitor de tela só anuncia mudança em região que já existe. */}
          <div aria-live="polite" className="text-sm">
            {wasSent && (
              <p className="text-texto-2 mt-4">{SITE.contact.sent}</p>
            )}
            {hasFailed && (
              <p className="text-erro mt-4">{SITE.contact.failed}</p>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
