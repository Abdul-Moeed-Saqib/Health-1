import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom'
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from '../../mutations/userMutations';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Signup() {
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        address: '',
        city: '',
        phoneNumber: '',
        role: ''
    })

    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext();

    const [register] = useMutation(REGISTER_USER, {
        variables: { ...user },
        onCompleted: (data) => {
            localStorage.setItem('user', JSON.stringify(data.register));

            // updating the auth context
            dispatch({type: 'LOGIN', payload: data.register});
            setIsLoading(false);
        },
        onError: (error) => {
            alert(error.message);
            setIsLoading(false);
        }
    })

    const navigate = useNavigate()

    const signup = async (e) => {
        e.preventDefault();
        await register(user);
        setIsLoading(true);
    }

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={signup}>
            <TextField
                required
                label="Email"
                type='email'
                sx={{ minWidth: '400px', margin: '5px 0' }}
                value={user.email}
                onChange={e => { setUser({ ...user, email: e.target.value }) }}
            />
            <TextField
                required
                type="password"
                label="Password"
                sx={{ minWidth: '400px', margin: '5px 0' }}
                onChange={e => { setUser({ ...user, password: e.target.value }) }}
            />
            <TextField
                required
                label="First Name"
                sx={{ minWidth: '400px', margin: '5px 0' }}
                value={user.firstName}
                onChange={e => { setUser({ ...user, firstName: e.target.value }) }}
            />
            <TextField
                required
                label="Last Name"
                sx={{ minWidth: '400px', margin: '5px 0' }}
                value={user.lastName}
                onChange={e => { setUser({ ...user, lastName: e.target.value }) }}
            />
            <FormControl fullWidth sx={{ minWidth: '400px', margin: '5px 0' }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.role}
                    label="Role"
                    onChange={e => { setUser({ ...user, role: e.target.value }) }}
                >
                    <MenuItem value={'nurse'}>Nurse</MenuItem>
                    <MenuItem value={'patient'}>Patient</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                label="Address"
                sx={{ minWidth: '400px', margin: '5px 0' }}
                value={user.address}
                onChange={e => { setUser({ ...user, address: e.target.value }) }}
            />
            <TextField
                required
                label="City"
                sx={{ minWidth: '400px', margin: '5px 0' }}
                value={user.city}
                onChange={e => { setUser({ ...user, city: e.target.value }) }}
            />
            <TextField
                required
                label="Phone Number"
                sx={{ minWidth: '400px', margin: '5px 0' }}
                value={user.phoneNumber}
                onChange={e => { setUser({ ...user, phoneNumber: e.target.value }) }}
            />

            <Button type="submit" variant="contained" sx={{ mt: '10px', fontSize: '18px' }} disabled={isLoading}>Sign Up</Button>
        </Box>
    )
}
