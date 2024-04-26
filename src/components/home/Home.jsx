import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getAllAlbums, getAllArtists, getAllSongs } from "../../api";
import { useStateValue } from "../../context/stateProvider";
import { actionType } from "../../context/reducer";
import UserArtistCard from "../user/UserArtistCard";
import UserSongCard from "../user/UserSongCard";
import MusicPlayer from "../MusicPlayer";
import NavBar from "./NavBar";
import Main from "./Main";
import "../../styles/NavBar.css";

export default function Home() {
  const [{ allArtists, allSongs, allAlbums }, dispatch] = useStateValue();
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

  const filteredArtists = allArtists
    ? allArtists.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const filteredAlbums = allAlbums
    ? allAlbums.filter((album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const filteredSongs = allSongs
    ? allSongs.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    // <div className="w-100 h-auto" style={{ backgroundColor: "#191919" }}>
    //   <Header />
    //   <div className="text-light fw-bold text-uppercase fs-4 ms-5">
    //     Top Artist
    //   </div>
    //   <div className="d-flex flex-column justify-content-center">
    //     <ArtistContainer data={filteredArtists} />
    //   </div>
    //   <div className="text-light fw-bold text-uppercase fs-4 ms-5">Albums</div>
    //   <div className="d-flex flex-column justify-content-center">
    //     <AlbumContainer data={filteredAlbums} />
    //   </div>
    //   <div className="text-light fw-bold text-uppercase fs-4 ms-5">
    //     New Release
    //   </div>
    //   <div className="d-flex flex-column justify-content-center">
    //     <SongContainer data={filteredSongs} />
    //   </div>
    // </div>

    <div className="outerWrap">
      <div className="app">
        <NavBar />
        <Main />
      </div>
      <div className="music-controls">
        <MusicPlayer />
      </div>
    </div>
  );
}

export const ArtistContainer = ({ data }) => {
  return (
    <div className="w-100 d-flex flex-wrap gap-2 align-items-center justify-content-center">
      {data &&
        data.map((artist, i) => (
          <UserArtistCard
            key={artist._id}
            data={artist}
            index={i}
            type="artist"
          />
        ))}
    </div>
  );
};

export const AlbumContainer = ({ data }) => {
  return (
    <div className="w-100 d-flex flex-wrap gap-1 justify-content-evenly align-items-center">
      {data &&
        data.map((album, i) => (
          <UserArtistCard key={album._id} data={album} index={i} type="album" />
        ))}
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className="w-100 flex flex-wrap gap-2 justify-content-evenly align-items-center">
      {data &&
        data.map((song, i) => (
          <UserSongCard key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  );
};
