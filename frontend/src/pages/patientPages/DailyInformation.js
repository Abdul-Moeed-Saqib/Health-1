import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { ADD_VITAL } from "../../mutations/vitalSignMutation";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function DailyInformation() {
    const navigate = useNavigate();
    const location = useLocation()

    const patientId = location.state?.patientId

    if (!patientId) {
        navigate('/')
    }

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
            const { bloodPre, bodyTem, heartRate, respiratoryRate } = dailyInfo
            addVitalSign({
                variables: {
                    bloodPre: parseFloat(bloodPre),
                    bodyTem: parseFloat(bodyTem),
                    heartRate: parseFloat(heartRate),
                    respiratoryRate: parseFloat(respiratoryRate),
                    patientId
                },
            });

        }
    };

    const onChange = (e) => {
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
                label="Body Temperature (36 - 40)"
                type="number"
                sx={{ minWidth: "400px", margin: "5px 0" }}
                value={dailyInfo.bodyTem}
                name="bodyTem"
                onChange={onChange}
            />
            <TextField
                required
                type="number"
                label="Heart Rate (60 - 100)"
                sx={{ minWidth: "400px", margin: "5px 0" }}
                value={dailyInfo.heartRate}
                name="heartRate"
                onChange={onChange}
            />
            <TextField
                required
                label="Blood Pressure (80 - 170)"
                type="number"
                sx={{ minWidth: "400px", margin: "5px 0" }}
                value={dailyInfo.bloodPre}
                name="bloodPre"
                onChange={onChange}
            />
            <TextField
                required
                label="Respiratory Rate (12 - 20)"
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
