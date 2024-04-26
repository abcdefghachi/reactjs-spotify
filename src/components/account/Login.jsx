import React, { useEffect, useState } from "react";
import "../../styles/Login.css";
import {
  BrowserRouter as Router,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { app } from "../../config/firebase.config";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useStateValue } from "../../context/stateProvider";
import { actionType } from "../../context/reducer";
import { validateUser } from "../../api";

export default function Login({ setAuth }) {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              validateUser(token).then((data) => {
                dispatch({ type: actionType.SET_USER, user: data.user });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({ type: actionType.SET_USER, user: null });
            navigate("/login");
          }
        });
      }
    });
  };

  const loginAccount = async () => {
    try {
      // Kiểm tra email có hợp lệ không
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setErrors({ emailOrPassword: "Email không hợp lệ" });
        return;
      }

      // Kiểm tra mật khẩu
      if (formData.password.trim().length < 6) {
        setErrors({ emailOrPassword: "Mật khẩu không hợp lệ" });
        return;
      }

      // Đăng nhập với email và mật khẩu
      const userCred = await signInWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      // Kiểm tra người dùng tồn tại trong Firebase
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCred.user.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({ type: actionType.SET_USER, user: data.user });
          });
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrors({ emailOrPassword: "Email hoặc mật khẩu không đúng" });
      } else {
        setErrors({ general: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
      }
    }
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({});
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
    } else if (formData.password.length < 10) {
      validationErrors.password = "Mật khẩu hoặc email sai . Xin mời nhập lại";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await loginAccount();
      } catch (error) {
        console.error("Đăng nhập thất bại:", error);
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
          style={{ width: "734px", height: "810px", borderRadius: "5px" }}
        >
          <h1 className="text-center my-5 mx-0 text-light fs-1">
            Login in to Spotify
          </h1>

          <div className="account-connect d-flex justify-content-center align-items-center flex-column">
            <button
              className="a-c-btn text-center p-2 my-1 mx-0 text-light fs-6"
              id="google"
              onClick={loginWithGoogle}
            >
              <img
                src="./../image/google.png"
                alt=""
                style={{ width: "50px" }}
              />
              <FcGoogle className="me-2" />
              <span>Log in with Google</span>
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

              <button type="submit">Login</button>

              <a
                className="d-block text-center text-light fw-medium text-decoration-underline"
                style={{ cursor: "pointer" }}
              >
                Forgot password
              </a>
            </form>
          </div>

          <div className="hr"></div>

          <div className="last text-center my-1 mx-0">
            <span>Don't you have an account?</span>{" "}
            <NavLink
              to="/signup"
              className="text-light text-decoration-underline"
              style={{ cursor: "pointer" }}
            >
              Signup for Spotify
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
