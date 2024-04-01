import React, { useEffect, useState } from "react";
import "./../styles/Login.css";
import { app } from "../config/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validateUser } from "../api";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Login({ setAuth }) {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const [{ user }, dispath] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              // console.log(token);
              validateUser(token).then((data) => {
                dispath({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispath({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    } else if (formData.password.length < 10) {
      validationErrors.password = "Mật khẩu sai . Xin mời nhập lại";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Login sucess");
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
              style={{ width: "150px" }}
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
            height: "810px",
            borderRadius: "5px",
          }}
        >
          <h1 className="text-center my-5 mx-0 text-light fs-1">
            Login in to Spotify
          </h1>

          <div className="account-connect d-flex justify-content-center align-items-center flex-column">
            <button
              className="a-c-btn text-center p-2 my-1 mx-0 text-light fs-6"
              id="google"
            >
              <img
                src="./../image/google.png"
                alt=""
                style={{ width: "50px" }}
              />
              <FcGoogle className="me-2" />
              <span onClick={loginWithGoogle}>Log in with Google</span>
            </button>
          </div>

          <div className="hr"></div>

          <div className="log-in d-flex justify-content-center align-items-center fw-bold">
            <form
              action=""
              name="login-form"
              method="post"
              onSubmit={handleSubmit}
            >
              <div style={{ position: "relative" }}>
                <label htmlFor="" className="text-white fs-6 d-block">
                  Email of username
                </label>
                <input
                  type="email"
                  placeholder="Email or username "
                  name="email"
                  onChange={handleChange}
                />

                <MdOutlineMail
                  className="icon"
                  style={{ top: errors.password ? "26%" : "60%" }}
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
                <label htmlFor="" className="text-white fs-6 mt-3 d-block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />

                <FaRegEyeSlash
                  className="icon"
                  style={{
                    top: errors.password ? "41%" : "67%",
                  }}
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

              <div className="switch m-0 p-0">
                <input type="checkbox" name="" id="switch" />
                <label htmlFor="switch"></label>
                <span>Remember me</span>
              </div>

              <button type="submit">Login</button>

              <a
                className="d-block text-center text-light fw-medium text-decoration-underline"
                style={{
                  cursor: "pointer",
                }}
              >
                Forgot password
              </a>
            </form>
          </div>

          <div className="hr"></div>

          <div className="last text-center my-1 mx-0">
            <span>Don't you have an account?</span>
          </div>
        </div>
      </section>
    </div>
  );
}
