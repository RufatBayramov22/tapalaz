import express from "express";
import {authMiddleware} from "../middleware/verifyToken.js"
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/addPost", authMiddleware, addPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
