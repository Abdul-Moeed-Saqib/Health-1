import React from 'react'
import NurseHome from "./NurseHome";
import PatientHome from "./PatientHome";
import Box from '@mui/material/Box';


export default function Home({ role }) {


    return (
        <div>
            <Box sx={{ marginTop: '4rem', display: 'flex', width: '100%' }}>
                {role === "nurse" ? <NurseHome /> : <PatientHome />}
            </Box>

        </div>
    )
}
