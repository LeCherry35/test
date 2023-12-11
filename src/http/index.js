import axios from 'axios';

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

// seting base url
const $api = axios.create({
  baseURL: API_URL,
});

export default $api;
