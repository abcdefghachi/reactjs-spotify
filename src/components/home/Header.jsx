import React, { useEffect, useState } from "react";
import "../../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCrown, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useStateValue } from "../../context/stateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebase.config";
import { getAllUsers } from "../../api";
import { actionType } from "../../context/reducer";

function Header() {
  const [{ user, allUsers }, dispatch] = useStateValue();
  const [isMenu, setMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.Set_U,
          allUsers: data.user,
        });
      });
    }
  }, [allUsers, user]);

  return (
    <header
      className="position-fixed d-flex align-items-center py-2 px-4 py-md-2 px-md-6 bg-black"
      style={{ top: "0", zIndex: "2", width: "87%" }}
    >
      <ul className="menu d-flex justify-content-center align-items-center list-unstyled mb-0">
        {/* <li className="mx-3 pt-3 fs-5" style={{ textDecoration: "none" }}>
          <NavLink to={"/"} style={{ color: "#e5e5e5" }}>
            Home
          </NavLink>
        </li>
        <li className="mx-3 pt-3 fs-5">
          <NavLink to={"/musics"} style={{ color: "#e5e5e5" }}>
            Musics
          </NavLink>
        </li>
        <li className="mx-3 pt-3 fs-5">
          <NavLink to={"/musics"} style={{ color: "#e5e5e5" }}>
            PostCard
          </NavLink>
        </li> */}

        {/* <div className="search-bar bg-white d-flex align-items-center rounded-pill">
          <FaSearch className="text-dark" />
          <input
            type="text"
            placeholder="Artists , songs, musics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
        <div className="d-flex align-items-center gap-4 fs-4 ">
          <FaChevronCircleLeft
            style={{ color: "aaa", cursor: "pointer" }}
            className="change-page"
          />
          <FaChevronCircleRight
            style={{ color: "aaa", cursor: "pointer" }}
            className="change-page"
          />
        </div>
      </ul>
      <div
        className="rounded-pill d-flex align-items-center ms-auto gap-2 position-relative me-2"
        style={{ color: "#e5e5e5" }}
        onMouseEnter={() => setMenu(true)}
        onMouseLeave={() => setMenu(false)}
      >
        <img
          src={user?.user?.imageURL || "default-image-url"}
          alt=""
          className="rounded-pill"
          style={{ width: "50px" }}
        />
        {!user?.user?.imageURL && (
          <FaRegUserCircle style={{ width: "30px", height: "30px" }} />
        )}
        <div className="d-flex flex-column align-items-start pt-1">
          <p className="fw-bold fs-6 mb-0">{user?.user?.email}</p>
          <p className="fs-6">
            Premium Member
            <FaCrown className="text-warning ms-2" />{" "}
          </p>
        </div>

        {isMenu && (
          <div className="profile p-2 d-flex flex-column align-items-start">
            <NavLink to={"/userProfile"}>
              <p>Profile</p>
            </NavLink>
            <NavLink to={"/myFavorites"}>
              <p>My Favorites</p>
            </NavLink>
            {user?.user?.role === "admin" && (
              <NavLink to={"/dashboard/users"}>
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
