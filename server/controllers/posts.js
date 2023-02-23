import Post from "../models/Post.js";
import User from "../models/User.js";
import { unlinkSync,existsSync } from "fs";
import mongoose from "mongoose";
/* CREATE */
export const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };

  /* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ updatedAt: -1 }).exec();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ updatedAt: -1 }).exec();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
   
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const postLikedUsersDetails = async (req, res) => {
  try {
    const { id } = req.params;
  
    const post = await Post.findById(id)
    const myMap = new Map(post.likes)
    const postLikedUserIds = [...myMap.keys()];
    const  users = await Promise.all(
      postLikedUserIds.map((id) => User.findById(id))
    );
    const formattedUsers = users.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    )
    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const { id,picturePath } = req.params;
    const fileExist = existsSync('./public/assets/'+picturePath)
    await Post.deleteOne({_id:id})
    if(fileExist){
      unlinkSync('./public/assets/'+picturePath)
    }
    res.status(200).json({ message: "Post has been deleted successfully!!!"});
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId ,comment} = req.body;
     await Post.findOneAndUpdate({_id:id},{
      $push:{comments: {
          comment:comment,
          commentBy:userId,
          commentAt:new Date()
        },
      }
    });
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const postCommentedUsersDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const postId=mongoose.Types.ObjectId(id)
    const post = await  Post.findOne(({_id:postId})).populate("comments.commentBy","firstName lastName  location picturePath")
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};