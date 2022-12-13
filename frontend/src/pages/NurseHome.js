import { Box, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMERGIENCIES } from '../queries/emergencyQueries';
import { useAuthContext } from '../hooks/useAuthContext';
import EmergencyDetails from '../components/EmergencyDetails';
import { toastErrorBot } from '../utils/utils'

export default function NurseHome() {
    const { acceptedState } = useAuthContext();

    console.log('ac st', acceptedState);

    const { loading, data, refetch } = useQuery(GET_EMERGIENCIES, {
        onError: (error) => {
            toastErrorBot(error.message)
        },
        fetchPolicy: 'network-only'
    });

    if (loading) {
        return <div>Loading</div>
    }

    return (
        <Fragment>

            <Typography variant='h4' sx={{ mb: '1rem', textAlign: 'center' }}>{acceptedState ? 'Accepted Emergency Alerts' : 'To be Accepted Emergency Alerts '}</Typography>
            <Box sx={{ w: '100%', display: 'flex', flexWrap: 'wrap', mt: '1rem' }}>
                {data &&
                    data.emerAlerts.map((emergency) => emergency.isAccepted === acceptedState && (
                        <EmergencyDetails key={emergency._id} emergency={emergency} refetch={refetch} />
                    ))}
            </Box>

        </Fragment>
    )
}
