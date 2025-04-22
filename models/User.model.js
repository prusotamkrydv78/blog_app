import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      trim: true,
      type: String,
      required: true,
    },
    email: {
      trim: true,
      type: String,
      required: true,
    },
    password: {
      trim: true,
      type: String,
      required: true,
    },
    bio: {
      trim: true,
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/100?text=User"
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
