import FeaturedSelector from "../components/admin/FeaturedSelector";
import MessageList from "../components/admin/MessageList";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import usePageTitle from "../hooks/usePageTitle";
import useSignOut from "../hooks/useSignOut";

const SECTION_TITLE =
  "font-serif text-[28px] leading-[1.2] font-light tracking-[-0.01em] lg:text-[32px]";

const Admin = () => {
  usePageTitle("Painel");
  const signOut = useSignOut();

  return (
    <div className="mx-auto w-full max-w-[960px] px-6 pt-4 pb-[72px] md:px-10 lg:pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-[40px] leading-[1.1] font-light tracking-[-0.03em] lg:text-[52px]">
          Painel
        </h1>
        <Button
          variant="outline"
          disabled={signOut.isPending}
          aria-busy={signOut.isPending}
          onClick={() => signOut.mutate()}
          className="h-11 px-5 text-[15px]"
        >
          {signOut.isPending && <Spinner />}
          Sair
        </Button>
      </div>
      <div aria-live="polite" className="text-erro text-sm">
        {signOut.isError && (
          <p className="mt-3">
            Não foi possível sair. Confira sua conexão e tente de novo.
          </p>
        )}
      </div>

      <section aria-labelledby="titulo-mensagens" className="mt-10">
        <h2 id="titulo-mensagens" className={`${SECTION_TITLE} mb-4`}>
          Mensagens
        </h2>
        <MessageList />
      </section>

      <section aria-labelledby="titulo-destaques" className="mt-14">
        <h2 id="titulo-destaques" className={SECTION_TITLE}>
          Destaques
        </h2>
        <p className="text-texto-suave mt-2 mb-4 max-w-[60ch] text-base leading-normal">
          A home mostra os 3 primeiros escolhidos, nesta ordem. Sem nenhum
          escolhido, entram os atualizados mais recentemente.
        </p>
        <FeaturedSelector />
      </section>
    </div>
  );
};

export default Admin;
