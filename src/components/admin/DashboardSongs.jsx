import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";
import SongCard from "../SongCard";
import Playing from "../Playing";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column mx-3">
      {/* <div className="w-100 d-flex justify-content-start align-items-center">
        <i>
          <AiOutlineClear className="text-light fs-4 fw-300" />
        </i> 
      </div> */}
      <div className="position-relative w-100 my-3 p-3 d-flex align-items-center">
        <NavLink to={"/dashboard/newSong"} className="text-light ms-3">
          <IoAdd />
        </NavLink>
        <p className="fw-bold my-auto mx-2">
          <span>Total : </span>
          {allSongs ? allSongs.length : 0}
        </p>
        <div className="search-bar bg-white d-flex align-items-center rounded-pill mt-0 ms-3">
          <FaSearch className="text-dark" />
          <input type="text" placeholder="Search here" />
        </div>
      </div>
      <SongContainer data={allSongs} />
    </div>
  );
};
export const SongContainer = ({ data }) => {
  return (
    <>
      <div className="w-100 flex flex-wrap gap-2 justify-content-evenly align-items-center">
        {data &&
          data.map((song, i) => (
            <SongCard key={song._id} data={song} index={i} />
          ))}
      </div>
      <footer>
        <Playing />
      </footer>
    </>
  );
};

export default DashboardSongs;
