import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMERGENCY } from '../../queries/emergencyQueries';
import { useAuthContext } from '../../hooks/useAuthContext';
import { DELETE_EMERG } from '../../mutations/emergencyMutations';
import { toastErrorBot } from '../../utils/utils'

export default function PatientHome() {

    const [deleteEmergencyAlert] = useMutation(DELETE_EMERG, {
        onCompleted: (data) => {
            if (data) {
                alert('The emergency has been accpeted!');
            }
        },
        onError: (error) => {
            toastErrorBot(error.message);
        }
    })

    const { data } = useQuery(GET_EMERGENCY, {
        onCompleted: (data) => {
            const emerg = data.findEmerAlert;
            if (emerg.isAccepted) {
                deleteEmergencyAlert({ variables: { id: emerg._id } });
            }
        },
        onError: (error) => {
            alert(error.message);
        },
        fetchPolicy: 'network-only'
    })


    return (
        <Fragment>
            patient home
            <br />
            <Link to="/home/emergency">Send Emergency</Link>
        </Fragment>
    )
}
