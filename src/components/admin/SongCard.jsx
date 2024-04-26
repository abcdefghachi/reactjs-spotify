import React, { useState } from "react";
import "../../styles/SongCard.css";
import { IoTrash } from "react-icons/io5";
import { deleteObject as deleteStorageObject, ref } from "firebase/storage";
import { deleteSongById, getAllSongs } from "../../api";
import { useStateValue } from "../../context/stateProvider";
import { actionType } from "../../context/reducer";
import { storage } from "../../config/firebase.config";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [
    { alertType, allSongs, allArtists, allAlbums, isSongPlaying, songIndex },
    dispatch,
  ] = useStateValue();

  const deleteSong = (songData) => {
    if (type === "song") {
      const deleteRef = ref(storage, songData.imageURL);

      // Delete the song's image from Firebase Storage
      deleteStorageObject(deleteRef)
        .then(() => {
          // Once image deletion is successful, delete the song data
          deleteSongById(songData._id).then((res) => {
            if (res && res.data) {
              dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "success",
              });
              setTimeout(() => {
                dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
              }, 3000);

              // Update the songs list after deletion
              getAllSongs().then((data) => {
                dispatch({
                  type: actionType.SET_ALL_SONGS,
                  allSongs: data.song,
                });
              });
            } else {
              dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "danger",
              });
              setTimeout(() => {
                dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
              }, 3000);
            }
          });
        })
        .catch((error) => {
          // Handle errors
          console.error("Error deleting song image:", error);
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 3000);
        });
    }
  };

  const addToContext = () => {
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
    <div className="">
      <motion.div
        whileTap={{ scale: 0.8 }}
        initial={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className=" position-relative songcard mx-3 my-2 p-2 row"
        onClick={type === "song" && addToContext}
      >
        <img src={data.imageURL} alt="" className="col-1" />
        <span className="play-song-icon" style={{ left: "2.6rem" }}>
          <FaPlay className="m-auto" />
        </span>
        <div className="song-info text-light col-3 d-flex justify-content-between flex-column">
          <p className="fw-bold">{data.name}</p>
          <p style={{ color: "#aaa" }}>{data.artist}</p>
        </div>

        <p className="col-3">{data.album}</p>
        <p className="col-2">{data.category}</p>
        <p className="col-1">{formatDuration(data.songURL.length)}</p>
        <div className="text-danger col-2" onClick={() => setIsDelete(true)}>
          <IoTrash />
        </div>
      </motion.div>
      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="position-relative d-flex flex-column justify-content-center align-items-center px-4 py-2 w-25 rounded-2"
          style={{
            top: "50%",
            bottom: "50%",
            left: "42%",
            backgroundColor: "#323232",
          }}
        >
          <p className="font-semibold text-center">Are you sure ?</p>

          <div className="d-flex align-items-center gap-3">
            <button
              className="border-0 px-2 rounded-2 bg-danger"
              onClick={() => deleteSong(data)}
            >
              Yes
            </button>
            <button
              className="border-0 px-2 rounded-2 bg-success"
              onClick={() => setIsDelete(false)}
            >
              No
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SongCard;
