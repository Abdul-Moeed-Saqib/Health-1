const mongoose = require("mongoose");
const { Schema } = mongoose

const EmerAlertSchema = new Schema({
  content: {
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
