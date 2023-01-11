import express from "express";
import { User } from "../models/userModel";
import { EmployeeModel } from "../models/employeeModel";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Validation from "../middleware/validation";

const router = express.Router();
dotenv.config();
const accessSecretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
router.post("/add", Validation, async (req, res) => {
  const { username, gmail, password, confirmpassword } = req.body;
  const employee = await EmployeeModel.findOne({ gmail });
  const user = await User.findOne({ gmail });
  if (employee) {
    if (!user) {
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
        res.status(201);
      } catch (err) {
        res.send(err);
      }
    } else {
      res.status(403).send("User already created");
    }
  } else {
    res.status(403).send("you are not an employee");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { gmail, password } = req.body;
    if (gmail && password) {
      const user = await User.findOne({ gmail });
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
            res.status(200).json({
              AccessToken: accessToken,
              RefreshToken: refreshToken,
              role: user.role,
              username: user.username,
            });
          } else {
            res.status(403).send("password does not match");
          }
        });
      } else {
        res.status(403).send("No user for this gmail");
      }
    } else {
      res.status(403).send("fill up the form first");
    }
  } catch (err) {
    res.status(401).send(err);
  }
});

function generateAccessToken(tokenInfo: any) {
  return jsonwebtoken.sign(tokenInfo, `${accessSecretKey}`, {
    expiresIn: "1h",
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
