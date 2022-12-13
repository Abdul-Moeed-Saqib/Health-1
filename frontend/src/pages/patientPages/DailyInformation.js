import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { ADD_VITAL } from "../../mutations/vitalSignMutation";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function DailyInformation() {
  const navigate = useNavigate();
  const [dailyInfo, setDailyInfo] = useState({
    bodyTem: "",
    heartRate: "",
    bloodPre: "",
    respiratoryRate: "",
  });
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const [addVitalSign] = useMutation(ADD_VITAL, {
    onCompleted: (addVitalSignData) => {
      console.log("addVitalSignData", addVitalSignData);
      toast.success("Vital Sign added", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add vital sign", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (user) {

      addVitalSign({
        variables: {
          ...dailyInfo,
          patientId: user._id,
        },
      });
    
    }
  };

  const onChange = (e) => {
    e.persist();
    setDailyInfo({
      ...dailyInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="Body Temperature"
        type="number"
        sx={{ minWidth: "400px", margin: "5px 0" }}
        value={dailyInfo.bodyTem}
        name="bodyTem"
        onChange={onChange}
      />
      <TextField
        required
        type="number"
        label="Heart Rate"
        sx={{ minWidth: "400px", margin: "5px 0" }}
        value={dailyInfo.heartRate}
        name="heartRate"
        onChange={onChange}
      />
      <TextField
        required
        label="Blood Pressure"
        type="number"
        sx={{ minWidth: "400px", margin: "5px 0" }}
        value={dailyInfo.bloodPre}
        name="bloodPre"
        onChange={onChange}
      />
      <TextField
        required
        label="Respiratory Rate"
        type="number"
        sx={{ minWidth: "400px", margin: "5px 0" }}
        value={dailyInfo.respiratoryRate}
        name="respiratoryRate"
        onChange={onChange}
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
