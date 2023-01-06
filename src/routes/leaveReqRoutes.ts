import express from "express";
import { RequestModel } from "../models/leaveReqModel";
import TokenValidation from "../middleware/tokenvalidation";
const router = express.Router();

router.get("/", TokenValidation,async (req, res) => {
  try {
    const requests = RequestModel.find();
    res.sendStatus(200).send(requests);
  }
  catch (err){
    res.sendStatus(400).send(err);
  }
});
router.post("/add", async (req, res) => {
  const { name, leavedate,returndate, reason,description,supervisor, gmail } = req.body;
  let isActive = true;
  let isAccepted = false;
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
    res.sendStatus(201);
  } catch (err) {
    res.send(err);
  }
});

router.put("/acccept/:id", TokenValidation, async (req, res) => {
  try {
    const accReq = await RequestModel.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  }
  catch (err){
    res.sendStatus(400).send(err);
  }

});

router.put("/reject/:id", TokenValidation,async (req, res) => {
  try {
    const accReq = await RequestModel.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  }
  catch (err){
    res.sendStatus(400).send(err);
  }
});



export { router as requestRouter };
