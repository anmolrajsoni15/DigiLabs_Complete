import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import SignUp from "./Components/SignUp/SignUp";
import Profile from "./Components/Profile/Profile";
import UpdatePage from "./Components/UpdatePage/UpdatePage";
import { loadPage } from "./Actions/Page";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.add(prefersDarkMode ? "theme-dark" : "theme-light");
  }, []);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadPage());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Profile /> : <SignUp />} />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <SignUp />}
        />
        <Route path="/page/update" element={isAuthenticated ? <UpdatePage /> : <SignUp />} />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <SignUp />}
        />
      </Routes>
    </Router>
  );
}

export default App;
