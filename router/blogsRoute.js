// package
import { Router } from "express";
const router = Router();
// items
import fetchuser from "../middleware/fetchuser.js";
import blogsController from "../controllers/blogsController.js";

// routes
// router.get("/", blogsController.get);

export default router