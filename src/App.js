import React, { useState } from "react";
import throttle from 'lodash.throttle';
import { parseLinkHeader } from "./utils";
import client from "./api/client";

import "./App.css";

function App() {
  const [ repositories,setRepositories ] = useState([]);
  const [ firstCommit,setFirstCommit ] = useState();

  const getFirstCommit = async (repository) => {
    let response = await client.get(`/repos/${repository}/commits`);
    const links = parseLinkHeader(response.headers.link);
  
    response = await client.get(links.last);

    const lastCommit = response.data[ response.data.length - 1 ];
    
    setFirstCommit(lastCommit.html_url)
  }
  
  const searchRepositories = throttle(async (term) => {
    let response = await client.get(`/search/repositories?q=${term}&per_page=5`);
    const repositories = response.data.items;
    setRepositories(repositories.map(repository => repository.full_name))
  }, 500);

  return (
      <div className="App">
        <form>
          <input onChange={e => searchRepositories(e.target.value)} type="text" />
        </form>
      {repositories.map(repository => <div onClick={() => getFirstCommit(repository)} key={repository}>{repository}</div>)}
      {firstCommit && <div><a href={firstCommit}>{firstCommit}</a></div>}
      </div>
  );
}

export default App;