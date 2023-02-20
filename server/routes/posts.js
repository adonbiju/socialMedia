
import express from "express";
import { 
    getFeedPosts,
    getUserPosts,
    likePost,
    PostLikedUsersDetails,
    deletePost,
    createComment
    }from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


router.patch("/:id/like", verifyToken, likePost);
router.get("/:id/postLikedUsersDetails",verifyToken, PostLikedUsersDetails);
router.patch("/:id/comment", verifyToken,createComment);

/* delete single post */
router.delete("/:id/:picturePath/deletePost",verifyToken,deletePost)
export default router;