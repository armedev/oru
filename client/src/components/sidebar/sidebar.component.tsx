import React from "react";
import "./sidebar.styles.scss";
import { serverAxios } from "../../utils/axios";
import { useNavigate } from "react-router";
import { Selected } from "../../pages/home/home.component";

interface Props {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Selected;
  setSelected: React.Dispatch<React.SetStateAction<Selected>>;
}

const Sidebar: React.FC<Props> = ({
  setToken,
  sidebarToggle,
  setSidebarToggle,
  selected,
  setSelected,
}) => {
  const navigate = useNavigate();
  const signout = async () => {
    try {
      let res = await serverAxios().get("/api/logout");
      setToken(null);
      navigate("/auth");
      console.log(res);
    } catch (err) {
      alert("failed to logout");
    }
  };

  return (
    <div className="sidebar_toggler">
      <div className="toggler" onClick={() => setSidebarToggle(!sidebarToggle)}>
        {sidebarToggle ? <span>&#10006;</span> : <span>≡</span>}
      </div>
      {sidebarToggle ? (
        <div className="sidebar">
          <div className={"sidebar__header"}>Dashboard</div>
          <div className={"sidebar__body"}>
            <span
              onClick={() => setSelected("profile")}
              className={selected === "profile" ? "selected" : ""}
            >
              Profile
            </span>
            <span
              onClick={() => setSelected("connections")}
              className={selected === "connections" ? "selected" : ""}
            >
              Connections
            </span>
          </div>
          <div className={"sidebar__footer"}>
            <span onClick={signout}>Logout</span>

            <span>Help</span>
            <span>Contact Us</span>
          </div>
        </div>
      ) : (
        <div className="sidebar_closed"></div>
      )}
    </div>
  );
};

export default Sidebar;
