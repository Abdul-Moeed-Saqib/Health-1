import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from '@mui/icons-material/Home';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useAuthContext } from '../../hooks/useAuthContext';


export default function PatientMenu() {
    const { user } = useAuthContext()
    const patientId = user?._id;

    const navigate = useNavigate()

    return (
        <List
            sx={{ width: '100%', maxWidth: 240, bgcolor: '#c1e8e4' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {/* Home */}
            <ListItemButton component={NavLink} to={`/home`}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            {/* Emergency */}
            <ListItemButton onClick={() => {
                navigate('/home/dailyInfo', { state: { patientId } })
            }} >
                <ListItemIcon>
                    <VaccinesIcon />
                </ListItemIcon>
                <ListItemText primary="Daily Report" />
            </ListItemButton>

            {/* Emergency */}
            <ListItemButton component={NavLink} to={`/home/emergency`}>
                <ListItemIcon>
                    <AddAlertIcon />
                </ListItemIcon>
                <ListItemText primary="Send Emergency" />
            </ListItemButton>

            {/* Self assessment */}
            <ListItemButton component={NavLink} to={`/home/checklist`} >
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Self Assessment" />
            </ListItemButton>

            {/* Game */}
            <ListItemButton component={NavLink} to={`/home/memoryGame`} >
                <ListItemIcon>
                    < SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Memory Game" />
            </ListItemButton>
        </List>
    )
}
