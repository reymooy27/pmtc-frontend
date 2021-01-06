import axios from "axios";
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

const instance = axios.create({
  // Development
  // baseURL: "http://localhost:8000",
  // Production
  baseURL: "https://pmtc-tourney.herokuapp.com",
  withCredentials: true,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

export default instance;
