import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { parseLinkHeader } from "./utils";
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

  const searchRepositories = debounce(async term => {
    if (url === "") {
      setLoadingRepo(false);
      const repositories = [];
      setRepositories(repositories.map(repository => repository.full_name));
    } else {
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${term}&per_page=5`
      );
      const repositories = response.data.items;
      setLoadingRepo(false);
      setRepositories(repositories.map(repository => repository.full_name));
    }
  }, 500);

  const queryParams = new URLSearchParams(window.location.search);
  const [url, setUrl] = useState(queryParams.get("repo") || null);

  useEffect(() => {
    if (url) {
      searchRepositories(url);
    }
    //eslint-disable-next-line
  }, [url]);

  const onChange = event => {
    setUrl(event.target.value);
  };

  return (
    <Container>
      <Title>First Commit</Title>
      <Desc>
        Pop up the first commit of any GitHub repo{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </Desc>

      <form>
        <Input
          placeholder="Name of Github repository"
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
        repositories.map(repository => (
          <Suggestion
            onClick={() => getFirstCommit(repository)}
            key={repository}
          >
            {repository}
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
  );
}

export default App;
