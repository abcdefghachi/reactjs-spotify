import React from "react";
import "./../styles/Home.css";
import Header from "./Header";

export default function Home() {
  return (
    <div
      className="w-100 h-auto d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: "#323232",
      }}
    >
      <Header />
    </div>
  );
}