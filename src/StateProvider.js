import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "./axios";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [data_, setData_] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [firstWinner, setFirstWinner] = useState(false);
  const [secondWinner, setSecondWinner] = useState(false);
  const [thirdWinner, setThirdWinner] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchDataParticipant() {
      const req = await axios.post("/api/v1/teams");
      if (mounted) {
        setData(req.data);
        setLoading(false);
      }
    }

    setTimeout(() => {
      fetchDataParticipant();
    }, 300);

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const req = await axios.post("/api/v1/tournaments");
      if (mounted) {
      }
      setData_(req.data[0]);
      setLoading(false);
    }
    setTimeout(() => {
      fetchData();
    }, 300);

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      data.filter((a) => {
        if (a.tournamentFirstWinner === true) {
          setFirstWinner(a);
        }
        if (a.tournamentSecondWinner === true) {
          setSecondWinner(a);
        }
        if (a.tournamentThirdWinner === true) {
          setThirdWinner(a);
        }

        setLoading(false);
        return 0;
      });
    }
    return () => (mounted = false);
  }, [data]);

  return (
    <StateContext.Provider
      value={{ data_, data, loading, firstWinner, secondWinner, thirdWinner }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
