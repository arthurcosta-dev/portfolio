import { useEffect, useState } from "react";
import { onAuthChange } from "../services/auth";

// undefined = ainda não sabe; null = sem sessão.
const useAuthSession = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const subscription = onAuthChange(setSession).catch(() => {
      // Sem conseguir conferir, trata como sem sessão: o login mostra o erro ao tentar.
      setSession(null);
      return () => {};
    });

    return () => {
      subscription.then((unsubscribe) => unsubscribe());
    };
  }, []);

  return { session, isLoading: session === undefined };
};

export default useAuthSession;
