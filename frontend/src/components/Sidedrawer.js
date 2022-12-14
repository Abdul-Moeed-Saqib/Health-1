import React from 'react'
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAuthContext } from '../hooks/useAuthContext';
import PatientMenu from './miscellaneous/PatientMenu';
import NurseMenu from './miscellaneous/NurseMenu';
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

    const { user } = useAuthContext()

    const theme = useTheme();

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
            {
                user && user.role === 'patient' ? <PatientMenu /> :
                    <NurseMenu />
            }

        </Drawer>
    )
}
