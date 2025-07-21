import Post from "../models/posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    console.log("Fetching all posts...");
    const posts = await Post.find({});
    console.log("Posts fetched:", posts); // Log fetched posts
    return res.status(200).json({ success: true, data: posts }); // Ensure the response structure matches the client expectation
  } catch (error) {
    console.error("Error fetching posts:", error); // Log error details
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

// Create Post
export const createPost = async (req, res, next) => {
  try {
    console.log("Creating a new post:", req.body);
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "GenArtX", // Optional: Specify a folder in Cloudinary
    });
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl?.secure_url,
    });
    console.log("Post created:", newPost);
    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};