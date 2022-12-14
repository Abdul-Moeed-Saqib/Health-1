import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation} from '@apollo/client';
import { ADD_MOTIVATIONALTIP } from "../mutations/motivationalTipsMutations";
import { useAuthContext } from "../hooks/useAuthContext";

const MotivationalTips = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');

    const { user } = useAuthContext();

    const [addMotivationalTip] = useMutation(ADD_MOTIVATIONALTIP, {
        onCompleted: (data) => {
            setIsLoading(false);
            navigate('/');
        },
        onError: (error) =>{
            alert(error.message);
            setIsLoading(false);
        }
    })

    const createMotivationalTip = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (user) {
            const client = addMotivationalTip({ variables: {description}});
            console.log(client);
        }
    }

    return ( 
        <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column" }}
            onSubmit={createMotivationalTip}
        >
            <Typography variant='h4' sx={{ mb: '1rem', textAlign: 'center' }}>Create Motivational Tip</Typography>
            <TextField
                required
                label="Please type a motivational tip"
                type="text"
                sx={{ minWidth: "400px", margin: "5px 0" }}
                value={description}
                name="bodyTem"
                onChange={e => { setDescription(e.target.value) }}
            />
            
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: "10px", fontSize: "18px" }}
                disabled={isLoading}
            >
                Submit
            </Button>
        </Box>
     );
}
 
export default MotivationalTips;