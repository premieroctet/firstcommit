import React, { useState } from "react";
import debounce from "lodash/debounce";
import { parseLinkHeader } from "./utils";
import Skeleton from "react-loading-skeleton";
import client from "./api/client";

import "./App.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [firstCommit, setFirstCommit] = useState();
  const [loading, setLoading] = useState(true);

  const getFirstCommit = async repository => {
    setLoading(true);
    let response = await client.get(`/repos/${repository}/commits`);

    if (response.headers.link) {
      const links = parseLinkHeader(response.headers.link);
      response = await client.get(links.last);
    }

    const lastCommit = response.data[response.data.length - 1];

    setFirstCommit(lastCommit.html_url);
    setLoading(false);
  };

  const searchRepositories = debounce(async term => {
    let response = await client.get(
      `/search/repositories?q=${term}&per_page=5`
    );
    const repositories = response.data.items;
    setRepositories(repositories.map(repository => repository.full_name));
  }, 500);

  return (
    <div className="App">
      <p className="title">First Commit</p>
      <p className="desc">
        Pop up the first commit of any GitHub repo{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </p>

      <form>
        <input
          placeholder="Name of Github repository"
          onChange={e => searchRepositories(e.target.value)}
          type="text"
        />
      </form>
      {repositories.map(repository => (
        <div
          className="suggestion"
          onClick={() => getFirstCommit(repository)}
          key={repository}
        >
          {repository}
        </div>
      ))}

      {firstCommit && (
        <div className="commit-container">
          {loading ? (
            <Skeleton />
          ) : (
            <a href={firstCommit} target="_blank" rel="noopener noreferrer">
              <button className="commit-button">
                See the first commit
                <span
                  style={{ marginLeft: "8px" }}
                  role="img"
                  aria-label="checkmark"
                >
                  ✅
                </span>{" "}
              </button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
