import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPqcRiI7dgLj69mW3a4W33Rn6hnwgj7J0",
  authDomain: "reactjs-spotify.firebaseapp.com",
  projectId: "reactjs-spotify",
  storageBucket: "reactjs-spotify.appspot.com",
  messagingSenderId: "300927876521",
  appId: "1:300927876521:web:d69c302adfadef403958b8",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
