import React from "react";
import "../../styles/Dashboard.css";
import Header from "../home/Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import DashboardHome from "./DashboardHome";
import DashboardUsers from "./DashboardUsers";
import DashboardSongs from "./DashboardSongs";
import DashboardAlbums from "./DashboardAlbums";
import DashboardArtists from "./DashboardArtists";
import DashboardNewSong from "./DashboardNewSong";
import Alert from "./Alert";
import { useStateValue } from "../../context/stateProvider";
import "./../../styles/NavBar.css";
import NavBar from "../home/NavBar";
import MusicPlayer from "../MusicPlayer";

const Dashboard = () => {
  const [{ alertType }, dispatch] = useStateValue();
  return (
    <>
      <div className="outerWrap">
        <div className="app">
          <NavBar />
          <div className="main" style={{ marginTop: "50px" }}>
            <Header />
            <div className="dashboard-menu">
              <NavLink to={"/dashboard/users"}>Users</NavLink>
              <NavLink to={"/dashboard/songs"}>Song</NavLink>
              <NavLink to={"/dashboard/albums"}>Album</NavLink>
              <NavLink to={"/dashboard/artists"}>Artist</NavLink>
            </div>

            <div className="w-100 my-3 p-3 d-flex gap-5">
              <Routes>
                <Route path="/users" element={<DashboardUsers />} />
                <Route path="/songs" element={<DashboardSongs />} />
                <Route path="/albums" element={<DashboardAlbums />} />
                <Route path="/artists" element={<DashboardArtists />} />
                <Route path="/newSong" element={<DashboardNewSong />} />
              </Routes>
            </div>
          </div>

          {alertType && <Alert type={alertType} />}
        </div>
        <div className="music-controls">
          <MusicPlayer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
