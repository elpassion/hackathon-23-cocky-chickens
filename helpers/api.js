import axios from 'axios';

export const apiPath = axios.create({
  baseURL: 'http://api.shiny-infra.xyz',
});
