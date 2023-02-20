
import express from "express";
import { 
    getFeedPosts,
    getUserPosts,
    likePost,
    postLikedUsersDetails,
    deletePost,
    createComment,
    postCommentedUsersDetails
    }from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


router.patch("/:id/like", verifyToken, likePost);
router.get("/:id/postLikedUsersDetails",verifyToken, postLikedUsersDetails);
router.patch("/:id/comment", verifyToken,createComment);
router.get("/:id/postCommentedUsersDetails", postCommentedUsersDetails);

/* delete single post */
router.delete("/:id/:picturePath/deletePost",verifyToken,deletePost)
export default router;