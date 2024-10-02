import express from "express";
import { deleteUser, getSavedPosts, getUsers, profilePosts, savePost, updateUser } from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/", getUsers);
router.put("/:id/updateUser", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.post("/save", authMiddleware, savePost);
router.get("/users/savedPosts/:userId", authMiddleware, getSavedPosts);
router.get("/profilePosts", authMiddleware, profilePosts);




export default router;