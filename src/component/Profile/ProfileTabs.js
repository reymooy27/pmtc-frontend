import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/reducers/userSlice";

function ProfileTabs({tab,isUser,user_}) {

  const user = useSelector(selectUser)
  const [active, setActive] = useState(1);
  
  const tabs = [
    { label: "Overview", to: "/overview", value: 1 },
    { label: "Stats", to: "/stats", value: 2 },
    { label: "Tim", to: "/team", value: 3 },
    { label: "Teman", to: "/friends", value: 4 },
    { label: "Turnamen", to: "/tournaments", value: 5 },
  ];

  useEffect(() => {
    setActive(tab);
  }, [tab]);

  return (
    <div className="tab-wraper">
      {tabs.map((tab) => (
        <Link key={tab.label} to={`/profile/${isUser ? user?._id : user_?._id}${tab.to}`}>
          <button className={active === tab.value ? "tab active" : "tab"}>
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
export default ProfileTabs;
