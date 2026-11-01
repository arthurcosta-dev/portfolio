import MessagePage from "../components/layout/MessagePage";
import Button from "../components/ui/Button";
import TextLink from "../components/ui/TextLink";
import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Página não encontrada");

  return (
    <MessagePage
      title="404"
      message="Esta página não existe. O endereço pode estar errado ou o conteúdo mudou de lugar."
    >
      <Button to="/">Voltar para o início</Button>
      <TextLink to="/projetos">Ver projetos</TextLink>
    </MessagePage>
  );
};

export default NotFound;
