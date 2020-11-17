import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfileTabs({ tab}) {

  const [active, setActive] = useState(1);
  
  const tabs = [
    { label: "Overview", to: "/overview", value: 1 },
    { label: "Stats", to: "/stats", value: 2 },
    { label: "Team", to: "/team", value: 3 },
    { label: "Friends", to: "/friends", value: 4 },
    { label: "Tournaments", to: "/tournaments", value: 5 },
  ];

  useEffect(() => {
    setActive(tab);
  }, [tab]);

  return (
    <div className="tab-wraper">
      {tabs.map((tab) => (
        <Link key={tab.label} to={`/profile${tab.to}`}>
          <button className={active === tab.value ? "tab active" : "tab"}>
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
export default ProfileTabs;
