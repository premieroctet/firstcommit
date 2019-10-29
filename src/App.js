import React, { useState } from "react";
import DropDown from "./components/DropDown";
import CommitItem from "./components/CommitItem";
import {
  Container,
  Title,
  Desc,
  Layout,
  Error,
  Img,
  Box
} from "../src/layout/elements";
import { parseLinkHeader } from "../src/utils/headers";
import { motion } from "framer-motion";
import client from "./api/client";

function App() {
  const [firstCommit, setFirstCommit] = useState();
  const [loadingCommit, setLoadingCommit] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const [url, setUrl] = useState(queryParams.get("repo") || "");
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
      setUrl(repository);
      window.history.pushState(null, "/?repo=", `/?repo=${repository}`);
    } catch (e) {
      setError(true);
      setFirstCommit(null);
    }
    setLoadingCommit(false);
  };

  return (
    <Layout>
      <Box>
        <motion.div animate={{ scale: 2 }} transition={{ duration: 3 }}>
          <Img
            className="logo"
            src={require(`./assets/img/logo.png`)}
            alt="icon-logo"
          />
        </motion.div>
        <Title>First Commit</Title>
        <Desc>Dig up the first commit of any GitHub repo</Desc>
        <Container>
          <DropDown setUrl={setUrl} url={url} getFirstCommit={getFirstCommit} />
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
      </Box>
    </Layout>
  );
}

export default App;
