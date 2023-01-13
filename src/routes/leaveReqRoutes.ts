import express from "express";
import { RequestModel } from "../models/leaveReqModel";
import TokenValidation from "../middleware/tokenvalidation";
import { EmployeeModel } from "../models/employeeModel";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const requests = await RequestModel.find();
    res.status(200).send(requests);
  } catch (err) {
    console.log('error ma aaxa');
    res.status(401).send(err);
  }
});
router.post("/add", async (req, res) => {
  const {
    name,
    leavedate,
    returndate,
    reason,
    description,
    supervisor,
    gmail,
    department,
  } = req.body;
  let employeeDetails = await EmployeeModel.findOne({ gmail });
  let isActive = true;
  let isAccepted = false;
  if (employeeDetails) {
    if (
      name &&
      reason &&
      leavedate &&
      returndate &&
      description &&
      supervisor &&
      gmail &&
      department
    ) {
      if (gmail.match(/(^\w{0,100}@gmail.com$|^\w{0,100}@outlook.com$)/g)) {
        const addreq = new RequestModel({
          name,
          reason,
          leavedate,
          returndate,
          description,
          position: employeeDetails.position,
          phone: employeeDetails.phone,
          isAccepted,
          isActive,
          supervisor,
          department,
          gmail,
        });
        try {
          const request = await addreq.save();
          res.status(201).send("Request Submitted");
        } catch (err) {
          res.send(err);
        }
      } else {
        res.status(401).send("Gmail format doesnot match");
      }
    } else {
      res.status(401).send("You are not an employee");
    }
  } else {
    res.status(401).send("Fill up the form");
  }
});

router.put("/accept/:id", TokenValidation, async (req, res) => {
  try {
    const accReq = await RequestModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log('yeta aaxa')
    res.status(200).send("Request Accepted");
  } catch (err) {
    console.log('uta aaxa')
    res.status(400).send(err);
  }
});

router.put("/reject/:id", TokenValidation, async (req, res) => {
  try {
    const accReq = await RequestModel.findByIdAndUpdate(
      req.params.id,
      req.body

    );
    res.status(200).send("Request rejected");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/pending", TokenValidation, async (req, res) => {
  try {
    console.log("aayo");
    const pendingrequests = await RequestModel.find({
      isActive: true,
      isAccepted: false,
    });
    console.log(pendingrequests)
    res.status(200).send(pendingrequests);
  } catch (err) {
    res.status(403).send(err);
  }
});

router.delete("/delete",async (req,res)=>{
  const deleted = await RequestModel.deleteMany();
  res.send("vayo vayo")
})


export { router as requestRouter };
