import express from "express";
import { RequestModel } from "../models/leaveReqModel";

const router = express.Router();

router.get("/", async (req, res) => {
  const requests = RequestModel.find();
  res.send(requests);
});
router.post("/add", async (req, res) => {
  const { name, date, reason, days, gmail, isAccepted, isActive } = req.body;

  const addreq = new RequestModel({
    name,
    date,
    reason,
    days,
    isAccepted,
    isActive,
    gmail,
  });
  try {
    const request = await addreq.save();
    res.sendStatus(201);
  } catch (err) {
    res.send(err);
  }
});

router.put("/acccept/:id", async (req, res) => {
  const accReq = await RequestModel.findByIdAndUpdate(req.params.id, req.body);
  res.sendStatus(200);
});

router.put("/reject/:id", async (req, res) => {
  const accReq = await RequestModel.findByIdAndUpdate(req.params.id, req.body);
  res.sendStatus(200);
});

export { router as requestRouter };
