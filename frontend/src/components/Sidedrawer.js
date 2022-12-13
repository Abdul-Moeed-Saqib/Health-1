import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { ListItemButton, ListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useAuthContext } from '../hooks/useAuthContext';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));
export default function SideDrawer({ open, handleDrawerClose }) {

    const { setAcceptState } = useAuthContext()

    const theme = useTheme();
    const [expandE, setExpandE] = useState(true)
    const expandEmergency = () => {
        setExpandE(!expandE)
    }

    const navigate = useNavigate()


    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}
            PaperProps={{
                sx: {
                    bgcolor: '#c1e8e4'
                }
            }}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </DrawerHeader>

            <List
                sx={{ width: '100%', maxWidth: 240, bgcolor: '#c1e8e4' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >

                {/* Emergency */}
                <ListItemButton onClick={expandEmergency}>
                    <ListItemIcon>
                        <AddAlertIcon />
                    </ListItemIcon>
                    <ListItemText primary="Emergencies" />
                    {expandE ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={expandE} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => {
                            setAcceptState(false)
                            navigate('/home')
                        }}>
                            <ListItemIcon>
                                <VaccinesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Accept Emergencies" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => {
                            setAcceptState(true)
                            navigate('/home')
                        }}>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="History" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Patient */}
                <ListItemButton component={NavLink} to={`/home/patients`} >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Patients" />
                </ListItemButton>

                {/* Motivational Tips */}
                <ListItemButton component={NavLink} to={`/home/patients`} >
                    <ListItemIcon>
                        < TipsAndUpdatesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Motivational Tips" />
                </ListItemButton>
            </List>
        </Drawer>
    )
}
