import mongoose from "mongoose";
import { employeeRouter } from "../routes/employee";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
});
const Employee = mongoose.model("Employee", employeeSchema);
export { Employee };
