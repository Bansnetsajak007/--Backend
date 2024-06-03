// package
import { Router } from "express";
const router = Router();
// items
import fetchuser from "../middleware/fetchuser.js";
import blogsController from "../controllers/blogsController.js";

// routes
router.get("/", fetchuser,  blogsController.get);
router.post("/newPost", fetchuser, blogsController.createPost);
router.get("/getpost/:id", fetchuser, blogsController.getPost);
router.put("/update/:id", fetchuser, blogsController.updatePost);  
router.delete("/delete/:id",fetchuser, blogsController.deletePost);  


export default router