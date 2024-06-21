// package
import {Router} from "express";
import userController from "../controllers/userController.js";
const router = Router();

// routes
router.get("/:userId", userController.getUserInfo);
router.get("/conversation/:userId", userController.getConversation);
export default router;
