import MessagePage from "../components/layout/MessagePage";
import Button from "../components/ui/Button";
import TextLink from "../components/ui/TextLink";
import usePageTitle from "../hooks/usePageTitle";

const RouteError = () => {
  usePageTitle("Erro ao abrir a página");

  return (
    <MessagePage
      title="Algo deu errado"
      message="Esta página não pôde ser aberta. Recarregue para tentar de novo."
    >
      <Button onClick={() => window.location.reload()}>
        Recarregar página
      </Button>
      <TextLink href="/">Voltar para o início</TextLink>
    </MessagePage>
  );
};

export default RouteError;
