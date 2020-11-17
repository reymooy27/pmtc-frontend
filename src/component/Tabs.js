import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tabs.css";
import {selectTournament} from '../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";

function Tabs({ tab}) {
  const tournament = useSelector(selectTournament)

  const [active, setActive] = useState(1);
  
  const tabs = [
    { label: "Jadwal", to: "/schedule", value: 1 },
    { label: "Tim", to: "/team", value: 2 },
    { label: "Leaderboard", to: "/leaderboard", value: 3 },
    { label: "Kill Rangking", to: "/killrangking", value: 4 },
    { label: "Hadiah", to: "/prize", value: 5 },
    { label: "Peraturan", to: "/rules", value: 6 },
  ];

  useEffect(() => {
    setActive(tab);
  }, [tab]);

  return (
    <div className="tab-wraper">
      {tabs.map((tab) => (
        <Link key={tab.label} to={`/tournament/${tournament._id}${tab.to}`}>
          <button className={active === tab.value ? "tab active" : "tab"}>
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
export default Tabs;
