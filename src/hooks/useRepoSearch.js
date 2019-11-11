import { useState, useEffect } from "react";
import client from "../api/client";
import { useThrottle } from "use-throttle";

export const RESULT_PER_PAGE = 3;

const useRepoSearch = searchTerm => {
  const [repositories, setRepositories] = useState(undefined);
  const [loading, setLoading] = useState(false);

  if (searchTerm) {
    window.history.pushState(null, "/?repo=", `/?repo=${searchTerm}`);
  } else {
    window.history.pushState(null, "/", "/");
  }

  const throttledTerm = useThrottle(searchTerm, 400);

  useEffect(() => {
    if (throttledTerm) {
      setLoading(true);

      client
        .get(
          `/search/repositories?q=${throttledTerm}&per_page=${RESULT_PER_PAGE}`
        )
        .then(response => {
          setLoading(false);
          setRepositories(response.data.items);
        })
        .catch(e => {
          setLoading(false);
        });
    }
  }, [throttledTerm]);

  return { repositories, loading };
};

export default useRepoSearch;
