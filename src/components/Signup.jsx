import React, { useState } from "react";
import "./../styles/Signup.css";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  NavLink,
} from "react-router-dom";
import Login from "./Login";

export default function Singup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "* Yêu cầu nhập email";
    } else if (!/\S+@\S\.\S+/.test(formData.email)) {
      validationErrors.email = "* Email không đúng định dạng";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "* Yêu cầu nhập mật khẩu";
    } else if (
      formData.password.length < 10 ||
      !/[A-Z]/.test(formData.password) ||
      !/[!@#$%^&*()\\|,.<>?]+/.test(formData.password)
    ) {
      validationErrors.password =
        "Mật khẩu pháỉ có ít nhất 10 ký tự , 1 ký tự in hoa và 1 ký tự đặc biệt";
    }
    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPasswordassword = "* Yêu cầu nhập lại mật khẩu";
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword =
        "Mật khẩu không đúng , xin mời nhập lại";
    }

    if (!formData.username.trim()) {
      validationErrors.username = "* Yêu cầu nhập tên";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      window.location.href = "/spotify";
    }
  };
  return (
    <div>
      <header>
        <div className="logo bg-black py-4 pe-0 ps-3">
          <a>
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              alt=""
              style={{ width: "120px" }}
            />
          </a>
        </div>
      </header>

      <section
        className="d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(rgba(11,1,1,0.9) 0% , rgba(0,0,0) 100%)",
        }}
      >
        <div
          className="main my-5 mx-0 p-2 bg-dark"
          style={{
            width: "734px",
            height: "950px",
            borderRadius: "5px",
          }}
        >
          <h1 className="text-center my-5 mx-0 text-light fs-1">
            Sign up for a free Spotify account
          </h1>

          <div className="sign-up d-flex justify-content-center align-items-center fw-bold">
            <form action="" onSubmit={handleSubmit}>
              <div style={{ position: "relative" }}>
                <label
                  htmlFor=""
                  className="text-white fs-6 mb-1 d-inline-block"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <MdOutlineMail
                  className="icon"
                  style={{ top: errors.password ? "40%" : "64%" }}
                />

                {errors.email && (
                  <p
                    className="text-danger fw-normal py-1 px-2 w-100"
                    style={{
                      backgroundColor: "#ffb6c1",
                      borderBottom: "3px solid red",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div style={{ position: "relative" }}>
                <label
                  htmlFor=""
                  className="text-white fs-6 mb-1 d-inline-block"
                >
                  Create a password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  onChange={handleChange}
                />
                <FaRegEyeSlash
                  className="icon"
                  style={{ top: errors.password ? "40%" : "65%" }}
                />

                {errors.password && (
                  <p
                    className="text-danger fw-normal py-1 px-2"
                    style={{
                      backgroundColor: "#ffb6c1",
                      borderBottom: "3px solid red",
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <div style={{ position: "relative" }}>
                <label
                  htmlFor=""
                  className="text-white fs-6 mb-1 d-inline-block"
                >
                  Confirm yous password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your password again"
                  onChange={handleChange}
                />

                <FaRegEyeSlash
                  className="icon"
                  style={{ top: errors.password ? "64%" : "68%" }}
                />

                {errors.confirmPassword && (
                  <p
                    className="text-danger fw-normal py-1 px-2"
                    style={{
                      backgroundColor: "#ffb6c1",
                      borderBottom: "3px solid red",
                    }}
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div style={{ position: "relative" }}>
                <label
                  htmlFor=""
                  className="text-white fs-6 mb-1 d-inline-block"
                >
                  What should we call you ?
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter  your username"
                  onChange={handleChange}
                />
                <FaRegUser
                  className="icon"
                  style={{ top: errors.password ? "40%" : "65%" }}
                />
                {errors.username && (
                  <p
                    className="text-danger fw-normal py-1 px-2"
                    style={{
                      backgroundColor: "#ffb6c1",
                      borderBottom: "3px solid red",
                    }}
                  >
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="text-light my-2 d-flex justify-content-between">
                <div className="gender">
                  <input type="radio" id="male" name="gender" />
                  <label htmlFor="male" className="ms-2">
                    Male
                  </label>
                </div>
                <div className="gender">
                  <input type="radio" id="female" name="gender" />
                  <label htmlFor="female" className="ms-2">
                    Female
                  </label>
                </div>
              </div>

              <p className="text-light fw-lighter">
                We may send you an email to confirm your singup
              </p>

              <button>Signup</button>
            </form>
          </div>

          <div className="hr"></div>

          <div className="last text-center my-1 mx-0">
            <span>Do you already have an account?</span>{" "}
            <NavLink
              to="/login"
              className="text-light text-decoration-underline"
              style={{ cursor: "pointer" }}
            >
              Log in to Spotify
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
