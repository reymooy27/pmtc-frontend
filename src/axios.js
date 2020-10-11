import axios from "axios";

const instance = axios.create({
  baseURL: "http://pmtc-tourney.herokuapp.com",
});

export default instance;
