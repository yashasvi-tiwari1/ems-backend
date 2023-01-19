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
//
mongodb: mongoose.set("strictQuery", true);
var mongoUrl = "mongodb://localhost:27017/EmployeeMS";

var connectWithRetry = function () {
  return mongoose.connect(mongoUrl, function (err) {
    if (err) {
      console.error(
        "Failed to connect to mongo on startup - retrying in 5 sec",
        err
      );
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("database connected");
    }
  });
};
connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}`);
});
