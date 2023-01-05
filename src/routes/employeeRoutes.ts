import express, { Request, Response } from "express";
import { EmployeeModel } from "../models/employeeModel";
import jsonwebtoken from "jsonwebtoken";
import TokenValidation from "../middleware/tokenvalidation";
const router = express.Router();


router.get("/", [], async (req: any, res: any) => {
  const employees = await EmployeeModel.find();
  res.send(employees);
});

router.post("/add", TokenValidation,async (req, res) => {

  const { name, position, address, phone, gmail, date, role } = req.body;
    const data = await new EmployeeModel({
      name,
      position,
      address,
      phone,
      gmail,
      date,
      role,
    });
    const employee = await data.save();
    res.sendStatus(201);
});

router.put("/edit/:id", async (req, res) => {
  const editemp = await EmployeeModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.sendStatus(200);
});

router.delete("/delete/:id", async (req, res) => {
  const delemp = await EmployeeModel.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

export { router as employeeRouter };
