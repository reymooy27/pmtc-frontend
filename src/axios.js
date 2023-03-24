import axios from "axios";
// import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
const baseURL = 'https://pubg.up.railway.app/'
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { 'Cache-Control': 'no-cache' },
  // adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

export default instance;
