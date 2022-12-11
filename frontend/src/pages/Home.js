import React from 'react'
import NurseHome from "./NurseHome";
import PatientHome from "./PatientHome";

import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';

export default function Home({name, role}) {
    const { logout } = useLogout();

    const handleClick = () => {
        logout()
    }

    return (
        <div>
            <h1>Welcome, {name}</h1>
            {role === "nurse" ? <NurseHome /> : <PatientHome />}
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}
