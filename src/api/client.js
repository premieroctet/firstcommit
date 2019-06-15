import axios from "axios";

const TOKEN = "18a47eaba2e2f6a0924d9a360b262341ece4601f";

const client = axios.create({
    baseURL: 'https://api.github.com',
    headers: {'Authorization': `token ${TOKEN}`}
});
  
export default client;