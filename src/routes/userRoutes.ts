import express from "express";
import { User } from "../models/userModel";
import { EmployeeModel } from "../models/employeeModel";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
const secretKey = process.env.TOKEN_SECRET;
router.post("/add", async (req, res) => {
  const { username, gmail, password, confirmpassword } = req.body;
  if (username && gmail && password && confirmpassword) {
    if (gmail.match(/(^\w{0,100}@gmail.com$|^\w{0,100}@outlook.com$)/g)) {
      if (password.length < 8) {
        if(password.match(/([0-9,A-Z])/g)){
          const employee = await EmployeeModel.findOne({gmail});
          if (employee) {
            const role = employee.role;
            let adduser = new User({
              username,
              gmail,
              password,
              role,
            });
            try {
              adduser.save();
              res.sendStatus(201);
            } catch (err) {
              res.send(err);
            }
          } else {
            res.send("you are not an employee");
          }
        }else {
          res.send("password must contain at-least one number and Uppercase letter");
        }
      } else {
        res.send("password length must be at-least 8 characters");
      }
    } else {
      res.send("Email format doesnot match");
    }
  } else {
    res.send("please fill up the form first");
  }
});

router.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  if (gmail && password) {
    const user = await User.findOne({ gmail });
    if (user) {
      if (req.body.password === user.password) {
        let token = jsonwebtoken.sign(
          {
            role: user.role,
            username: user.username,
          },
          `${secretKey}`,
          { expiresIn: "1h" }
        );
        res.send(token);
        const decoded = jsonwebtoken.verify(token, `${secretKey}`);
        const string = JSON.stringify(decoded);
        const decode = JSON.parse(`${string}`);
      } else {
        res.send("password does not match");
      }
    } else {
      res.send("No user for this gmail");
    }
  } else {
    res.send("fill up the form first");
  }
});

export { router as userRouter };
