import React from "react";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="w-100 h-auto d-flex flex-column justify-content-center align-items-center ">
      <Header />
      <div className="w-50 my-2 p-4 bg-primary"></div>
    </div>
  );
};

export default Dashboard;
