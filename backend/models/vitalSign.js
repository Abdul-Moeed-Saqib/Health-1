const mongoose = require("mongoose");
const { Schema } = mongoose

const VitalSignSchema = new Schema({
  bodyTem: {
    type: Number,
  },
  heartRate: {
    type: Number,
  },
  bloodPre: {
    type: Number,
  },
  respiratoryRate: {
    type: Number,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  diagnosis: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("VitalSign", VitalSignSchema);
