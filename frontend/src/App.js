import React, { Fragment, useEffect } from 'react'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from './hooks/useAuthContext';
import MemoryGame from './pages/patientPages/gameForPatient/MemoryGame';
import CallEmergency from './pages/CallEmergency';
export default function App() {
  const { user } = useAuthContext();

  return (
    <Fragment>
      <Routes>
        <Route path='/'
          element={user ? <Home role={user.role} /> : <Navigate to="/auth" />}
        />
        <Route path='/auth'
          element={!user ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path='*'
          element={!user ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path='/emergency'
          element={user ? <CallEmergency /> : <Navigate to="/auth" />}
        />
        <Route path="/memoryGame" element={<MemoryGame />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}
