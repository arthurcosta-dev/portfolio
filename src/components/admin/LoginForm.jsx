import useLoginForm from "../../hooks/useLoginForm";
import Button from "../ui/Button";
import Card from "../ui/Card";
import FormField from "../ui/FormField";
import Spinner from "../ui/Spinner";

const LoginForm = () => {
  const {
    values,
    errors,
    isSending,
    hasFailed,
    hasWrongCredentials,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useLoginForm();

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
      className="mt-8 w-full max-w-[440px] rounded-[22px] p-6 md:rounded-[24px] md:p-9"
    >
      <form
        aria-label="Entrar no painel"
        aria-busy={isSending}
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-[18px] md:gap-5"
      >
        <FormField
          id="login-email"
          label="E-mail"
          type="email"
          autoComplete="username"
          {...fieldProps("email")}
        />
        <FormField
          id="login-senha"
          label="Senha"
          type="password"
          autoComplete="current-password"
          {...fieldProps("password")}
        />
        <div className="mt-1.5 md:mt-2">
          <Button
            type="submit"
            disabled={isSending}
            aria-busy={isSending}
            className="h-14 w-full"
          >
            {isSending && <Spinner />}
            {isSending ? "Entrando…" : "Entrar"}
          </Button>
          <div aria-live="polite" className="text-sm">
            {hasFailed && (
              <p className="text-erro mt-4">
                {hasWrongCredentials
                  ? "E-mail ou senha incorretos."
                  : "Não foi possível entrar. Confira sua conexão e tente de novo."}
              </p>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
