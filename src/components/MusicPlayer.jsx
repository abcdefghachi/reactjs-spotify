import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/stateProvider";
import { RiPlayListFill } from "react-icons/ri";
import { motion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { IoClose, IoMusicalNote } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import "./../styles/MusicPlayer.css";

const MusicPlayer = () => {
  const [{ allSongs, songIndex, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();

  const [isPlaylist, setIsPlaylist] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setIsPlaying(true);
  }, [allSongs, songIndex]);

  const nextTrack = () => {
    if (allSongs && allSongs.length > 0) {
      if (songIndex >= allSongs.length - 1) {
        dispatch({
          type: actionType.SET_SONG_INDEX,
          songIndex: 0,
        });
      } else {
        dispatch({
          type: actionType.SET_SONG_INDEX,
          songIndex: songIndex + 1,
        });
      }
    }
  };

  const previousTrack = () => {
    if (allSongs && allSongs.length > 0) {
      if (songIndex === 0) {
        dispatch({
          type: actionType.SET_SONG_INDEX,
          songIndex: allSongs.length - 1,
        });
      } else {
        dispatch({
          type: actionType.SET_SONG_INDEX,
          songIndex: songIndex - 1,
        });
      }
    }
  };

  const closePlayer = () => {
    dispatch({
      type: actionType.SET_IS_SONG_PLAYING,
      isSongPlaying: false,
    });
  };

  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center gap-2"
      style={{ height: "90px" }}
    >
      <div className="w-100 d-flex align-items-center  position-relative gap-2">
        {allSongs &&
          allSongs.length > 0 && ( // Check if allSongs is not null or empty
            <>
              <img
                src={allSongs[songIndex]?.imageURL}
                alt=""
                className="object-fit-cover rounded-2 ms-2"
                style={{ width: "5%", height: "8%" }}
              />

              <div className="d-flex align-items-start flex-column ">
                <p className="fw-semibold">
                  {`${
                    allSongs[songIndex]?.name.length > 20
                      ? allSongs[songIndex]?.name.slice(0, 20)
                      : allSongs[songIndex]?.name
                  }`}
                  <span>({allSongs[songIndex]?.album})</span>
                </p>
                <p style={{ fontSize: "14px", margin: "-5px 2px -1px" }}>
                  {allSongs[songIndex]?.artist}
                </p>

                <div className="d-flex align-items-center gap-2">
                  <motion.i
                    // whileTap={{ scale: 0.8 }}
                    onClick={() => setIsPlaylist(!isPlaylist)}
                  >
                    <RiPlayListFill className="fs-5" />
                  </motion.i>
                  <CiHeart className="fs-4" />
                </div>
              </div>

              <div className="d-flex flex-grow-1">
                <AudioPlayer
                  style={{ background: "#323232", color: "#7c7c7c" }}
                  src={allSongs[songIndex]?.songURL}
                  autoPlay={isPlaying}
                  showSkipControls={true}
                  onClickNext={nextTrack}
                  onClickPrevious={previousTrack}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
              {isPlaylist && (
                <div>
                  <PlaylistCard />
                </div>
              )}
            </>
          )}

        {/* <IoClose
          onClick={closePlayer}
          className="position-absolute rounded-pill"
          style={{ top: "8%", right: "1%", backgroundColor: "#aaa" }}
        /> */}
      </div>
    </div>
  );
};

export const PlaylistCard = () => {
  const [{ allSongs, songIndex, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();

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

  const setCurrentPlaySong = (index) => {
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

  return (
    <div
      className=" position-absolute gap-2 py-2 d-flex flex-column overflow-y-scroll rounded-1 "
      style={{
        left: "1%",
        bottom: "28%",
        zIndex: "2",
        width: "350px",
        maxWidth: "350px",
        height: "510px",
        maxHeight: "510px",
        backgroundColor: "#323232",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none",
      }}
    >
      {allSongs && allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="w-100 h-100 p-3 d-flex gap-2 align-items-center bg-transparent music-card"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote style={{ cursor: "pointer" }} />

            <div className="d-flex align-items-start flex-column ">
              <p className="fw-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}
                <span>({music?.album})</span>
              </p>
              <p style={{ fontSize: "14px", margin: "-5px 2px -1px" }}>
                {music?.artist}
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <p>No songs available</p>
      )}
    </div>
  );
};

export default MusicPlayer;
