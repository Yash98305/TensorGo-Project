const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  planStartDate: {
    type: String,
  },
  planEndDate: {
    type: String,
  },
  planDuration: {
    type: Number,
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
