import axios from "axios";
// import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
const baseURL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : "http://localhost:8000"
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { 'Cache-Control': 'no-cache' },
  // adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

export default instance;
