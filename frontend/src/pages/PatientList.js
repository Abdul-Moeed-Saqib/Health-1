import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from "@apollo/client";
import { GET_PATIENTS } from '../queries/patientQueries'
import { toastErrorBot } from '../utils/utils'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#9dd0d3',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function PatientList() {

    const navigate = useNavigate()

    const { loading, data, refetch } = useQuery(GET_PATIENTS, {
        onError: (error) => {
            toastErrorBot(error.message)
        },
        fetchPolicy: 'network-only'
    });

    if (loading) {
        return <div>Loading...</div>
    }

    const toAddVitalSignPage = (patientId) => {
        navigate('/home/dailyInfo', { state: { patientId } })
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">City</StyledTableCell>
                        <StyledTableCell align="left">Address</StyledTableCell>
                        <StyledTableCell align="left">Phone</StyledTableCell>
                        <StyledTableCell align="left">Operation</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.patients.length > 0 && data.patients.map((patient) => (
                        <StyledTableRow key={patient.id}>
                            <StyledTableCell component="th" scope="row">
                                {`${patient.firstName} ${patient.lastName}`}
                            </StyledTableCell>
                            <StyledTableCell align="left">{patient.email}</StyledTableCell>
                            <StyledTableCell align="left">{patient.city}</StyledTableCell>
                            <StyledTableCell align="left">{patient.address}</StyledTableCell>
                            <StyledTableCell align="left">{patient.phoneNumber}</StyledTableCell>
                            <StyledTableCell align="left">
                                <Box sx={{ d: 'flex' }}>
                                    <Button variant="contained" sx={{ mr: '1rem' }}
                                        onClick={() => toAddVitalSignPage(patient.id)}
                                    >Add Vital Sign</Button>

                                </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
