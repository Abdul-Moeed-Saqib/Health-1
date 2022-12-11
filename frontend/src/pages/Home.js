import React from 'react'
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';

export default function Home({firstName}) {
    const { logout } = useLogout();

    const handleClick = () => {
        logout()
    }

    return (
        <div>
            <h1>{firstName}</h1>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}
