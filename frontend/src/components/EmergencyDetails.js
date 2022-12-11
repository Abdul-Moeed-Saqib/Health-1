import { useMutation } from "@apollo/client";
import { useAuthContext } from "../hooks/useAuthContext";
import { UPDATE_EMERG } from "../mutations/emergencyMutations";

const EmergencyDetails = ({ emergency }) => {
    const { user } = useAuthContext();
    const [updateEmergencyAlert] = useMutation(UPDATE_EMERG, {
        onCompleted: (data) => {
            
        }
    })

    return ( 
        <div className="emergency-details">

        </div>
     );
}
 
export default EmergencyDetails;