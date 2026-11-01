import useFeaturedEditor from "../../hooks/useFeaturedEditor";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import Skeleton from "../ui/Skeleton";
import Spinner from "../ui/Spinner";
import FeaturedRow from "./FeaturedRow";

const FeaturedSelector = () => {
  const {
    repos,
    selected,
    isPending,
    isError,
    refetch,
    toggle,
    move,
    save,
    hasChanges,
    isSaving,
    wasSaved,
    hasSaveFailed,
  } = useFeaturedEditor();

  if (isPending) {
    return (
      <div role="status" aria-label="Carregando projetos" className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }
  if (isError) {
    return (
      <ErrorState
        title="Os destaques não carregaram"
        message="O GitHub ou o banco não respondeu. Tente de novo em instantes."
        onRetry={refetch}
      />
    );
  }
  if (repos.length === 0) {
    return <EmptyState title="Nenhum projeto público encontrado ainda." />;
  }

  return (
    <>
      <ul className="border-borda border-b">
        {repos.map((repo) => (
          <FeaturedRow
            key={repo.name}
            name={repo.name}
            position={selected.indexOf(repo.name)}
            total={selected.length}
            disabled={isSaving}
            onToggle={toggle}
            onMove={move}
          />
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button disabled={!hasChanges || isSaving} onClick={save}>
          {isSaving && <Spinner />}
          {isSaving ? "Salvando…" : "Salvar destaques"}
        </Button>
        <div aria-live="polite" className="text-sm">
          {wasSaved && <p className="text-texto-2">Destaques salvos.</p>}
          {hasSaveFailed && (
            <p className="text-erro">
              Os destaques não foram salvos. Confira sua conexão e tente de
              novo.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedSelector;
