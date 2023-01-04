import express from "express";
import { json } from "body-parser";
import { employeeRouter } from "./routes/employeeRoutes";
import { requestRouter } from "./routes/leaveReqRoutes";
import { userRouter } from "./routes/userRoutes";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());
const PORT = 4000;
app.use("/employee", employeeRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/EmployeeMS", () => {
  console.log("connected to database");
});

app.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}`);
});
