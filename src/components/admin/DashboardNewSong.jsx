import React, { useEffect, useState } from "react";
import { storage } from "../../config/firebase.config";
import { useStateValue } from "../../context/stateProvider";
import FilterButtons from "./Filterbuttons";
import { filterByLanguage, filters } from "../../utils/supportFunctions";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../../api";
import { actionType } from "../../context/reducer";
import { MdDelete, MdOutlineFileUpload } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [songImageCover, setSongImageCover] = useState(null);
  const [imgageUploadProgress, setImageUploadProgress] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistLoading, setIsArtistLoading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumLoading, setIsAlbumLoading] = useState(false);
  const [albumName, setAlbumName] = useState(null);

  const [
    {
      allArtists,
      allSongs,
      allAlbums,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
      alertType,
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist,
        });
      });
    }
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      // setSongImageCover(null);
      setIsAudioLoading(true);
      setIsAlbumLoading(true);
      setIsArtistLoading(true);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null);
      setIsImageLoading(false);
      setAudioImageCover(null);
      setIsAudioLoading(false);
      setIsAlbumLoading(false);
      setAlbumImageCover(null);
      setIsArtistLoading(false);
      setArtistImageCover(false);
    });

    dispatch({
      type: actionType.SET_ALERT_TYPE,
      alertType: "success",
    });

    setInterval(() => {
      dispatch(
        {
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        },
        4000
      );
    });
  };
  const saveSong = () => {
    if (!songImageCover || !audioImageCover) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          4000
        );
      });
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: songName,
        imageURL: songImageCover,
        songURL: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      saveNewSong(data).then((res) => {
        getAllSongs().then((songs) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.song,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          4000
        );
      });

      setSongName(null);
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setSongImageCover(null);
      setAudioImageCover(null);
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      // Alert message
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          4000
        );
      });
    } else {
      setIsArtistLoading(true);
      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: twitter,
        instagram: instagram,
      };
      saveNewArtist(data).then((res) => {
        getAllArtists().then((artists) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: artists.artist,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          4000
        );
      });
      setIsArtistLoading(false);
      setArtistImageCover(null);
      setSongName("");
      setTwitter("");
      setInstagram("");
    }
  };

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          4000
        );
      });
    } else {
      setIsAlbumLoading(true);
      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };

      saveNewAlbum(data).then((res) => {
        getAllAlbums().then((albums) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: albums.album,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          4000
        );
      });

      setIsAlbumLoading(false);
      setAlbumImageCover(null);
      setAlbumName("");
    }
  };
  return (
    <motion.div className="d-flex flex-column justify-content-center align-items-center p-4 w-100">
      <input
        type="text"
        placeholder="Type your song name..."
        className="w-100 p-2 rounded-2 text-light"
        style={{ backgroundColor: "#323232", outline: "none" }}
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div
        className="d-flex w-100 justify-content-between align-items-center flex-wrap gap-2 my-2
      "
      >
        <FilterButtons filterData={allArtists} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Album"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>
      {/*Song Image upload */}
      <div
        className="upload-box rounded-2 w-100"
        style={{
          height: "50vh",
          border: "2px solid #8b8989",
          backgroundColor: "#323232",
          cursor: "pointer",
        }}
      >
        {isImageLoading && <FileLoader progress={imgageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUpLoader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className="position-relative w-100 h-100 overflow-hidden rounded-3">
                <img
                  src={songImageCover}
                  className="w-100 h-100 object-fit-cover"
                  alt=""
                />
                <button
                  className="btn position-absolute rounded-circle border-0 bg-danger text-light fs-5"
                  style={{
                    bottom: "3%",
                    right: "3%",
                    outline: "none",
                    transition: "ease-in-out",
                    border: "none",
                    paddingBottom: "10px",
                  }}
                  onClick={() => deleteFileObject(songImageCover, true)}
                >
                  <MdDelete className="text-light" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio file Uploading */}
      <div
        className="upload-box rounded-2 my-3 w-100"
        style={{
          height: "50vh",
          border: "2px solid #8b8989",
          backgroundColor: "#323232",
          cursor: "pointer",
        }}
      >
        {isAudioLoading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUpLoader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadingProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="position-relative w-100 h-100 overflow-hidden rounded-3 d-flex align-items-center justify-content-center">
                <audio src={audioImageCover} controls></audio>
                <button
                  className="btn position-absolute rounded-circle border-0 bg-danger text-light fs-5"
                  style={{
                    bottom: "3%",
                    right: "3%",
                    outline: "none",
                    transition: "ease-in-out",
                    border: "none",
                    paddingBottom: "10px",
                  }}
                  onClick={() => deleteFileObject(audioImageCover, false)}
                >
                  <MdDelete className="text-light" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Save song button */}
      <div
        className="d-flex align-items-center justify-content-center p-4"
        style={{ width: "60%" }}
      >
        {isImageLoading || isAudioLoading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="btn px-4 text-light fw-semibold px-4"
            style={{ backgroundColor: "#4CBB17" }}
            onClick={saveSong}
          >
            Save
          </motion.div>
        )}
      </div>

      {/* Upload artist */}
      <p className="fw-semibold fs-5">Artist Details</p>
      <div
        className="upload-box rounded-2 w-100 my-2"
        style={{
          height: "50vh",
          border: "2px solid #8b8989",
          backgroundColor: "#323232",
          cursor: "pointer",
        }}
      >
        {isArtistLoading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistLoading && (
          <>
            {!artistImageCover ? (
              <FileUpLoader
                updateState={setArtistImageCover}
                setProgress={setAlbumUploadingProgress}
                isLoading={setIsArtistLoading}
                isImage={true}
              />
            ) : (
              <div className="position-relative w-100 h-100 overflow-hidden rounded-3">
                <img
                  src={artistImageCover}
                  className="w-100 h-100 object-fit-cover"
                  alt=""
                />
                <button
                  className="btn position-absolute rounded-circle border-0 bg-danger text-light fs-5"
                  style={{
                    bottom: "3%",
                    right: "3%",
                    outline: "none",
                    transition: "ease-in-out",
                    border: "none",
                    paddingBottom: "10px",
                  }}
                  onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className="text-light" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Artist name */}
      <input
        type="text"
        placeholder="Type your artist name..."
        className="w-100 p-2 my-2 rounded-2 text-light"
        style={{ backgroundColor: "#323232", outline: "none" }}
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Type artist twitter..."
        className="w-100 p-2 my-2 rounded-2 text-light"
        style={{ backgroundColor: "#323232", outline: "none" }}
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
      />

      <input
        type="text"
        placeholder="Type artist instagram..."
        className="w-100 p-2 my-2 rounded-2 text-light"
        style={{ backgroundColor: "#323232", outline: "none" }}
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />
      {/* Save artist button */}
      <div
        className="d-flex align-items-center justify-content-center p-4"
        style={{ width: "60%" }}
      >
        {isArtistLoading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="btn px-4 text-light fw-semibold px-4"
            style={{ backgroundColor: "#4CBB17" }}
            onClick={saveArtist}
          >
            Save
          </motion.div>
        )}
      </div>

      {/* Album */}
      <p className="fw-semibold fs-5">Album Details</p>
      <div
        className="upload-box rounded-2 w-100"
        style={{
          height: "50vh",
          border: "2px solid #8b8989",
          backgroundColor: "#323232",
          cursor: "pointer",
        }}
      >
        {isAlbumLoading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumLoading && (
          <>
            {!albumImageCover ? (
              <FileUpLoader
                updateState={setAlbumImageCover}
                setProgress={setAlbumUploadingProgress}
                isLoading={setIsAlbumLoading}
                isImage={true}
              />
            ) : (
              <div className="position-relative w-100 h-100 overflow-hidden rounded-3">
                <img
                  src={albumImageCover}
                  className="w-100 h-100 object-fit-cover"
                  alt=""
                />
                <button
                  className="btn position-absolute rounded-circle border-0 bg-danger text-light fs-5"
                  style={{
                    bottom: "3%",
                    right: "3%",
                    outline: "none",
                    transition: "ease-in-out",
                    border: "none",
                    paddingBottom: "10px",
                  }}
                  onClick={() => deleteFileObject(albumImageCover, true)}
                >
                  <MdDelete className="text-light" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* Album name */}
      <input
        type="text"
        placeholder="Type your album name..."
        className="w-100 p-2 my-2 rounded-2 text-light"
        style={{ backgroundColor: "#323232", outline: "none" }}
        value={artistName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      {/* Save album button */}
      <div
        className="d-flex align-items-center justify-content-center p-4"
        style={{ width: "60%" }}
      >
        {isArtistLoading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="btn px-4 text-light fw-semibold px-4"
            style={{ backgroundColor: "#4CBB17" }}
            onClick={saveAlbum}
          >
            Save
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <p className="fs-5 fw-semibold" style={{ color: "#e5e5e5" }}>
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-40 bg-danger rounded-circle d-flex align-items-center justify-content-center position-relative overflow-hidden">
        <div
          className="position-absolute inset-0 rounded-circle"
          style={{
            filter: "blur(10px)",
            backgroundColor: "rgba(220, 53, 69, 0.5)",
          }}
        ></div>
        <div className="text-center text-white"></div>
      </div>
    </div>
  );
};

export const FileUpLoader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const [{ alertType }, dispatch] = useStateValue();

  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "image" : "audio"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        // setAlert("error");
        // alertMsg("File upload failed.");
        // setTimeout(() => {
        //   setAlert(null);
        // }, 4000);
        // isLoading(false);
        console.log(error);
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "danger",
        });

        setInterval(() => {
          dispatch(
            {
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            },
            4000
          );
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "success",
        });

        setInterval(() => {
          dispatch(
            {
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            },
            4000
          );
        });
      }
    );
  };
  return (
    <>
      <label
        htmlFor="upload-file"
        className="d-flex align-items-center justify-content-center h-100"
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ cursor: "pointer" }}
        >
          <p className="fw-bold fs-4">
            <MdOutlineFileUpload />
          </p>
          <p>Click to upload {isImage ? "an image" : "an audio"} </p>
        </div>
      </label>
      <input
        id="upload-file"
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        onChange={uploadFile}
        style={{
          width: "0",
          height: "0",
          position: "absolute",
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default DashboardNewSong;
