import mongoose from "mongoose";
import { RequestModel } from "./leaveReqModel";

let requirementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  purpose: {
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
  isDelivered: {
    type: Boolean,
    required: true,
  },
});
const Requirement = mongoose.model("requirement", requirementSchema);

export { Requirement };