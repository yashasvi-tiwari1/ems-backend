import { Request, Response, NextFunction } from "express";
import { EmployeeModel } from "../models/employeeModel";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";

const Validation = (req: Request, res: Response, next: NextFunction) => {
  const { username, gmail, password, confirmpassword } = req.body;
  if (username && gmail && password && confirmpassword) {
    if (gmail.match(/(^\w{0,100}@gmail.com$|^\w{0,100}@outlook.com$)/g)) {
      if (password.length > 8) {
        if (password.match(/([(0-9)(A-Z)])/g)) {
          next();
        } else {
          res
            .status(403)
            .send(
              "password must contain at-least one number and Uppercase letter"
            );
        }
      } else {
        res.status(403).send("password length must be at-least 8 characters");
      }
    } else {
      res.status(403).send("Email format doesnot match");
    }
  } else {
    res.status(403).send("please fill up the form first");
  }
};

export default Validation;
