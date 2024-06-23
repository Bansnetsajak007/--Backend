// package
import { Router } from "express";
const router = Router();
// items
import fetchuser from "../middleware/fetchuser.js";
import blogsController from "../controllers/blogsController.js";

// routes
router.get("/", blogsController.get);
router.get("/user/:userId", fetchuser, blogsController.getUserPosts);
router.post("/:userId", fetchuser, blogsController.createPost);
router.get("/:id", blogsController.getSinglePost);
router.patch("/:id", blogsController.updatePost);  
router.delete("/:id", blogsController.deletePost);  


export default router