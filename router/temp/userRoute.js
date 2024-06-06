// package
import {Router} from "express";
import userController from "../../controllers/temp/userController.js"
const router = Router();

// routes
router.get("/:userId", userController.get);
export default router;
