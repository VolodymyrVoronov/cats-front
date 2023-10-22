import axios from 'axios';

const URL = 'http://localhost:9000/api';

const client = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
