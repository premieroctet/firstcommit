import axios from "axios";

const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const client = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: `token ${TOKEN}` }
});

export default client;
