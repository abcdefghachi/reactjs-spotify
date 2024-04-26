import React, { useState, useEffect } from "react";
import { IoTrash } from "react-icons/io5";
import "../../styles/ArtistCard.css";
import "../../styles/NavBar.css";
import { deleteObject as deleteStorageObject, ref } from "firebase/storage";
import {
  deleteAlbumById,
  deleteArtistById,
  deleteSongById,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../../api";
import { useStateValue } from "../../context/stateProvider";
import { actionType } from "../../context/reducer";
import { storage } from "../../config/firebase.config";
import { motion } from "framer-motion";
import { FaPen } from "react-icons/fa";

const ArtistCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [{ alertType }, dispatch] = useStateValue();
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getAllAlbums().then((data) => {
      setAlbums(data.album);
    });
    getAllArtists().then((data) => {
      setArtists(data.artist);
    });
  }, []);

  const deleteItem = (itemData) => {
    if (type === "album") {
      deleteAlbumById(itemData._id).then((res) => {
        if (res.data) {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });
          setTimeout(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 3000);
          setAlbums(albums.filter((album) => album._id !== itemData._id));
        } else {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
          setTimeout(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 3000);
        }
      });
    }

    if (type === "artist") {
      deleteArtistById(itemData._id).then((res) => {
        if (res.data) {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });
          setTimeout(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 3000);
          setArtists(artists.filter((artist) => artist._id !== itemData._id));
        } else {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
          setTimeout(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 3000);
        }
      });
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card-wrap d-flex gap-2"
    >
      <div className="card">
        <img src={data.imageURL} alt="" className="cardImage" />

        <p className="cardContent">{data.name}</p>

        <p className="sub-text-small">
          {data.description && data.description.length > 20
            ? data.description.slice(0, 45) + "..."
            : data.description || ""}
        </p>

        <div
          className="delete-icon bg-danger"
          onClick={() => setIsDelete(true)}
        >
          <IoTrash className="m-auto" />
        </div>
        <div className="update-icon">
          <FaPen className="m-auto" />
        </div>
        {isDelete && (
          <div
            className="position-absolute d-flex flex-column justify-content-center align-items-center px-4 py-2 rounded-2"
            style={{
              top: "40%",
              left: "5%",
              backgroundColor: "#323232",
              width: "90%",
            }}
          >
            <p className="font-semibold text-center">Are you sure ?</p>

            <div className="d-flex align-items-center gap-3">
              <button
                className="border-0 px-2 rounded-2 bg-danger"
                onClick={() => {
                  deleteItem(data);
                  setIsDelete(false);
                }}
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
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ArtistCard;
