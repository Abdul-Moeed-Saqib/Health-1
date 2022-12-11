import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {

  const { user } = useAuthContext()

  const { logout } = useLogout()

  return (
    <Fragment>
      <nav className="navbar bg-light">
        <h1>
          <Link to="/">Health-1</Link>
        </h1>
        <ul>
          {
            user ?
              <Fragment>
                <li>
                  <Link to="#" >{`Welcome, ${user.firstName}`}</Link>
                </li>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
              </Fragment>
              :
              <Fragment>
                <li>
                  <Link to="#" >Signup</Link>
                </li>
                <li>
                  <Link to="#">Login</Link>
                </li>
              </Fragment>
          }
        </ul>
      </nav>
    </Fragment>
  );
}
