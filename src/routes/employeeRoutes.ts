import express, { Request, Response } from "express";
import { EmployeeModel } from "../models/employeeModel";
import tokenvalidation from "../middleware/tokenvalidation";
const router = express.Router();

router.get("/", [], async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).send(employees);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get(
  "/search/:searchkeyword",
  [],
  async (req: Request, res: Response) => {
    try {
      const search = req.params.searchkeyword;
      const searchEmployee = await EmployeeModel.find({
        name: { $regex: /".*" + search + ".*"/i, },
      });
      res.status(200).send(searchEmployee);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);
router.get("/:position", [], async (req: Request, res: Response) => {
  try {
    const positionEmployee = await EmployeeModel.find({
      position: req.params.position,
    });
    res.status(200).send(positionEmployee);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/add", tokenvalidation, async (req, res) => {
  try {
    const { name, position, address, phone, gmail, date, role } = req.body;
    const employeeDetail = await EmployeeModel.findOne({ gmail:gmail });
    console.log(employeeDetail);
    if (!employeeDetail) {
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
    } else {
      res.status(401).send("Employee already created");
    }
  } catch (err) {
    res.status(401).send(err);
  }
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
