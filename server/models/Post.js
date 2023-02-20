import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,ref: 'User', 
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments:[
      {
        comment: {
          type: String,
        },
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: 'User', 
        },
        commentAt: {
          type: Date,
          required: true,
        },
      },
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;