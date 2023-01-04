import express from "express";
import { User } from "../models/userModel";
import { EmployeeModel } from "../models/employeeModel";
import jsonwebtoken from "jsonwebtoken"
    const router = express.Router();
router.post("/add", async (req, res) => {
  const { username, gmail, password, confirmpassword } = req.body;
  const employee = await EmployeeModel.findOne({gmail});
    if (employee) {
      let adduser = new User({
        username,
        gmail,
        password,
      });
      try {
        adduser.save();
        res.sendStatus(201);
      } catch (err) {
        res.send(err);
      }
    }
    else{
      res.send("you are not an employee")
    }
  });
const HMACSHA256 = (stringToSign, secret) => "not_implemented"

const header = {
  "alg": "HS256",
  "typ": "JWT",
  "kid": "vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe/4f4910"
}
const encodedHeaders = btoa(JSON.stringify(header))



const claims = {
  "role": "admin"
}
const encodedPlayload = btoa(JSON.stringify(claims))


const signature = HMACSHA256(`${encodedHeaders}.${encodedPlayload}`, "mysecret")
const encodedSignature = btoa(signature)

const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
console.log({jwt})

router.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  const user = await User.findOne({gmail});
  if(user){
    if(req.body.password === user.password){
      res.send(user);
    }
    else {
      res.send("password does not match");
    }
  }
  else {
    res.send("No user for this gmail");
  }
});

export { router as userRouter };
