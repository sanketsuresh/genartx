import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/posts.js";

dotenv.config();

const seedPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Sample data
    const posts = [
      {
        name: "John Doe",
        prompt: "A futuristic cityscape with flying cars",
        photo: "https://via.placeholder.com/300",
      },
      {
        name: "Jane Smith",
        prompt: "A serene beach during sunset",
        photo: "https://via.placeholder.com/300",
      },
    ];

    // Clear existing data
    await Post.deleteMany({});
    console.log("Cleared existing posts");

    // Insert sample data
    await Post.insertMany(posts);
    console.log("Seeded database with sample posts");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedPosts();
