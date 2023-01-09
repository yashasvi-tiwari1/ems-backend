import express, { Request, Response } from "express";
import { EmployeeModel } from "../models/employeeModel";
import jsonwebtoken from "jsonwebtoken";
import TokenValidation from "../middleware/tokenvalidation";
import tokenvalidation from "../middleware/tokenvalidation";
const router = express.Router();

router.get("/", [], async (req: any, res: any) => {
  const employees = await EmployeeModel.find();
  res.send(employees);
});

router.post("/add", tokenvalidation, async (req, res) => {
  const { name, position, address, phone, gmail, date, role } = req.body;
  const data = await new EmployeeModel({
    name: name,
    position: position,
    address: address,
    phone: phone,
    gmail: gmail,
    date: date,
    role: role,
  });
  const employee = await data.save();
  res.status(201).send("employee created");
});

router.put("/edit/:id", async (req, res) => {
  try {
    const editemp = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send("employee information updated");
  } catch (err) {
    res.status(401).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const delemp = await EmployeeModel.findByIdAndDelete(req.params.id);
    res.status(200).send("employee Deleted");
  } catch (err) {
    res.status(401).send(err);
  }
});

export { router as employeeRouter };
