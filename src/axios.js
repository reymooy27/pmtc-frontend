import axios from "axios";

const instance = axios.create({
  baseURL: "https://pmtc-tourney.herokuapp.com",withCredentials: true
});

export default instance;
