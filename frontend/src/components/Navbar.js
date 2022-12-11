import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Fragment>
      <nav className="navbar bg-light">
        <h1>
          <Link to="/">Health-1</Link>
        </h1>
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}
