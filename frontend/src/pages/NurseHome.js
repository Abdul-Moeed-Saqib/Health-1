import { Box } from '@mui/material'
import React, { Fragment } from 'react'

export default function NurseHome() {
    return (
        <Fragment>
            <Box sx={{ width: '70%', padding: '0.5rem 1rem', background: 'lightgrey' }}>List of emergencies</Box>
            <Box sx={{ width: '30%', padding: '0.5rem 1rem', background: 'lightblue' }}> tabs component</Box>
        </Fragment>
    )
}
