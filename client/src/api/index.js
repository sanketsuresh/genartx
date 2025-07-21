import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/", // Ensure this matches your server's URL
});

// Log the baseURL for debugging
console.log("API Base URL:", API.defaults.baseURL);

export const GetPosts = async () => {
  try {
    console.log("Fetching posts from:", API.defaults.baseURL + "/post/");
    const response = await API.get("/post/");
    console.log("Fetched posts:", response.data?.data); // Log the response for debugging
    return response.data?.data; // Return the posts array directly
  } catch (error) {
    console.error("Error fetching posts:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    }); // Log detailed error information
    throw error;
  }
};

export const CreatePost = async (data) => {
  try {
    return await API.post("/post/", data);
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const GenerateAIImage = async (data) => {
  try {
    return await API.post("/generateImage/", data);
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.includes("Billing hard limit")) {
      console.error("Billing limit reached. Please check your subscription or usage limits.");
      throw new Error("Billing limit reached. Please upgrade your plan or try again later.");
    }
    console.error("Error generating AI image:", error);
    throw error;
  }
};