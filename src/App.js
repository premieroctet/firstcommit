import React, { useState, useEffect } from "react";
import DownShiftContainer from "./components/DownShiftContainer/DownShiftContainer";
import "react-github-corners/dist/GithubCorner.css";
import { formatDistance, subDays } from "date-fns";
import GithubCorner from "react-github-corners";
import Footer from "./components/Footer/Footer";
import Skeleton from "react-loading-skeleton";
import { useDebounce } from "use-debounce";
import { parseLinkHeader } from "./utils";
import client from "./api/client";
import {
  Container,
  Title,
  Desc,
  CommitContainer,
  CommitButton,
  SkeletonContainer,
  Layout,
  Error
} from "./elements";

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
        <DownShiftContainer
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

      {loadingCommit ? (
        <SkeletonContainer>
          <Skeleton />
        </SkeletonContainer>
      ) : (
        firstCommit && (
          <CommitContainer>
            <a
              href={firstCommit.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CommitButton>
                See the first commit{" "}
                {formatDistance(
                  subDays(new Date(firstCommit.commit.committer.date), 3),
                  new Date()
                )}{" "}
                ago
                <span
                  style={{ marginLeft: "8px" }}
                  role="img"
                  aria-label="checkmark"
                >
                  ✅
                </span>{" "}
              </CommitButton>
            </a>
          </CommitContainer>
        )
      )}
      <Footer />
    </Layout>
  );
}

export default App;
