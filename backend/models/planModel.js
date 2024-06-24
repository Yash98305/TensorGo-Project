const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String},
  price: { type: Number},
  description:{
    type: String,
  },
  features: {
    type: String,
  },
  apiKey: {
    type: String,
  },
  userLimit: { type: Number },
});

module.exports = mongoose.model("Plan", planSchema);
