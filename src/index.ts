import express from "express";
import { json } from "body-parser";
import { employeeRouter } from "./routes/employee";
import * as mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());
const PORT = 4000;
app.use(employeeRouter);

mongoose.connect("mongodb://127.0.0.1:27017/employee", () => {
  console.log("connected to database that maliscous age");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
