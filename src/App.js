import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { Dashboard } from "./components";

function App() {
  const firebaseAuth = getAuth(app);
  const [{ user }, dispatch] = useStateValue();

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
        className="w-100 h-100 text-light"
        style={{
          backgroundColor: "#191919",
          minWidth: "680px",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login setAuth={setAuth} />}
          />
          <Route
            path="/signup"
            element={auth ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
