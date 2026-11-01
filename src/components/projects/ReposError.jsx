import ErrorState from "../ui/ErrorState";

const ReposError = ({ error, onRetry }) => (
  <ErrorState
    title={
      error?.isRateLimit
        ? "O GitHub pediu uma pausa"
        : "Os projetos não carregaram"
    }
    message={
      error?.isRateLimit
        ? "O limite de consultas à API do GitHub foi atingido nesta rede. Ele costuma voltar em até uma hora."
        : "Não foi possível falar com a API do GitHub. Confira sua conexão e tente de novo."
    }
    onRetry={onRetry}
  />
);

export default ReposError;
