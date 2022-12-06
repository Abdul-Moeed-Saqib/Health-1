const mongoose = require("mongoose");

const EmerAlertSchema = new mongoose.Schema({
  Content: {
    type: String,
  },
  isAccepted: {
    type: Boolean,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("EmerAlert", EmerAlertSchema);
