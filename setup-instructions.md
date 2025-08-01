# GenArtX Setup Instructions

## Prerequisites Setup

Before running the application, you need to obtain API keys and credentials:

### 1. MongoDB Setup
- **Option A (Local):** Install MongoDB locally and use: `mongodb://localhost:27017/genartx`
- **Option B (Cloud):** Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
  - Create a new cluster
  - Get your connection string and replace in `server/.env`

### 2. Cloudinary Setup
1. Sign up at https://cloudinary.com/
2. Go to your Dashboard
3. Copy your:
   - Cloud Name
   - API Key  
   - API Secret
4. Replace the placeholders in `server/.env`

### 3. OpenAI Setup
1. Sign up at https://platform.openai.com/
2. Go to API Keys section
3. Create a new API key
4. Replace `your-openai-api-key` in `server/.env`
5. **Important:** Ensure you have billing set up as image generation requires credits

### 4. Fallback Image
- Add a real image file named `fallback-image.jpg` to `client/public/` directory
- This image will be shown when generated images fail to load

## Running the Application

### Start Backend Server
```bash
cd server
npm start
```
The server will run on http://localhost:8080

### Start Frontend (in a new terminal)
```bash
cd client  
npm start
```
The client will run on http://localhost:3000

## Troubleshooting

### Common Issues:
1. **MongoDB Connection Error:** Ensure MongoDB is running or check your connection string
2. **OpenAI API Error:** Verify your API key and billing setup
3. **Cloudinary Upload Error:** Check your Cloudinary credentials
4. **CORS Issues:** Ensure the backend server is running on port 8080

### Environment Variables Check:
- Verify all `.env` files have the correct values
- Restart servers after changing environment variables
- Check console logs for specific error messages