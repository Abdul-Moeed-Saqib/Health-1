import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useMutation} from '@apollo/client';
import { ADD_EMERG } from '../mutations/emergencyMutations';
//import { REQUIRE_AUTH } from '../mutations/userMutations';
import { useAuthContext } from '../hooks/useAuthContext';

const CallEmergency = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(null);

    const { user } = useAuthContext();

    const [addEmergencyAlert] = useMutation(ADD_EMERG, {
        onCompleted: (data) => {
            setIsLoading(false);
            navigate('/');
        },
        onError: (error) => {
            alert(error.message);
            setIsLoading(false);
        }
    })
    /* const [requireAuth] = useMutation(REQUIRE_AUTH, {
        variables: { token: user.token},
        onCompleted: (data) => {
            const patientId = data.requireAuth._id;
            addEmergencyAlert({ variables: {content, patientId}});
        },
        onError: (error) => {
            alert(error.message);
        }
    }); */


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        if (user) {
            addEmergencyAlert({variables: {content}});
        }
    }

    return ( 
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
            <Typography variant='h4' sx={{ mb: '1rem', textAlign: 'center' }}>SEND EMERGENCY</Typography>
                <TextField
                    type='text'
                    required
                    label="What is the issue?"
                    sx={{ minWidth: '400px', margin: '10px 0' }}
                    value={content}
                    onChange={e => { setContent(e.target.value) }}
                />
                <Button type="submit" variant="contained" sx={{ mt: '10px', fontSize: '18px' }} disabled={isLoading}>Send</Button>
            </Box>
     );
}
 
export default CallEmergency;