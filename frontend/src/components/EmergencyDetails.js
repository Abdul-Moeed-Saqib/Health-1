import { useMutation } from "@apollo/client";
import { useAuthContext } from "../hooks/useAuthContext";
import { UPDATE_EMERG } from "../mutations/emergencyMutations";
import { Box, Button, Typography, Card, CardContent, CardHeader, CardActions } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MyAvatar from '../components/miscellaneous/MyAvatar'
import { toastSuccessTop, toastErrorBot } from "../utils/utils";

const EmergencyDetails = ({ emergency, refetch }) => {
  const { user } = useAuthContext();
  const [updateEmergencyAlert] = useMutation(UPDATE_EMERG, {
    onCompleted: (data) => {
      toastSuccessTop('Emergency alert accepted!')
      refetch();
    },
    onError: (error) => {
      toastErrorBot(error.message);
    }
  });

  const acceptEmergency = (e) => {
    e.preventDefault();
    if (user) {
      updateEmergencyAlert({ variables: { id: emergency._id, isAccepted: true } });
    }
  }

  return (
    <Card sx={{ m: '0.8rem 0.8rem 0 0' }} key={emergency._id}>
      <CardHeader
        avatar={<MyAvatar username={emergency.patient.firstName} width='30px' height='30px' />}
        action={
          emergency.isAccepted ? '' :
            <Button variant='contained' color='success' aria-label="settings"
              sx={{ ml: '0.6rem' }} onClick={(e) => acceptEmergency(e)}>
              <LocalHospitalIcon fontSize='small' />
            </Button>
        }
        title={emergency.content}
        subheader={`Send by ${emergency.patient.firstName} ${emergency.patient.lastName} Located: ${emergency.patient.city}`}
      />
    </Card>
  );
};

export default EmergencyDetails;