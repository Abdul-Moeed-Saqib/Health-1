import React, { Fragment } from 'react'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';

export default function App() {
  const { user } = useAuthContext();

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/'
         element={user ? <Home name={user.firstName} role={user.role} /> : <Navigate to="/auth" /> } 
         />
        <Route path='/auth' 
        element={!user ? <Auth /> : <Navigate to="/" />} 
        />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}
