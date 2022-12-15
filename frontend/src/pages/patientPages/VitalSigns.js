import { useState } from "react";
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
import moment from 'moment'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_PREDICTION, GET_VITALSIGNS } from '../../queries/vitalSignQueries';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Fragment } from "react";
import { UPDATE_DIAGNOSIS } from "../../mutations/vitalSignMutation";
import { toastErrorBot } from "../../utils/utils";

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const VitalSigns = () => {
    const location = useLocation()
    const { user } = useAuthContext()
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [diagnosis, setDiagnosis] = useState('')
    const [selectedVital, setSelectVital] = useState()

    const patientId = location.state?.patientId;
    const { loading, data, refetch } = useQuery(GET_VITALSIGNS, {
        variables: {
            id: patientId
        },
        onError: (error) => {
            toastErrorBot(error.message);
        },
        fetchPolicy: 'network-only'
    });

    const [updateDiagnosis] = useMutation(UPDATE_DIAGNOSIS, {
        variables: {
            id: selectedVital,
            diagnosis
        },
        onCompleted: () => {
            setOpen(false)
            refetch()
        },
        onError: (error) => {
            setOpen(false)
            toastErrorBot(error.message)
        }
    })

    const [getPrediction, { loading: predictionLoading, data: prediction }] = useLazyQuery(GET_PREDICTION, {
        onError: (error) => {
            console.log(error);
            toastErrorBot(error.message);
        },
        fetchPolicy: 'network-only'
    })

    if (loading) {
        return <div>Loading...</div>
    }

    const handleVitalSign = (vitalId) => {
        setOpen(true)
        setSelectVital(vitalId)
    }

    if (prediction) {
        console.log('prediction', prediction);
    }

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Body Temperature</StyledTableCell>
                            <StyledTableCell align="left">Heart Rate</StyledTableCell>
                            <StyledTableCell align="left">Blood Pressure (systolic)</StyledTableCell>
                            <StyledTableCell align="left">Respiratory Rate</StyledTableCell>
                            <StyledTableCell align="left">Added</StyledTableCell>
                            <StyledTableCell align="center">Diagnosis</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.vitalSigns.length > 0 && data.vitalSigns.map((vitalSign) => (
                            <StyledTableRow key={vitalSign.id}>
                                <StyledTableCell align="left">{vitalSign.bodyTem}</StyledTableCell>
                                <StyledTableCell align="left">{vitalSign.heartRate}</StyledTableCell>
                                <StyledTableCell align="left">{vitalSign.bloodPre}</StyledTableCell>
                                <StyledTableCell align="left">{vitalSign.respiratoryRate}</StyledTableCell>
                                <StyledTableCell align="left">{moment.unix(vitalSign.createdAt / 1000).format("MM/DD/YYYY")}</StyledTableCell>
                                <StyledTableCell align="left">
                                    {
                                        vitalSign.diagnosis ? vitalSign.diagnosis
                                            : user.role === 'nurse' ? <Button variant="contained" onClick={() => handleVitalSign(vitalSign.id)}>Diagnose</Button>
                                                :
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Typography variant="body1">Awaiting Review</Typography>
                                                    {
                                                        prediction?.predictBloodPressure ? 'got it' : <Button variant="outlined" onClick={() => { getPrediction({ variables: { bloodPre: parseFloat(vitalSign.bloodPre) } }) }}>Get prediction from AI</Button>
                                                    }
                                                </Box>
                                    }</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Write a Medical Diagnosis
                    </Typography>
                    <TextField
                        sx={{ m: '1rem 0', width: '350px' }}
                        id="outlined-multiline-static"
                        label="Diagnosis"
                        multiline
                        rows={4}
                        value={diagnosis}
                        onChange={e => setDiagnosis(e.target.value)}
                        placeholder="Is the patient healthy? or need to see a doctor..."
                    />
                    <Button variant="contained" onClick={updateDiagnosis}>Confirm</Button>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default VitalSigns;