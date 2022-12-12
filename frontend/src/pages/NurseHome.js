import { Box } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useQuery, useMutation} from '@apollo/client';
import { GET_EMERGIENCIES } from '../queries/emergencyQueries';
import { REQUIRE_AUTH } from '../mutations/userMutations';
import { useAuthContext } from '../hooks/useAuthContext';
import EmergencyDetails from '../components/EmergencyDetails';

export default function NurseHome() {
    const {user} = useAuthContext();

    const [newData, setNewData] = useState(null);
    const [manualError, setManualError] = useState(null);

    const { loading, data, error, refetch } = useQuery(GET_EMERGIENCIES, {
        onError: (error) => {
            setManualError(error.message);
        },
        fetchPolicy: 'network-only'
    });

    if (loading) {
        return <div>Loading</div>
    }

    if (error) {
        console.log(error);
        return <div>{error.message}</div>
    }

    /* const [requireAuth] = useMutation(REQUIRE_AUTH, {
        variables: { token: user.token},
        onCompleted: (data1) => {
            setNewData(data.emerAlerts);
        },
        onError: (error) => {
            setManualError(error.message);
        }
    });

    useEffect(() => {
        if (user) {
            requireAuth();
        }
    }, [user, requireAuth]) */

    return (
        <Fragment>
            <Box sx={{ width: '100%', p: '2rem 4rem' }}>EMERGENCY ALERTS</Box>
            {data && 
                data.emerAlerts.map((emergency) => !emergency.isAccepted && (
                    <EmergencyDetails key={emergency._id} emergency={emergency} refetch={refetch} />
                ))}
        </Fragment>
    )
}
