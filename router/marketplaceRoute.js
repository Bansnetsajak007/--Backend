// package
import { Router } from "express";
const router = Router();
// items
import marketplaceController from "../controllers/marketplaceController.js";
import fetchuser from "../middleware/fetchuser.js";

// routes
router.get("/", marketplaceController.get);
router.post("/create", marketplaceController.createPost);

export default router