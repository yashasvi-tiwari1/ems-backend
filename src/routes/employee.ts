import express, { Request, Response } from "express";
import { Employee } from "../models/employee";

const router = express.Router();

router.get("/", [], async (req: any, res: any) => {
  const data = await Employee.find((err: any, data: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/addemployee", async (req, res) => {
  const { name, position, number, gmail } = req.body;
  console.log(req.body);
  const data = await Employee.create({
    name: name,
    position: position,
    number: number,
    gmail: gmail,
  });
  const employee = await data.save();
  res.send(employee);
});
export { router as employeeRouter };
