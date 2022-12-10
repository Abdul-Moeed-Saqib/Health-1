import React, { useState } from 'react'
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../resource/css/auth.css'

export default function Auth() {

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className='container-auth' sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TabContext value={value}>
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
    )
}
