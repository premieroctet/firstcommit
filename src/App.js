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
  NoRepo
} from "./elements";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [firstCommit, setFirstCommit] = useState();
  const [loadingCommit, setLoadingCommit] = useState(false);
  const [loadingRepo, setLoadingRepo] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const [url, setUrl] = useState(queryParams.get("repo") || "");
  const [debouncedUrl] = useDebounce(url, 500);
  const [firstCommitDate, setFirstCommitDate] = useState("");
  const [noRepo, setNoRepo] = useState("");

  const getFirstCommit = async repository => {
    setLoadingCommit(true);
    let response = await client.get(`/repos/${repository}/commits`);
    if (response.headers.link) {
      const links = parseLinkHeader(response.headers.link);
      response = await client.get(links.last);
    }
    const lastCommit = response.data[response.data.length - 1];
    setFirstCommit(lastCommit.html_url);
    const dateCommitResult = formatDistance(
      subDays(new Date(lastCommit.commit.committer.date), 3),
      new Date()
    );
    setFirstCommitDate(dateCommitResult);
    setLoadingCommit(false);
  };

  const searchRepositories = async url => {
    if (url === "") {
      setLoadingRepo(false);
      const repositories = [];
      setRepositories(repositories.map(repository => repository.full_name));
      setFirstCommit();
      setNoRepo("");
    } else {
      setNoRepo("");
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${url}&per_page=5`
      );
      const repositories = response.data.items;
      setRepositories(repositories.map(repository => repository.full_name));
      setLoadingRepo(false);
      if (repositories.length <= 0) {
        setNoRepo(
          "❓ No results were found, the repository may be in private❓"
        );
      }
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
                {...getInputProps({
                  onKeyDown: event => {
                    switch (event.key) {
                      case "Tab": {
                        break;
                      }
                      default:
                        break;
                    }
                  }
                })}
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
              repositories.map((repository, index) => (
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
              ))
            )}
            <NoRepo>{noRepo}</NoRepo>
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
                      See the first commit {firstCommitDate} ago
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
