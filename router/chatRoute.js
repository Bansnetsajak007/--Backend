// package
import { Router } from "express";
const router = Router();
// items
import fetchuser from "../middleware/fetchuser.js";
import chatController from "../controllers/chatController.js";

// routes
// router.get("/", chatController.get);

export default router