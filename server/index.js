import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

// Validate environment variables
if (!process.env.MONGODB_URL || !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Missing required environment variables. Please check your .env file.");
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

//Default get
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello GFG Developers!",
  });
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  console.error(`Error: ${message}, Status: ${status}`);
  console.error(err.stack || "No stack trace available");
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//function to connect to mongodb
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("Failed to connect to DB");
      console.error(err);
    });
};

//function to start the server
const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();