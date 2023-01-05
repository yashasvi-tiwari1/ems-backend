import express from "express";
import { User } from "../models/userModel";
import { EmployeeModel } from "../models/employeeModel";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const router = express.Router();
dotenv.config();
const accessSecretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
router.post("/add", async (req, res) => {
  const { username, gmail, password, confirmpassword } = req.body;
  if (username && gmail && password && confirmpassword) {
    if (gmail.match(/(^\w{0,100}@gmail.com$|^\w{0,100}@outlook.com$)/g)) {
      if (password.length > 8) {
        if (password.match(/([(0-9)(A-Z)])/g)) {
          const employee = await EmployeeModel.findOne({ gmail });
          if (employee) {
            const role = employee.role;
            const hashPassword = await bcrypt.hash(password, 10);
            let adduser = new User({
              username,
              gmail,
              password: hashPassword,
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
        } else {
          res.send(
            "password must contain at-least one number and Uppercase letter"
          );
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
    console.log(user);
    if (user) {
      let result = comparePassword(password, user.password);
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          let tokeninfo = {
            role: user.role,
            username: user.username,
          };

          let accessToken = generateAccessToken(tokeninfo);
          let refreshToken = generateRefreshToken(tokeninfo);
          res
            .status(200)
            .json({ AccessToken: accessToken, RefreshToken: refreshToken });
        } else {
          res.status(403).send("password does not match");
        }
      });
    } else {
      res.status(403).send("No user for this gmail");
    }
  } else {
    res.sendStatus(403).send("fill up the form first");
  }
});

function generateAccessToken(tokenInfo: any) {
  return jsonwebtoken.sign(tokenInfo, `${accessSecretKey}`, {
    expiresIn: "10m",
  });
}

function generateRefreshToken(tokenInfo: any) {
  return jsonwebtoken.sign(tokenInfo, `${refreshSecretKey}`, {
    expiresIn: "1h",
  });
}

async function hashPassword(plainText: any) {
  return await bcrypt.hash(plainText, 10);
}

async function comparePassword(plainPassword: any, hashedPassword: any) {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
}

export { router as userRouter };
