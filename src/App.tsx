import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./modules/user/Register";
import Logout from "./modules/user/Logout";
import Settings from "./modules/user/Settings";
import HomePage from "pages/HomePage";
import ArticlePage from "pages/ArticlePage";
import Header from "modules/shared/Header";
import Footer from "modules/shared/Footer";
import Editor from "modules/user/Editor";
import Login from "modules/user/Login";
import React from "react";
import ProfilePage from "pages/ProfilePage";

const App: React.FC = () => {
  //TODO: add more native styles
  //TODO: add endpoint or update existing endpoints to get followers count for author
  //TODO: refactor the code to use react-query for fetching data
  //TODO: components out of task scope: refactor and split on smaller components
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:slug" element={<Editor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/profile/:username/favorites" element={<ProfilePage />} />
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
