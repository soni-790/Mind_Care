import express from "express";
import Meditation from "../models/Meditation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const meditations = await Meditation.find();
  res.json(meditations);
});

router.post("/", async (req, res) => {
  const meditation = new Meditation(req.body);
  await meditation.save();
  res.status(201).json(meditation);
});

export default router;
