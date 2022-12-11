import React, { Fragment } from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}
