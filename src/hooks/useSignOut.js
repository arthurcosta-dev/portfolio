import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../services/auth";
import { MESSAGES_QUERY_KEY } from "./useMessages";

const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    // As mensagens não ficam na memória do navegador depois de sair.
    onSuccess: () =>
      queryClient.removeQueries({ queryKey: MESSAGES_QUERY_KEY }),
  });
};

export default useSignOut;
