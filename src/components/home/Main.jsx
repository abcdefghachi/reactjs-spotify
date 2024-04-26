import React, { useEffect, useState } from "react";
import "../../styles/NavBar.css";
import "../../styles/SongCard.css";
import { getAllAlbums, getAllArtists, getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/stateProvider";
import Header from "./Header";
import { FaChevronRight, FaPlay, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { Route, Routes } from "react-router-dom/dist";
import { CiHeart } from "react-icons/ci";

const Main = () => {
  const [
    { allArtists, allSongs, allAlbums, isSongPlaying, songIndex },
    dispatch,
  ] = useStateValue();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);

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

  const filterResults = (list, searchTerm) => {
    return list.filter((item) => {
      const nameIncludes = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (item.artist) {
        const artistIncludes = item.artist
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const albumIncludes = item.album
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return nameIncludes || artistIncludes || albumIncludes;
      }
      return nameIncludes;
    });
  };

  const filteredArtists = filterResults(allArtists || [], searchTerm);
  const filteredAlbums = filterResults(allAlbums || [], searchTerm);
  const filteredSongs = filterResults(allSongs || [], searchTerm);

  const addToContext = (song, index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="main">
      <Header />
      <div className="search-bar bg-white d-flex align-items-center rounded-pill mt-5 ms-3">
        <FaSearch className="text-dark" />
        <input
          type="text"
          placeholder="Artists , songs, musics"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100"
        />
      </div>
      {/* Album */}
      {filteredAlbums.length > 0 && (
        <div className="main-content">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">Albums</h1>
            <div className="text-uppercase d-flex align-items-center gap-2">
              <div>See more</div>
              <FaChevronRight
                className="rounded-pill "
                style={{ backgroundColor: "#282828" }}
              />
            </div>
          </div>
          <div className="card-wrap d-flex gap-2">
            {filteredAlbums.map((album) => (
              <div className="card" key={album._id}>
                <img className="cardImage" src={album.imageURL} />
                <h5 className="cardContent">{album.name}</h5>
                <span className="play-icon">
                  <FaPlay className="m-auto" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Artist */}
      {filteredArtists.length > 0 && (
        <div className="main-content">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">Artists</h1>
            <div className="text-uppercase d-flex align-items-center gap-2">
              <div>See more</div>
              <FaChevronRight
                className="rounded-pill "
                style={{ backgroundColor: "#282828" }}
              />
            </div>
          </div>
          <div className="card-wrap d-flex gap-2">
            {filteredArtists.slice(0, 5).map((artist) => (
              <div className="card" key={artist._id}>
                <img
                  className="cardImage"
                  src={artist.imageURL}
                  alt={artist.name}
                />
                <h5 className="cardContent">{artist.name}</h5>
                <p className="sub-text-small">
                  {artist.description && artist.description.length > 20
                    ? artist.description.slice(0, 45) + "..."
                    : artist.description || ""}
                </p>

                <span className="play-icon">
                  <FaPlay className="m-auto" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Song */}
      {filteredSongs.length > 0 && (
        <div className="main-content">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">Songs</h1>
            <div className="text-uppercase d-flex align-items-center gap-2">
              <div>See more</div>
              <FaChevronRight
                className="rounded-pill "
                style={{ backgroundColor: "#282828" }}
              />
            </div>
          </div>
          <div className="sub-text">What's your taste ?</div>
          <div className=" d-flex flex-wrap gap-2 w-100">
            {filteredSongs.map((song, index) => (
              <motion.div
                key={song._id}
                whileTap={{ scale: 0.8 }}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3 }}
                className="position-relative songcard mx-3 my-2 p-2 d-flex align-items-center"
                onClick={() => addToContext(song, index)}
              >
                <img
                  src={song.imageURL}
                  style={{ width: "80px", height: "80px" }}
                  alt=""
                  className="col-1 rounded-2 me-2"
                />
                <span className="play-song-icon">
                  <FaPlay className="m-auto" />
                </span>
                <div className="song-info text-light col-5 d-flex justify-content-between flex-column">
                  <p className="fw-bold ">{song.name}</p>
                  <p style={{ color: "#aaa" }}>{song.artist}</p>
                </div>
                <p className="col-2">{song.album}</p>
                <p className="col-1">{song.category}</p>
                <p className="col-2">{formatDuration(song.songURL.length)}</p>
                <p className="col-1">
                  <CiHeart className="fs-4" />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* <Routes>
        <Route path="/users" element={<DashboardUsers />} />
        <Route path="/songs" element={<DashboardSongs />} />
        <Route path="/albums" element={<DashboardAlbums />} />
        <Route path="/artists" element={<DashboardArtists />} />
        <Route path="/newSong" element={<DashboardNewSong />} />
      </Routes> */}
    </div>
  );
};

export default Main;
