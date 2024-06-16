// package
import { Router } from "express";
const router = Router();
// items
import marketplaceController from "../controllers/marketplaceController.js";
import fetchuser from "../middleware/fetchuser.js";
import fileUpload from "../middleware/fileUpload.js";

// routes
router.get("/", fetchuser, marketplaceController.get);
// posts that user had created
router.get("/posts", fetchuser, marketplaceController.getUserSpecificPost); 
// no user specific, ( any post )
router.get("/post/:itemId", marketplaceController.getIndividualPost);

router.post("/post/create", fetchuser, fileUpload.single("pictureUrl"), marketplaceController.createPost);
router.patch("/post/:itemId", fetchuser, fileUpload.single("pictureUrl"), marketplaceController.updatePost);
router.delete("/post/:itemId", fetchuser, marketplaceController.deletePost);


export default router