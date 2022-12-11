import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";
import { Toolbar } from "@mui/material";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar({ handleDrawerOpen, open, setOpen }) {

  const { user, setTabValue } = useAuthContext()

  const { logout } = useLogout()

  return (
    <Toolbar className='navbar bg-light' sx={{ d: 'flex', justifyContent: 'space-between' }}>

      <h1>
        <Link to="/">Health-1</Link>
      </h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <Link to="#" onClick={() => { setTabValue("2") }} >Signup</Link>
                </li>
                <li>
                  <Link to="#" onClick={() => { setTabValue("1") }}>Login</Link>
                </li>
              </Fragment>
          }
        </ul>
        {
          user && <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        }

      </div>
    </Toolbar>
  );
}
