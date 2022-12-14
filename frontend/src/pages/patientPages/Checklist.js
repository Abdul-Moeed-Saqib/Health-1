import React, { useState } from "react";
import styles from "./checkList.css";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { margin } from "@mui/system";
export default function Checklist() {
  const symptoms = [
    "Fever or chills",
    "Cough",
    "Fatigue",
    "Muscle or body aches",
    "Headache",
    "New loss of taste or smell",
    "Sore throat",
    "Congestion or runny nose",
    "Diarrhea",
    "Nausea or vomiting",
  ];
  const [checked, setChecked] = useState([]);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const checkedsym = checked.length
    ? checked.reduce((total, sym) => {
      return total + "      ,     " + sym;
    })
    : "";

  var isChecked = (sym) =>
    checked.includes(sym) ? "checked-item" : "not-checked-item";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checked.length === 0) {
      toast.success("Stay healthy!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return
    }
    if (checked.length >= 5) {
      toast.error("You need to go to the hospital!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (checked.length < 5) {
      toast.warning("You need to stay at home!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#fff', margin: '0 auto', maxWidth: '40vw', p: '1rem', opacity: '0.85' }}>
      <div className="checkList">
        <div className="title">COVID-19 symptoms</div>
        <form onSubmit={handleSubmit}>
          <div className="list-container">
            {symptoms.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
          </div>
          <button className="checkButton">Submit</button>
        </form>
      </div>
      <div>
        <h3>Selected symptoms:</h3>
        <div className="Selected">
          <p>{checkedsym}</p>
        </div>
      </div>
    </Box>
  );
}
