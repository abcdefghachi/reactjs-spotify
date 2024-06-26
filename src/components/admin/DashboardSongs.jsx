import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../context/stateProvider";
import { getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";
import SongCard from "./SongCard";
import { motion } from "framer-motion";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [{ allSongs }, dispatch] = useStateValue();
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    } else {
      setFilteredSongs(allSongs);
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSongFilter(value);

    if (value === "") {
      setFilteredSongs(allSongs);
    } else {
      const filtered = allSongs.filter((song) =>
        song.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  };

  return (
    <div className="w-100 vh-200 d-flex flex-column mx-3">
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
          <input
            type="text"
            placeholder="Search here"
            value={songFilter}
            onChange={handleSearch}
          />
        </div>
      </div>
      {filteredSongs.length === 0 ? (
        <div className="text-center text-light">
          Không có kết quả trùng khớp
        </div>
      ) : (
        <SongContainer data={filteredSongs} />
      )}
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <>
      <div className="w-100 flex flex-wrap gap-2 justify-content-evenly align-items-center">
        {data &&
          data.map((song, i) => (
            <SongCard key={song._id} data={song} index={i} type="song" />
          ))}
      </div>
    </>
  );
};

export default DashboardSongs;
