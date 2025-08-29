import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  const newMsg = new Message({ name, email, message });
  await newMsg.save();
  res.status(201).json(newMsg);
});

export default router;
