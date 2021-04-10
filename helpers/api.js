import axios from 'axios';

export const apiPath = axios.create({
  baseURL: 'https://api.shiny-infra.xyz',
});
