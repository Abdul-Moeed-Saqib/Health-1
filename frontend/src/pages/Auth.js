import React, { Fragment } from 'react'
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../resource/css/auth.css'
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from '../components/Navbar';
import logo from './h1.png'

export default function Auth() {

    const { tabValue, setTabValue } = useAuthContext()

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div style={{ overflow: 'hidden' }}>
            <Navbar />
            <Box className='container-auth' sx={{ height: '91vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className='h1Logo' src={logo} alt="Logo" />
                    <TabContext value={tabValue}>
                        <Box sx={{ width: '100%' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                <Tab label="Login" value="1" />
                                <Tab label="Signup" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><Login /></TabPanel>
                        <TabPanel value="2"><Signup /></TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </div>
    )
}
