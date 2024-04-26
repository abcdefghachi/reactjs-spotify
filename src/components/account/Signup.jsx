import React, { useState } from "react";
import "../../styles/Signup.css";
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
// import { signUpUser } from "../api";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/stateProvider";
import { app } from "../../config/firebase.config";
import { validateUser } from "../../api";

export default function Singup(setAuth) {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const createAccount = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data.user,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "* Yêu cầu nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
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

    if (!formData.name.trim()) {
      validationErrors.name = "* Yêu cầu nhập tên";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        navigate("/");
      } catch (error) {
        console.error("Đăng ký thất bại:", error);
      }
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
                {/* <MdOutlineMail
                  className="icon"
                  style={{ top: errors.password ? "40%" : "64%" }}
                /> */}

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
                {/* <FaRegEyeSlash
                  className="icon"
                  style={{ top: errors.password ? "40%" : "65%" }}
                /> */}

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

                {/* <FaRegEyeSlash
                  className="icon"
                  style={{ top: errors.password ? "64%" : "68%" }}
                /> */}

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
                  name="name"
                  placeholder="Enter  your name"
                  onChange={handleChange}
                />
                {/* <FaRegUser
                  className="icon"
                  style={{ top: errors.password ? "40%" : "65%" }}
                /> */}
                {errors.name && (
                  <p
                    className="text-danger fw-normal py-1 px-2"
                    style={{
                      backgroundColor: "#ffb6c1",
                      borderBottom: "3px solid red",
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <p className="text-light fw-lighter">
                We may send you an email to confirm your singup
              </p>

              <button onClick={createAccount}>Signup</button>
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
