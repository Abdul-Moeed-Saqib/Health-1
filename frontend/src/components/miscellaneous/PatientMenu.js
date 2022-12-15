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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import HistoryIcon from '@mui/icons-material/History';


export default function PatientMenu() {
    const { user } = useAuthContext()
    const patientId = user?._id;

    const navigate = useNavigate()

    const [expandV, setExpandV] = useState(true)
    const expandVitalSigns = () => {
        setExpandV(!expandV)
    }


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

            {/* VitalSigns */}

            <ListItemButton onClick={expandVitalSigns}>
                <ListItemIcon>
                    <AddAlertIcon />
                </ListItemIcon>
                <ListItemText primary="Vital Signs" />
                {expandV ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expandV} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => {
                        navigate('/home/dailyInfo', { state: { patientId } })
                    }} >
                        <ListItemIcon>
                            <VaccinesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Daily Report" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }} onClick={() => {
                        navigate('/home/vitalSigns', { state: { patientId } })
                    }}>
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="History" />
                    </ListItemButton>
                </List>
            </Collapse>



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
