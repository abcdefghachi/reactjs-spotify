import React from "react";
import "./../../styles/NavBar.css";
import { IoHome } from "react-icons/io5";
import { IoIosMusicalNote } from "react-icons/io";
import { NavLink } from "react-router-dom"; // Import NavLink
import { FaStar } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="logo">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
          alt=""
          style={{ maxWidth: "150px" }}
          className="my-3 ms-2"
        />
      </div>
      <ul>
        <li className="active">
          <IoHome />
          <NavLink to={"/"} className="ms-3 mt-1">
            Home
          </NavLink>
        </li>
        <li>
          <IoIosMusicalNote />
          <div className="ms-3 mt-1">
            <NavLink to={"/musics"}>Musics</NavLink>
          </div>
        </li>
        <li>
          <FaStar />
          <div className="ms-3 mt-1">
            <NavLink to={"/premium"}>Premium</NavLink>
          </div>
        </li>
      </ul>

      <div className="cookies">
        <span>Cookies</span>
        <span>Privacy</span>
      </div>
    </div>
  );
};

export default NavBar;
