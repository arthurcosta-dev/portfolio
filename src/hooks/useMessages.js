import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages, setMessageAnswered } from "../services/messages";

export const MESSAGES_QUERY_KEY = ["messages"];

const useMessages = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: MESSAGES_QUERY_KEY,
    queryFn: fetchMessages,
    staleTime: 0,
  });

  const mutation = useMutation({
    mutationFn: setMessageAnswered,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: MESSAGES_QUERY_KEY }),
  });

  return {
    messages: query.data ?? [],
    isPending: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
    setAnswered: mutation.mutate,
    updatingId: mutation.isPending ? mutation.variables.id : null,
    hasUpdateFailed: mutation.isError,
  };
};

export default useMessages;
