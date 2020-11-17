import axios from "axios";

const instance = axios.create({
  // Development
  // baseURL: "http://localhost:8000",withCredentials: true
  // Production
  baseURL: "https://pmtc-tourney.herokuapp.com",withCredentials: true
});

export default instance;
