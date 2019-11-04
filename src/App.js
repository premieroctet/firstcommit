import React, { useState, useEffect } from "react";
import DropDown from "./components/DropDown";
import CommitItem from "./components/CommitItem";
import {
  Container,
  Title,
  Desc,
  Layout,
  Error,
  Img,
  Box,
  Levitation
} from "../src/layout/elements";
import { parseLinkHeader } from "../src/utils/headers";
import client from "./api/client";

function App() {
  const [repositories, setRepositories] = useState();
  const [firstCommit, setFirstCommit] = useState();
  const [loadingCommit, setLoadingCommit] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const [url, setUrl] = useState(queryParams.get("repo") || "");
  const [hasError, setError] = useState(false);

  const getFirstCommit = async repository => {
    setRepositories(null);
    setError(false);
    setLoadingCommit(true);
    if (repository) {
      try {
        let response = await client.get(`/repos/${repository}/commits`);
        if (response.headers.link) {
          const links = parseLinkHeader(response.headers.link);
          response = await client.get(links.last);
        }
        const lastCommit = response.data[response.data.length - 1];
        setFirstCommit(lastCommit);
        setUrl(repository);
      } catch (e) {
        setError(true);
        setFirstCommit(null);
      }
    }
    setRepositories(null);
    setLoadingCommit(false);
  };

  useEffect(() => {
    console.log(repositories);
  }, [repositories]);

  return (
    <Layout>
      <Box>
        <Levitation>
          <Img
            className="logo"
            src={require(`./assets/img/logo.png`)}
            alt="icon-logo"
          />
        </Levitation>
        <Title>First Commit</Title>
        <Desc>Dig up the first commit of any GitHub repo</Desc>
        <Container>
          <DropDown
            url={url}
            getFirstCommit={getFirstCommit}
            setFirstCommit={setFirstCommit}
            firstCommit={firstCommit}
            repositories={repositories}
            setRepositories={setRepositories}
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
        <CommitItem
          loadingCommit={loadingCommit}
          firstCommit={firstCommit}
          url={url}
        />
      </Box>
    </Layout>
  );
}

export default App;
