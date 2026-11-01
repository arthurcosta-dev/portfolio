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
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return (
    <Card className="rounded-card-md relative z-10 mx-auto mt-10 max-w-[560px] p-6 md:p-9">
      <form
        aria-label="Formulário de contato"
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
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
        <Button type="submit" disabled={isSending} className="mt-2 h-14">
          {isSending && <Spinner />}
          {isSending ? "Enviando..." : "Enviar mensagem"}
        </Button>
        <div aria-live="polite" className="text-sm empty:hidden">
          {wasSent && <p className="text-texto-2">{SITE.contact.sent}</p>}
          {hasFailed && <p className="text-erro">{SITE.contact.failed}</p>}
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
