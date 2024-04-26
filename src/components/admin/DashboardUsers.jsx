import React, { useEffect, useState } from "react";
import { Button, NavLink } from "react-bootstrap";
import { useStateValue } from "../../context/stateProvider";
import { changingUserRole, getAllUsers, removeUser } from "../../api";
import { actionType } from "../../context/reducer";
import "./../../styles/DashboardUsers.css";
import "./../../styles/NavBar.css";

import moment from "moment";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { FaRegUserCircle, FaSearch, FaStar } from "react-icons/fa";
import NavBar from "../home/NavBar";
import Main from "../home/Main";

const DashboardUsers = () => {
  const [{ allUsers, user }, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.user,
        });
      });
    } else {
      setFilteredUsers(allUsers);
    }
  }, [allUsers, user]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(
        (user) =>
          user.name && user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      <div className="w-100 vh-200 d-flex flex-column align-items-center ">
        {/* <div className="d-flex justify-content-start">
          <NavLink to={"/dashboard/users"}>Users</NavLink>
          <NavLink to={"/dashboard/songs"}>Song</NavLink>
          <NavLink to={"/dashboard/albums"}>Album</NavLink>
          <NavLink to={"/dashboard/artists"}>Artist</NavLink>
        </div> */}

        <div
          className="position-relative w-100 d-flex flex-column justify-content-start align-items-center rounded-2 py-2  "
          style={{
            minHeight: "400px",
            overflowY: "scroll",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none",
          }}
        >
          <div className="position-relative w-100 my-3 p-3 d-flex align-items-center">
            <p className="fw-bold my-auto mx-2">
              <span>Total : </span>
              {allUsers ? allUsers.length : 0}
            </p>
            <div className="search-bar bg-white d-flex align-items-center rounded-pill mt-0 ms-3">
              <FaSearch className="text-dark" />
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div
            className="w-100 d-flex justify-content-between align-items-center fw-semibold "
            style={{ minWidth: "750px", color: "#e5e5e5" }}
          >
            <p className="text-center" style={{ width: "45px" }}></p>
            <p className="text-center" style={{ width: "85px" }}>
              Image
            </p>
            <p
              className="text-center"
              style={{ width: "275px", minWidth: "160px" }}
            >
              Name
            </p>
            <p
              className="text-center"
              style={{ width: "275px", minWidth: "160px" }}
            >
              Email
            </p>
            <p
              className="text-center"
              style={{ width: "275px", minWidth: "160px" }}
            >
              Create At
            </p>
            <p
              className="text-center"
              style={{ width: "275px", minWidth: "160px" }}
            >
              Role
            </p>
          </div>

          {filteredUsers.length === 0 ? (
            <p
              style={{
                color: "#e5e5e5",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Không có dữ liệu nào trùng khớp
            </p>
          ) : (
            filteredUsers
              .sort((a, b) => {
                // Move the user to the beginning if data._id === user?.user._id
                if (a._id === user?.user._id) return -1;
                if (b._id === user?.user._id) return 1;
                return 0;
              })
              .map((data, index) => (
                <DashboardUserCard key={index} data={data} index={index} />
              ))
          )}
        </div>
      </div>
    </>
  );
};

export const DashboardUserCard = ({ data, index }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format("MMM Do YYYY");

  const updateUserRole = (userId, role) => {
    setIsUserRoleUpdated(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.user,
          });
        });
      }
    });
  };

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.user,
          });
        });
      }
    });
  };

  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      key={index}
      className="user-info-card position-relative w-100 vh-200 rounded-2 d-flex align-items-center justify-content-between py-2 mx-3"
      style={{ cursor: "pointer", color: "#e5e5e5" }}
    >
      {data._id !== user?.user._id && (
        <div
          className="btn-delete postition-absolute rounded-2 d-flex align-items-center justify-content-center p-2 m-2 "
          style={{ height: "8%", left: "4%" }}
          onClick={() => deleteUser(data._id)}
        >
          <MdDelete className="text-danger" />
        </div>
      )}
      {data._id === user?.user._id && (
        <div
          className="btn-delete postition-absolute rounded-2 d-flex align-items-center justify-content-center p-2 m-2 "
          style={{ height: "8%", left: "4%" }}
          onClick={() => deleteUser(data._id)}
        >
          <FaStar style={{ color: "yellow" }} />
        </div>
      )}

      <div
        className="d-flex align-items-center justify-content-center "
        style={{ minWidth: " 45px", width: "85px" }}
      >
        {data.imageURL ? (
          <img
            src={data.imageURL}
            alt=""
            className="rounded-pill"
            style={{ width: "50px" }}
          />
        ) : (
          <FaRegUserCircle style={{ width: "40px", height: "40px" }} />
        )}
      </div>

      {/* user info */}
      <p className="text-center" style={{ width: "275px", minWidth: "160px" }}>
        {data.name ? data.name : data._id}
      </p>

      <p className="text-center " style={{ width: "275px", minWidth: "160px" }}>
        {data.email}
      </p>
      <p className="text-center " style={{ width: "275px", minWidth: "160px" }}>
        {createdAt}
      </p>
      <div
        className="text-center pt-2 position-relative gap-2 d-flex align-items-center justify-content-center"
        style={{ width: "275px", minWidth: "160px" }}
      >
        <p className="text-center">{data.role}</p>
        {data._id !== user?.user._id && (
          <p
            className="fw-semibold px-1 text-dark rounded-2"
            style={{ backgroundColor: "#32CD32" }}
            onClick={() => setIsUserRoleUpdated(true)}
          >
            {data.role === "admin" ? "Member" : "Admin"}
          </p>
        )}

        {isUserRoleUpdated && (
          <div
            className="position-absolute p-3 d-flex flex-column align-items-center justify-content-center rounded-2"
            style={{
              zIndex: "3",
              top: "80%",
              right: "25%",
              backgroundColor: "#7f7f7f",
            }}
          >
            <p>
              Are you sure you want to mark this user as{" "}
              <span className="fw-semibold">
                {data.role === "admin" ? "Member" : "Admin"}
              </span>{" "}
              ?
            </p>
            <div className="d-flex align-items-center gap-2">
              <Button
                className="btn-admin text-sm px-3 rounded-md"
                style={{
                  backgroundColor: "#e5e5e5",
                  color: "black",
                  border: "none",
                  outline: "none",
                }}
                onClick={() =>
                  updateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  )
                }
              >
                Yes
              </Button>
              <Button
                className="btn-admin text-sm rounded-md"
                style={{
                  backgroundColor: "#e5e5e5",
                  color: "black",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setIsUserRoleUpdated(false)}
              >
                <span>No</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardUsers;
