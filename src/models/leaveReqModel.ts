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
  returndate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  leavedate: {
    type: Date,
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
  department: {
    type: String,
    required: true,
  },
});

const RequestModel = mongoose.model("requestModel", requestSchema);

export { RequestModel };
