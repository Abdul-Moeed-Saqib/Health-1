import React, { useState } from 'react'
import NurseHome from "./NurseHome";
import PatientHome from "./patientPages/PatientHome";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import SideDrawer from '../components/Sidedrawer'
import { useAuthContext } from '../hooks/useAuthContext'
import NavBar from '../components/Navbar'
import { styled, useTheme } from '@mui/material/styles';
import { Routes, Route, Navigate } from 'react-router-dom';
import MemoryGame from '../pages/patientPages/gameForPatient/MemoryGame';
import CallEmergency from './CallEmergency'
import Auth from './Auth';
import '../resource/css/home.css'
import PatientList from './PatientList';
import DailyInformation from './patientPages/DailyInformation';
import MotivationalTips from './MotivationalTips';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, user }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: user ? `-${drawerWidth}px` : '0px',
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Home() {

    const theme = useTheme();

    const { user } = useAuthContext()

    const [open, setOpen] = useState(user ? true : false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgcolor: '#72d6cb', borderBottom: '1px solid #17a2b8' }}>
                <Toolbar>
                    <NavBar handleDrawerOpen={handleDrawerOpen} open={open} setOpen={setOpen} />
                </Toolbar>
            </AppBar>
            <Main open={open} user={user}>
                <DrawerHeader />
                <Box className='container-home' sx={{ width: '100%', minHeight: '91vh', p: '2rem 4rem' }}>
                    <Routes>
                        <Route path='/emergency' element={user.role === "patient" ? <CallEmergency /> : <Navigate to="/" />} />
                        <Route path="/memoryGame" element={<MemoryGame />} />
                        <Route path='/motivationalTips' element={user.role === "nurse" ? <MotivationalTips /> : <Navigate to="/" />} />
                        <Route path='/patients' element={<PatientList />} />
                        <Route path='/dailyInfo' element={<DailyInformation />} />
                        <Route path='*' element={user.role === 'nurse' ? <NurseHome /> : <PatientHome />} />
                    </Routes>
                </Box>
            </Main>
            {
                user && <SideDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
            }
        </Box>
    )
}
