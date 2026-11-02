import useMessages from "../../hooks/useMessages";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import Skeleton from "../ui/Skeleton";
import MessageRow from "./MessageRow";

const MessagesSkeleton = () => (
  <div role="status" aria-label="Carregando mensagens" className="space-y-3">
    <Skeleton className="h-36 w-full" />
    <Skeleton className="h-36 w-full" />
  </div>
);

const MessageList = () => {
  const {
    messages,
    isPending,
    isError,
    refetch,
    setAnswered,
    updatingId,
    hasUpdateFailed,
  } = useMessages();

  if (isPending) {
    return <MessagesSkeleton />;
  }
  if (isError) {
    return (
      <ErrorState
        title="As mensagens não carregaram"
        message="O serviço não respondeu. Tente de novo em instantes."
        onRetry={refetch}
      />
    );
  }
  if (messages.length === 0) {
    return <EmptyState title="Nenhuma mensagem recebida ainda." />;
  }

  return (
    <>
      <div aria-live="polite" className="text-erro text-sm">
        {hasUpdateFailed && (
          <p className="mb-4">
            A mudança não foi salva. Confira sua conexão e tente de novo.
          </p>
        )}
      </div>
      <ul className="border-borda border-b">
        {messages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            isUpdating={updatingId === message.id}
            onSetAnswered={setAnswered}
          />
        ))}
      </ul>
    </>
  );
};

export default MessageList;
