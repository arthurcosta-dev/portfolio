import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { onAuthChange } from "../services/auth";
import { MESSAGES_QUERY_KEY } from "./useMessages";

const RETRY_DELAY = 3000;

// undefined = ainda não sabe; null = sem sessão.
const useAuthSession = () => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let isActive = true;
    let unsubscribe;
    let retryTimer;

    const subscribe = () =>
      onAuthChange(setSession)
        .then((cancel) => {
          if (isActive) {
            unsubscribe = cancel;
          } else {
            cancel();
          }
        })
        .catch(() => {
          // Sem conseguir conferir, mostra o login e segue tentando: sem isso,
          // um login feito depois que a rede voltar não seria percebido.
          setSession((current) => current ?? null);
          retryTimer = setTimeout(subscribe, RETRY_DELAY);
        });

    subscribe();

    return () => {
      isActive = false;
      clearTimeout(retryTimer);
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    // Vale também para saída em outra aba ou sessão expirada, não só para o botão Sair.
    if (session === null) {
      queryClient.removeQueries({ queryKey: MESSAGES_QUERY_KEY });
    }
  }, [session, queryClient]);

  return { session, isLoading: session === undefined };
};

export default useAuthSession;
