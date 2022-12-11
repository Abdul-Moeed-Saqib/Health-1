import React from 'react'
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';

export default function Home({ name }) {
    const { logout } = useLogout();

    const handleClick = () => {
        logout()
    }

    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}
