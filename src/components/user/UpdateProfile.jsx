import React from "react";
import NavBar from "../home/NavBar";
import Header from "../home/Header";
import { useStateValue } from "../../context/stateProvider";
import MusicPlayer from "../MusicPlayer";
import Alert from "../admin/Alert";
import "../../styles/NavBar.css";

const UpdateProfile = () => {
  const [{ alertType }, dispatch] = useStateValue();
  return (
    <div className="outerWrap">
      <div className="app">
        <NavBar />
        <div className="main" style={{ marginTop: "50px" }}>
          <Header />
          <h3 className="ms-3 mt-0">Update Your Profile</h3>
        </div>

        {alertType && <Alert type={alertType} />}
      </div>
      <div className="music-controls">{/* <MusicPlayer /> */}</div>
    </div>
  );
};

export default UpdateProfile;
