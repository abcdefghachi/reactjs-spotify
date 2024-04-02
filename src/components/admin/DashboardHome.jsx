import React, { useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { getAllUsers } from "../../api";
import Playing from "../Playing";

export const DashboardCard = ({ icon, name }) => {
  return (
    <div className="p-2 gap-2 h-auto text-light">
      <p>{name}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        console.log(data);
      });
    }
  });
  return (
    <>
      <div className="w-100 p-3 d-flex flex-wrap align-items-center justify-content-evenly">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
    </>
  );
};

export default DashboardHome;
