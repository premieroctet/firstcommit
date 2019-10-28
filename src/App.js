import React, { useState, useEffect } from "react";
import { parseLinkHeader } from "./utils";
import Downshift from "downshift";
import { useDebounce } from "use-debounce";
import Skeleton from "react-loading-skeleton";
import GithubCorner from "react-github-corners";
import client from "./api/client";
import Footer from "./components/Footer/Footer";
import { formatDistance, subDays } from "date-fns";
import "react-github-corners/dist/GithubCorner.css";
import {
  Container,
  Title,
  Desc,
  Input,
  Suggestion,
  CommitContainer,
  CommitButton,
  SkeletonContainer,
  Layout,
  Error,
  NoRepo
} from "./elements";

function App() {
  const [repositories, setRepositories] = useState();
  const [firstCommit, setFirstCommit] = useState();
  const [loadingCommit, setLoadingCommit] = useState(false);
  const [loadingRepo, setLoadingRepo] = useState(false);
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
      setLoadingCommit(false);
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
    //eslint-disable-next-line
  }, [debouncedUrl]);

  const onChange = event => {
    setUrl(event.target.value);
    window.history.pushState(null, "/?repo=", "/?repo=" + event.target.value);
  };

  const onChangeDownshift = selection => {
    getFirstCommit(selection);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Layout>
      <GithubCorner
        color="white"
        backgroundColor="#1050FF"
        url="https://github.com/premieroctet/firstcommit"
      />
      <Downshift
        itemToString={item => (item ? item.value : "")}
        onChange={onChangeDownshift}
      >
        {({
          getInputProps,
          getMenuProps,
          getRootProps,
          getItemProps,
          getLabelProps,
          highlightedIndex,
          selectedItem
        }) => (
          <Container>
            <Title>First Commit</Title>
            <Desc {...getLabelProps()}>
              Dig up the first commit of any GitHub repo{" "}
              <span
                style={{ marginLeft: "8px" }}
                role="img"
                aria-label="rocket"
              >
                🚀
              </span>
            </Desc>

            <form {...getRootProps()}>
              <Input
                placeholder="Name of Github repository"
                {...getInputProps()}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                type="text"
                value={url}
                autoFocus
              />
            </form>

            {loadingRepo ? (
              <SkeletonContainer>
                <Skeleton />
              </SkeletonContainer>
            ) : (
              <NoRepo>
                {(function() {
                  if (repositories && repositories.length === 0 && url !== "") {
                    return (
                      <p>
                        <span role="img" aria-label="help">
                          ❓
                        </span>
                        No results were found, the repository may be in private
                        <span role="img" aria-label="help">
                          ❓
                        </span>
                      </p>
                    );
                  } else if (repositories && repositories.length >= 1) {
                    return repositories.map((repository, index) => (
                      <Suggestion
                        isActive={highlightedIndex === index}
                        selectedItem={selectedItem === repository}
                        onClick={() => getFirstCommit(repository)}
                        key={repository}
                        {...getMenuProps()}
                      >
                        <p
                          style={{ padding: 0, margin: 0 }}
                          {...getItemProps({
                            item: repository,
                            key: repository
                          })}
                        >
                          {repository}
                        </p>
                      </Suggestion>
                    ));
                  }
                })()}
              </NoRepo>
            )}

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
                    href={firstCommit}
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
          </Container>
        )}
      </Downshift>
    </Layout>
  );
}

export default App;
