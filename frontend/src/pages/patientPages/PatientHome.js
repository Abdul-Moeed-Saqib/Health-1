import { Box } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMERGENCY } from '../../queries/emergencyQueries';
import { useAuthContext } from '../../hooks/useAuthContext';
import { DELETE_EMERG } from '../../mutations/emergencyMutations';
import { toastErrorBot } from '../../utils/utils'
import { GET_MOTIVATIONALTIP } from '../../queries/motivationalTipsQueries';

export default function PatientHome() {

    const [description, setDescription] = useState();

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

    const { loading } = useQuery(GET_MOTIVATIONALTIP, {
        onCompleted: (data) => {
            setDescription(data.motiavtionalTip.description);
        },
        onError: (error) => {
            alert(error.message);
            console.log(error.networkError);
        },
        fetchPolicy: 'network-only'
    })


    return (
        <Fragment>
            patient home
            <br />
            <Link to="/home/emergency">Send Emergency</Link>
            
            <div className='tip-style'>
                <h3>Motivational Tip</h3>
                <h5>{description}</h5>
            </div>
        </Fragment>
    )
}
