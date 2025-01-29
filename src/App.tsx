import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./modules/user/Register";
import Logout from "./modules/user/Logout";
import Profile from "./modules/user/Profile";
import Settings from "./modules/user/Settings";
import HomePage from "pages/HomePage";
import ArticlePage from "pages/ArticlePage";
import Header from "modules/shared/Header";
import Footer from "modules/shared/Footer";
import Editor from "modules/user/Editor";
import Login from "modules/user/Login";
import React from "react";
import { useAppSelector } from "redux/store";
import { selectIsLoggedIn, selectUser } from "redux/userSlice";

const App: React.FC = () => {
  const isLoggedIn = useAppSelector(selectUser);
  console.log(isLoggedIn);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:slug" element={<Editor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/favorites" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/:slug" element={<ArticlePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
