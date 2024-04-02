import React from "react";
import "./../styles/SongCard.css";
import { IoTrash } from "react-icons/io5";
const SongCard = ({ data, index }) => {
  return (
    <div className="">
      <div className="songcard w-100 mx-3 my-2 p-2 row">
        <img
          src={data.imageURL}
          alt=""
          //   style={{
          //     width: "60px",
          //   }}
          className="col-1"
        />
        <div className="song-info text-light col-5 d-flex justify-content-between flex-column">
          <p className="fw-bold">{data.name}</p>
          <p style={{ color: "#aaa" }}>{data.artist}</p>
        </div>

        <p className="col-4">{data.album}</p>
        <div className="text-danger col-1">
          <IoTrash />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
