import axios from "axios";

const instance = axios.create({
  baseURL: "https://pmtc-tourney.herokuapp.com",withCredentials: true
});
// https://pmtc-tourney.herokuapp.com/
// 'http://localhost:8000'
export default instance;
