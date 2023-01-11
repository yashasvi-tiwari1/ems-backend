import express from "express";
import { RequestModel } from "../models/leaveReqModel";
import TokenValidation from "../middleware/tokenvalidation";
const router = express.Router();

router.get("/", TokenValidation, async (req, res) => {
  try {
    const requests = RequestModel.find();
    res.status(200).send(requests);
  } catch (err) {
    res.status(400).send(err);
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
  } = req.body;
  let isActive = true;
  let isAccepted = false;
  if (
    name &&
    reason &&
    leavedate &&
    returndate &&
    description &&
    supervisor &&
    gmail
  ) {
    if (gmail.match(/(^\w{0,100}@gmail.com$|^\w{0,100}@outlook.com$)/g)) {
      const addreq = new RequestModel({
        name,
        reason,
        leavedate,
        returndate,
        description,
        isAccepted,
        isActive,
        supervisor,
        gmail,
      });
      try {
        const request = await addreq.save();
        res.status(201);
      } catch (err) {
        res.send(err);
      }
    } else {
      res.status(401).send("Gmail format doesnot match");
    }
  } else {
    res.status(401).send("Employee already exist");
  }
});

router.put("/acccept/:id", TokenValidation, async (req, res) => {
  try {
    const accReq = await RequestModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/reject/:id", TokenValidation, async (req, res) => {
  try {
    const accReq = await RequestModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200);
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
    res.status(200).send(pendingrequests);
  } catch (err) {
    res.status(403).send(err);
  }
});
export { router as requestRouter };
