import React from "react";
import "../../styles/Dashboard.css";
import Header from "../Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import DashboardHome from "./DashboardHome";
import DashboardUsers from "./DashboardUsers";
import DashboardSongs from "./DashboardSongs";
import DashboardAlbums from "./DashboardAlbums";
import DashboardArtists from "./DashboardArtists";
import Playing from "../Playing";

const Dashboard = () => {
  return (
    <div className="w-100 h-auto d-flex flex-column justify-content-center align-items-center ">
      <Header />
      <div
        className="dashboard-menu w-100 my-2 p-4 d-flex justify-content-start align-items-center gap-5"
        // style={{
        //   background: "linear-gradient(rgba(11,1,1,0.9) 0% , rgba(0,0,0) 100%)",
        // }}
      >
        <NavLink to={"/dashboard/home"}>
          <IoHome className="text-light " />
        </NavLink>
        <NavLink to={"/dashboard/users"}>Users</NavLink>
        <NavLink to={"/dashboard/songs"}>Song</NavLink>
        <NavLink to={"/dashboard/albums"}>Album</NavLink>
        <NavLink to={"/dashboard/artists"}>Artist</NavLink>
      </div>

      <div className="w-100 my-3 p-3">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/users" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/artists" element={<DashboardArtists />} />
          <Route path="/newSong" element={<DashboardHome />} />
        </Routes>
      </div>

      <footer>
        <Playing />
      </footer>
    </div>
  );
};

export default Dashboard;
