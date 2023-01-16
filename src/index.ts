import express from "express";
import { json } from "body-parser";
import { employeeRouter } from "./routes/employeeRoutes";
import { requestRouter } from "./routes/leaveReqRoutes";
import { userRouter } from "./routes/userRoutes";
import { refreshRouter } from "./routes/refreshRoutes";
import { requirementRouter } from "./routes/requirementRoutes";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(json());
app.use(cors());
const PORT = process.env.PORT;
app.use("/employee", employeeRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);
app.use("/ref", refreshRouter);
app.use("/requirement", requirementRouter);

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/EmployeeMS", () => {
  console.log("connected to database");
});

app.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}`);
});
