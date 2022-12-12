import { useMutation } from "@apollo/client";
import { useAuthContext } from "../hooks/useAuthContext";
import { UPDATE_EMERG } from "../mutations/emergencyMutations";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const EmergencyDetails = ({ emergency, refetch }) => {
  const { user } = useAuthContext();
  const [updateEmergencyAlert] = useMutation(UPDATE_EMERG, {
    onCompleted: (data) => {
      refetch();
    },
  });

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Send By {emergency.patient.firstName + " " + emergency.patient.lastName}
        </Typography>
        <Typography variant="body2">
        <p>{emergency.content}</p>
        <p><strong>Located: </strong>{emergency.patient.city}</p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmergencyDetails;