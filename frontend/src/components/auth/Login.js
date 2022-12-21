import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from '../../mutations/userMutations'
import { useAuthContext } from '../../hooks/useAuthContext';
import { toastErrorBot } from '../../utils/utils'

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { dispatch } = useAuthContext()

    const navigate = useNavigate()

    const [login] = useMutation(LOGIN_USER, {
        variables: { ...user },
        onCompleted: (data) => {
            const { login } = data
            localStorage.setItem('user', JSON.stringify(login));
            localStorage.setItem('auth', data.login.token)
            // updating the auth context
            dispatch({ type: 'LOGIN', payload: login });
            if (login.role === 'nurse') {
                navigate('/')
            }
        },
        onError: (error) => {
            toastErrorBot(error.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        login()
    }

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
            <TextField
                type='text'
                required
                label="Email"
                sx={{ minWidth: '400px', margin: '10px 0' }}
                value={user.email}
                onChange={e => { setUser({ ...user, email: e.target.value }) }}
            />
            <TextField
                required
                type="password"
                label="Password"
                sx={{ minWidth: '400px', margin: '10px 0' }}
                onChange={e => { setUser({ ...user, password: e.target.value }) }}
            />
            <Button type="submit" variant="contained" sx={{ mt: '10px', fontSize: '18px' }}>Log In</Button>
        </Box>
    )
}
