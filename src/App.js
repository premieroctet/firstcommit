import React, { useState, useEffect } from "react";
import DropDown from "./components/DropDown";
import CommitItem from "./components/CommitItem";
import { Container, Title, Desc, Layout, Error } from "../src/layout/elements";
import "react-github-corners/dist/GithubCorner.css";
import GithubCorner from "react-github-corners";
import { useDebounce } from "use-debounce";
import { parseLinkHeader } from "../src/utils/headers";
import client from "./api/client";

function App() {
  const [repositories, setRepositories] = useState();
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [firstCommit, setFirstCommit] = useState();
  const [loadingCommit, setLoadingCommit] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const [url, setUrl] = useState(queryParams.get("repo") || "");
  const [debouncedUrl] = useDebounce(url, 500);
  const [hasError, setError] = useState(false);

  const getFirstCommit = async repository => {
    setError(false);
    setLoadingCommit(true);
    try {
      let response = await client.get(`/repos/${repository}/commits`);
      if (response.headers.link) {
        const links = parseLinkHeader(response.headers.link);
        response = await client.get(links.last);
      }
      const lastCommit = response.data[response.data.length - 1];
      setFirstCommit(lastCommit);
    } catch (e) {
      setError(true);
      setFirstCommit(null);
    }
    setLoadingCommit(false);
  };

  const searchRepositories = async url => {
    if (url === "") {
      setLoadingRepo(false);
      setRepositories(null);
      setFirstCommit();
    } else {
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${url}&per_page=5`
      );
      const repositories = response.data.items;
      setRepositories(repositories.map(repository => repository.full_name));
      setLoadingRepo(false);
    }
  };

  useEffect(() => {
    setError(false);
    searchRepositories(debouncedUrl);
  }, [debouncedUrl]);

  return (
    <Layout>
      <GithubCorner
        color="white"
        backgroundColor="#1050FF"
        url="https://github.com/premieroctet/firstcommit"
      />
      <Title>First Commit</Title>
      <Desc>
        Dig up the first commit of any GitHub repo{" "}
        <span style={{ marginLeft: "8px" }} role="img" aria-label="rocket">
          🚀
        </span>
      </Desc>
      <Container>
        <DropDown
          setUrl={setUrl}
          url={url}
          loadingRepo={loadingRepo}
          repositories={repositories}
          getFirstCommit={getFirstCommit}
        />
      </Container>
      {hasError && (
        <Error>
          Sorry, we can’t find the first commit for this repo{" "}
          <span role="img" aria-label="sad">
            😰
          </span>
        </Error>
      )}
      <CommitItem loadingCommit={loadingCommit} firstCommit={firstCommit} />
    </Layout>
  );
}

export default App;
