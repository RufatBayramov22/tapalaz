

import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import SavedPost from "../models/savedPostModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};


// // savePost Controller
export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.body.userId; // userId'yi manuel olarak body'den al

  try {
    const savedPost = await SavedPost.findOne({
      userId: tokenUserId,
      postId,
    });

    if (savedPost) {
      await SavedPost.findByIdAndDelete(savedPost._id);
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await SavedPost.create({
        userId: tokenUserId,
        postId,
      });
      res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.error("Mongoose error:", err);
    res.status(500).json({ message: "Failed to save or remove post!" });
  }
};

// // getSavedPosts Controller
// export const getSavedPosts = async (req, res) => {
//   const tokenUserId = req.params.userId; 

//   try {
//     const savedPosts = await SavedPost.find({ userId: tokenUserId }).populate('postId');

//     if (!savedPosts || savedPosts.length === 0) {
//       return res.status(404).json({ message: "No saved posts found for this user" });
//     }

//     res.status(200).json(savedPosts);
//   } catch (err) {
//     console.error("Mongoose error:", err);
//     res.status(500).json({ message: "Failed to retrieve saved posts" });
//   }
// };

// GET /users/savedPosts/:userId
export const getSavedPosts = async (req, res) => {
  const userId = req.params.userId; // URL parametresinden al

  try {
    // Kullanıcının kaydettiği postları bul
    const savedPosts = await SavedPost.find({ userId: userId });

    if (savedPosts.length > 0) {
      return res.status(200).json(savedPosts);
    } else {
      return res.status(404).json({ message: "No saved posts found for this user" });
    }
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Fetch user posts
    const userPosts = await Post.find({ userId: tokenUserId });
    // Fetch saved posts
    const saved = await SavedPost.find({ userId: tokenUserId }).populate('post');
    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};
