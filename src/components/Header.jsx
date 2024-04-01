import { hover } from "@testing-library/user-event/dist/hover";
import React, { useState } from "react";
import "./../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCrown, FaSearch } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
function Header() {
  const [{ user }, dispath] = useStateValue();
  const [isMenu, setMenu] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };
  return (
    <header className="d-flex align-items-center w-100 py-2 px-4 py-md-2 px-md-6">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt=""
        style={{ width: "180px" }}
      />

      <ul className="menu d-flex justify-content-center align-items-center list-unstyled">
        <li className="mx-3 pt-3 fs-5" style={{ textDecoration: "none" }}>
          <NavLink to={"/home"} style={{ color: "#e5e5e5" }}>
            Home
          </NavLink>
        </li>
        <li className="mx-3 pt-3 fs-5">
          <NavLink to={"/musics"} style={{ color: "#e5e5e5" }}>
            Musics
          </NavLink>
        </li>
        <li className="mx-3 pt-3 fs-5">
          <NavLink to={"/premium"} style={{ color: "#e5e5e5" }}>
            Premium
          </NavLink>
        </li>
        <div className="search-bar bg-white d-flex align-items-center rounded-pill">
          <FaSearch className="text-dark" />
          <input type="text" placeholder="Artists , songs, musics" />
        </div>
      </ul>
      <div
        className="btn rounded-pill d-flex align-items-center ms-auto gap-2 position-relative"
        style={{ color: "#e5e5e5" }}
        onMouseEnter={() => setMenu(true)}
        onMouseLeave={() => setMenu(false)}
      >
        <img
          src={user?.user?.imageURL}
          alt=""
          className="rounded-pill"
          style={{ width: "50px" }}
        />
        <div className="d-flex flex-column align-items-start pt-1">
          <p className="fw-bold fs-5 mb-0">{user?.user?.name}</p>
          <p>
            Premium Member
            <FaCrown className="text-warning ms-2" />{" "}
          </p>
        </div>

        {isMenu && (
          <div className="profile p-3 d-flex flex-column align-items-start">
            <NavLink to={"/userProfile"}>
              <p>Profile</p>
            </NavLink>
            <NavLink to={"/myFavorites"}>
              <p>My Favorites</p>
            </NavLink>
            {user?.user?.role === "admin" && (
              <NavLink to={"/dashboard"}>
                <p>Dashboard</p>
              </NavLink>
            )}
            <NavLink>
              <p onClick={logOut}>Sign out</p>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
