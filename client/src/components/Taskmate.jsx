import React from "react";

import Sidebar from "./Sidebar";
import About from "../pages/About";
import Friends from "../pages/Friends";
import History from "../pages/History";
import Home from "../pages/Home";
import MyList from "../pages/MyList";
import MyProfile from "../pages/MyProfile";
import SavedNotes from "../pages/SavedNotes";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const Taskmate = () => {
  return (
    <div className="taskmate-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/history" element={<History />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/savednotes" element={<SavedNotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Taskmate;
