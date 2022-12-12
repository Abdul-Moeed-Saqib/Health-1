import { Box } from '@mui/material'
import React, { Fragment } from 'react'

import { useQuery } from "@apollo/client"

import { QUERY_EMERGENCIES } from '../queries/Emergencies'

export default function NurseHome() {

    const { data: emergencies, loading, error, refetch } = useQuery(QUERY_EMERGENCIES, {
        fetchPolicy: 'network-only'
    })

    if (loading) {
        return <div>Loading</div>
    }

    if (error) {
        console.log(error);
        return <div>{error.message}</div>
    }

    return (
        <Fragment>
            <Box sx={{ width: '100%', p: '2rem 4rem' }}>
                {
                    !loading && emergencies.map(e => (
                        <Fragment key={e.id}>
                            <div>{e.content}</div>
                        </Fragment>
                    ))
                }
            </Box>
        </Fragment>
    )
}
