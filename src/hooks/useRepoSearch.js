import { useState, useEffect, useCallback } from "react";
import client from "../api/client";
import { useDebounce } from "use-debounce";

export const RESULT_PER_PAGE = 3;

const useRepoSearch = searchTerm => {
  const [repositories, setRepositories] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  if (searchTerm) {
    window.history.pushState(null, "/?repo=", `/?repo=${searchTerm}`);
  } else {
    window.history.pushState(null, "/", "/");
  }

  const [debouncedTerm] = useDebounce(searchTerm, 400);

  const loadRepositories = useCallback(async () => {
    try {
      setError(undefined);
      setLoading(true);

      const response = await client.get(
        `/search/repositories?q=${debouncedTerm}&per_page=${RESULT_PER_PAGE}`
      );

      setRepositories(response.data.items);
    } catch (e) {
      setError(e.response.data.message);
    }

    setLoading(false);
  }, [debouncedTerm]);

  useEffect(() => {
    setLoading(true);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      loadRepositories();
    }
  }, [loadRepositories, debouncedTerm]);

  return { repositories, loading, error };
};

export default useRepoSearch;
