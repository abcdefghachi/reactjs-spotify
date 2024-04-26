import React, { useEffect } from "react";
import NavBar from "../home/NavBar";
import Header from "../home/Header";
import { useStateValue } from "../../context/stateProvider";
import MusicPlayer from "../MusicPlayer";
import Alert from "../admin/Alert";
import "../../styles/NavBar.css";
import "../../styles/Favorites.css";
import { FaPlay } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import { getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";
import { motion } from "framer-motion";

const Favorites = () => {
  const [
    { allArtists, allSongs, allAlbums, isSongPlaying, songIndex, alertType },
    dispatch,
  ] = useStateValue();
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
    <div className="outerWrap">
      <div className="app">
        <NavBar />
        <div className="main" style={{ marginTop: "10px" }}>
          <Header />
          {/* <h3 className="ms-3 mt-0">My Favorites</h3> */}

          <div className="playlist-page">
            <div className="main-inner">
              <div className="playlist-page-info mx-3">
                <div className="playlist-page-image">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/reactjs-spotify.appspot.com/o/image%2Fcover_2.jpg?alt=media&token=5ce02fed-984d-4a4d-9527-198dcb79f677"
                    alt=""
                  />
                </div>
                <div className="playlist-page-content">
                  <p className="small-textBold">Playlist</p>
                  <h1>Title</h1>

                  <p className="small-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus ad, quis necessitatibus facilis commodi
                    expedita. Obcaecati in laborum repellat saepe!
                  </p>
                  <div className="playlist-page-desc d-flex gap-4 align-items-center">
                    <span>Spotify</span>
                    <span className="small-text">Likes</span>
                    <span className="small-text">Hours</span>
                  </div>
                </div>
              </div>
              <div className="playlist-song">
                <div className="icons d-flex align-items-center gap-5 ms-5">
                  <div
                    style={{
                      width: "40px",
                      height: " 40px",
                      borderRadius: "50px",
                      background: "#1db954",
                      paddingLeft: "15px",
                      paddingTop: "8px",
                    }}
                  >
                    <FaPlay />
                  </div>
                  <div className="heart-icon">
                    <CiHeart
                      style={{
                        fontSize: "40px",
                      }}
                    />
                  </div>
                  <div className="dots-icon">
                    <CiMenuKebab
                      style={{
                        fontSize: "30px",
                      }}
                    />
                  </div>
                </div>
                <div className="main-content">
                  <div className=" d-flex flex-wrap gap-2 w-100">
                    {allSongs &&
                      allSongs.map((song, index) => (
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
                          <p className="col-2">{song.category}</p>
                          <p className="col-2">
                            {formatDuration(song.songURL.length)}
                          </p>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {alertType && <Alert type={alertType} />}
      </div>
      <div className="music-controls">{/* <MusicPlayer /> */}</div>
    </div>
  );
};

export default Favorites;
