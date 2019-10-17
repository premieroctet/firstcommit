import React, { useState, useEffect } from "react";
import { parseLinkHeader } from "./utils";
import Downshift from "downshift";
import { useDebounce } from "use-debounce";
import Skeleton from "react-loading-skeleton";
import client from "./api/client";
import {
  Container,
  Title,
  Desc,
  Input,
  Suggestion,
  CommitContainer,
  CommitButton,
  SkeletonContainer
} from "./elements";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [firstCommit, setFirstCommit] = useState();
  const [loadingCommit, setLoadingCommit] = useState(false);
  const [loadingRepo, setLoadingRepo] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const [url, setUrl] = useState(queryParams.get("repo") || "");
  const [debouncedUrl] = useDebounce(url, 500);

  const getFirstCommit = async repository => {
    setLoadingCommit(true);
    let response = await client.get(`/repos/${repository}/commits`);

    if (response.headers.link) {
      const links = parseLinkHeader(response.headers.link);
      response = await client.get(links.last);
    }

    const lastCommit = response.data[response.data.length - 1];

    setFirstCommit(lastCommit.html_url);
    setLoadingCommit(false);
  };

  const searchRepositories = async url => {
    if (url === "") {
      setLoadingRepo(false);
      const repositories = [];
      setRepositories(repositories.map(repository => repository.full_name));
      setFirstCommit();
    } else {
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${url}&per_page=5`
      );
      const repositories = response.data.items;
      setLoadingRepo(false);
      setRepositories(repositories.map(repository => repository.full_name));
    }
  };

  useEffect(() => {
    searchRepositories(debouncedUrl);
    //eslint-disable-next-line
  }, [debouncedUrl]);

  const onChange = event => {
    setUrl(event.target.value);
  };

  const onChangeDownshift = selection => {
    alert(selection ? `You selected ${selection}` : "Selection Cleared");
    getFirstCommit(selection);
  };

  return (
    <Downshift onChange={onChangeDownshift}>
      {({
        getInputProps,
        getMenuProps,
        getRootProps,
        getItemProps,
        getLabelProps,
        highlightedIndex
      }) => (
        <Container>
          <Title>First Commit</Title>
          <Desc {...getLabelProps()}>
            Pop up the first commit of any GitHub repo{" "}
            <span role="img" aria-label="rocket">
              🚀
            </span>
          </Desc>

          <form {...getRootProps()}>
            <Input
              placeholder="Name of Github repository"
              {...getInputProps()}
              onChange={onChange}
              type="text"
              value={url}
              ref={input => input && input.focus()}
            />
          </form>

          {loadingRepo ? (
            <SkeletonContainer>
              <Skeleton />
            </SkeletonContainer>
          ) : (
            repositories.map((repository, index) => (
              <Suggestion
                isActive={highlightedIndex === index}
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
            ))
          )}

          {loadingCommit ? (
            <SkeletonContainer>
              <Skeleton />
            </SkeletonContainer>
          ) : (
            firstCommit && (
              <CommitContainer>
                <a href={firstCommit} target="_blank" rel="noopener noreferrer">
                  <CommitButton>
                    See the first commit
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
        </Container>
      )}
    </Downshift>
  );
}

export default App;
