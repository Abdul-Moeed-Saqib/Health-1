import React, { Fragment, useEffect } from 'react'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from './hooks/useAuthContext';


export default function App() {
  const { user } = useAuthContext();

  return (
    <Fragment>
      <Routes>
        <Route path='/' element={user ? <Navigate to='/home' /> : <Auth />} />
        <Route path='/home/*' element={user ? <Home /> : <Auth />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}
