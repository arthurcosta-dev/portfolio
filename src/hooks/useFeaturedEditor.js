import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { saveFeaturedNames } from "../services/featured";
import { moveItem, orderBySelection } from "../utils/featured";
import useFeaturedNames, { FEATURED_QUERY_KEY } from "./useFeaturedNames";
import useRepos from "./useRepos";

const useFeaturedEditor = () => {
  const queryClient = useQueryClient();
  const repos = useRepos();
  const saved = useFeaturedNames();
  // draft guarda as mudanças até salvar; null = igual ao que está no banco.
  const [draft, setDraft] = useState(null);

  const allNames = (repos.data ?? []).map((repo) => repo.name);
  const selected = (draft ?? saved.data ?? []).filter((name) =>
    allNames.includes(name),
  );

  const mutation = useMutation({
    networkMode: "always",
    mutationFn: saveFeaturedNames,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: FEATURED_QUERY_KEY });
      setDraft(null);
    },
  });

  const change = (nextSelected) => {
    setDraft(nextSelected);
    mutation.reset();
  };

  return {
    repos: orderBySelection(repos.data ?? [], selected),
    selected,
    isPending: repos.isPending || saved.isPending,
    isError: repos.isError || saved.isError,
    refetch: () => Promise.all([repos.refetch(), saved.refetch()]),
    toggle: (name) =>
      change(
        selected.includes(name)
          ? selected.filter((item) => item !== name)
          : [...selected, name],
      ),
    move: (name, offset) => change(moveItem(selected, name, offset)),
    save: () => mutation.mutate(selected),
    hasChanges: draft !== null,
    isSaving: mutation.isPending,
    wasSaved: mutation.isSuccess,
    hasSaveFailed: mutation.isError,
  };
};

export default useFeaturedEditor;
