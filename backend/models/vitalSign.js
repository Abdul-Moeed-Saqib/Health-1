const mongoose = require("mongoose");
const { Schema } = mongoose

const VitalSignSchema = new Schema({
  bodyTem: {
    type: Number,
  },
  heartRate: {
    type: Number,
  },
  BloodPre: {
    type: Number,
  },
  RespiratoryRate: {
    type: Number,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("VitalSign", VitalSignSchema);
