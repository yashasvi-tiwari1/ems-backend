import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const RequestModel = mongoose.model("requestModel", requestSchema);

export { RequestModel };
