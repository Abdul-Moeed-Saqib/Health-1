import { useLocation } from "react-router-dom";
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

import { useQuery } from "@apollo/client";
import { GET_VITALSIGNS } from '../../queries/vitalSignQueries';

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


const VitalSigns = () => {
    const location = useLocation()

    const patientId = location.state?.patientId;
    const {loading, data, refetch} = useQuery(GET_VITALSIGNS, {
        variables: {
            id: patientId
        },
        onError: (error) => {
            alert(error.message);
        },
        fetchPolicy: 'network-only'
    });

    if (loading) {
        return <div>Loading...</div>
    }

    return ( 
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="left">Body Temperature</StyledTableCell>
                    <StyledTableCell align="left">Heart Rate</StyledTableCell>
                    <StyledTableCell align="left">Blood Pressure</StyledTableCell>
                    <StyledTableCell align="left">Respiratory Rate</StyledTableCell>
                    <StyledTableCell align="left">Added</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data && data.vitalSigns.length > 0 && data.vitalSigns.map((vitalSign) => (
                    <StyledTableRow key={vitalSign._id}>
                        <StyledTableCell align="left">{vitalSign.bodyTem}</StyledTableCell>
                        <StyledTableCell align="left">{vitalSign.heartRate}</StyledTableCell>
                        <StyledTableCell align="left">{vitalSign.bloodPre}</StyledTableCell>
                        <StyledTableCell align="left">{vitalSign.respiratoryRate}</StyledTableCell>
                        <StyledTableCell align="left">{vitalSign.createdAt}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
     );
}
 
export default VitalSigns;