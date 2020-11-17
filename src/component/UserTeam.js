import React, { useEffect, useState } from 'react'
import axios from "../axios";
import Loader from "react-loader-spinner";
import {
  useParams,
} from "react-router-dom";

function UserTeam() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const req = await axios.post('/team2/' + id);
      if (mounted) {
        setData(req.data);
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#00DEAB"
          height={120}
          width={120}
        />
      ) : (<h1>{data.teamName}</h1>)}
    </div>
  )
}

export default UserTeam
