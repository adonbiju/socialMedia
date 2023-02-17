
import express from "express";
import { 
    getFeedPosts,
    getUserPosts,
    likePost,
    PostLikedUsersDetails,
    deletePost
    }from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.get("/:id/postLikedUsersDetails",verifyToken, PostLikedUsersDetails);

// delete single post
router.delete("/:id/:picturePath/deletePost",verifyToken,deletePost)
export default router;