import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/stateProvider";
import { actionType } from "./context/reducer";
import { Dashboard, MusicPlayer } from "./components";
import UpdateProfile from "./components/user/UpdateProfile";
import Favorites from "./components/user/Favorites";

function App() {
  const firebaseAuth = getAuth(app);
  const [{ user, isSongPlaying }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
      }
    });
  }, [firebaseAuth, dispatch]);

  return (
    <AnimatePresence>
      <div
        className="position-relative text-light"
        style={{ backgroundColor: "#191919", minWidth: "680px" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UpdateProfile />} />
          <Route path="/myFavorites" element={<Favorites />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route
            path="/signup"
            element={auth ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="position-fixed bottom-0 start-50 translate-middle-x d-flex justify-content-center align-items-center"
            style={{
              minWidth: "700px",
              width: "100%",
              backgroundColor: "#323232",
            }}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
