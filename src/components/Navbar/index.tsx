import { useGlobalContext } from "@/context";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const links = [
  { id: 1, url: "/profile-data", text: "profile" },
  { id: 2, url: "/demo", text: "demo" },
];

function Navbar() {
  const [ind, setInd] = useState(1);
  const { profileData } = useGlobalContext();

  const handleClik = (id: number) => {
    setInd(id);
  };

  return (
    <div className="navbar">
      <div className="nav-bar-link">
        {links.map((link) => {
          const { id, url, text } = link;
          return (
            <div className="navbar-header" key={id}>
              <li>
                <NavLink
                  className={id === ind ? "capital" : "capitalize"}
                  to={url}
                  onClick={() => handleClik(id)}
                >
                  {text}
                </NavLink>
              </li>
            </div>
          );
        })}
        <span
          style={{
            color: "#057aff",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {profileData && profileData?.name}
        </span>
      </div>
    </div>
  );
}

export default Navbar;
