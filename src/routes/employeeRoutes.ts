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

router.post("/add",tokenvalidation,async (req, res) => {
  const { name, position, address, phone, gmail, date, role } = req.body;
  try {
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
    res.sendStatus(201).send("employee created");
  }
  catch (err){
    res.sendStatus(400).send(err);
  }

});

router.put("/edit/:id", async (req, res) => {
  try {

  const editemp = await EmployeeModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.sendStatus(200).send("employee information updated");
  }
  catch (err){
    res.sendStatus(401).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {

  const delemp = await EmployeeModel.findByIdAndDelete(req.params.id);
  res.sendStatus(200).send("employee Deleted");
  }
  catch (err){
    res.sendStatus(401).send(err)
  }
});

export { router as employeeRouter };
