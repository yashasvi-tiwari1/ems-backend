import express, { Request, Response } from "express";
import { Requirement } from "../models/requerementmodel";
import { RequestModel } from "../models/leaveReqModel";

let router = express.Router();

router.get("/", async (req, res) => {
  try {
    const requirementsList = await Requirement.find();
    res.status(200).send(requirementsList);
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
      const searchRequest = await Requirement.find({
        name: { $regex: new RegExp(".*" + search + ".*", "i") },
      });
      res.status(200).send(searchRequest);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);
router.get(
  "/search/pending:searchkeyword",
  [],
  async (req: Request, res: Response) => {
    try {
      const search = req.params.searchkeyword;
      const searchRequest = await Requirement.find({
        name: { $regex: new RegExp(".*" + search + ".*", "i") },
        isActive: true,
      });
      res.status(200).send(searchRequest);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);
router.post("/add", async (req, res) => {
  try {
    const { name, gmail, instrument, quantity, project } = req.body;
    if (name && gmail && instrument && quantity && project) {
      const isAccepted = false;
      const isActive = true;
      const isDelivered = false;
      const RequirementList = new Requirement({
        name,
        gmail,
        instrument,
        quantity,
        project,
        isAccepted,
        isActive,
        isDelivered,
      });
      const require = RequirementList.save();
      res.status(201).send("Requirement request submitted successfully");
    }
  } catch (err) {
    res.status(401).send(err);
  }
});

router.put("/accept/:id", async (req, res) => {
  try {
    const accRequest = await Requirement.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(201).send("Requirement Request Accepted Successfully");
  } catch (err) {
    res.status(401).send(err);
  }
});

router.put("/reject/:id", async (req, res) => {
  try {
    const accRequest = await Requirement.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(201).send("Requirement Request Accepted Successfully");
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/pending", async (req, res) => {
  try {
    const pendingRequirements = await Requirement.find({ isActive: true });
    res.status(201).send(pendingRequirements);
  } catch (err) {
    res.status(401).send(err);
  }
});
