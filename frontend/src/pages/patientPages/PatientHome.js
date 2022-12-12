import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { Link } from "react-router-dom";

export default function PatientHome() {
    return (
        <Fragment>
            patient home
            <br />
            <Link to="/emergency">Send Emergency</Link>
        </Fragment>
    )
}
