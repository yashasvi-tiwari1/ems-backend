import mongoose from "mongoose";
import { employeeRouter } from "../routes/employeeRoutes";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
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
  role:{
    type:String,
    required:true,
  }
});
employeeSchema.index({'gmail':1})
const EmployeeModel = mongoose.model("EmployeeModel", employeeSchema);
export { EmployeeModel };
