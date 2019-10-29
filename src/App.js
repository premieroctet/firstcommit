import React, { useState } from "react";
import GithubCorner from "react-github-corners";
import { Title, Caption, Layout, Error } from "./layout/elements";
import { parseLinkHeader } from "./utils/headers";
import client from "./api/client";
import Logo from "./components/Logo";
import Combobox from "./components/Combobox";
import CommitCard from "./components/CommitCard";
import CommitSkeleton from "./components/CommitCard/CommitSkeleton";
import Footer from "./components/Footer";

const App = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [firstCommit, setFirstCommit] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const getFirstCommit = async repository => {
    setError(false);
    setLoading(true);

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

    setLoading(false);
  };

  return (
    <>
      <GithubCorner
        color="#222e7c"
        backgroundColor="white"
        url="https://github.com/premieroctet/firstcommit"
      />
      <Layout>
        <Logo />
        <Title>First Commit</Title>
        <Caption>Dig up the first commit of any GitHub repo</Caption>

        <Combobox
          initialValue={queryParams.get("repo") || ""}
          handleOnSelect={repositoryName => {
            getFirstCommit(repositoryName);
          }}
        />

        {loading && <CommitSkeleton />}
        {!loading && firstCommit && <CommitCard commit={firstCommit} />}
        {hasError && (
          <Error>Sorry, we can’t find the first commit for this repo </Error>
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default App;
