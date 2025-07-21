# GenArtX

GenArtX is a full-stack web application that allows users to generate AI-powered images based on prompts and share them with the community. The project leverages OpenAI's API for image generation, Cloudinary for image storage, and MongoDB for managing posts.

## Features
- Generate AI-powered images using detailed prompts.
- Post generated images to the community.
- Explore and search for posts by prompt or author.
- Responsive design for seamless usage across devices.

## Tech Stack
- **Frontend**: React, Styled-Components, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cloud Services**: OpenAI API, Cloudinary

## Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- Cloudinary account
- OpenAI API key

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd GenArtX
```

### 2. Install Dependencies
#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

### 3. Configure Environment Variables
Create `.env` files in the `client` and `server` directories.

#### Client `.env`
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/
```

#### Server `.env`
```env
MONGODB_URL=<your-mongodb-connection-string>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
OPENAI_API_KEY=<your-openai-api-key>
```

### 4. Seed the Database (Optional)
To seed the database with sample posts, run:
```bash
cd server
node seed.js
```

### 5. Start the Application
#### Start the Server
```bash
cd server
npm start
```

#### Start the Client
```bash
cd ../client
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage
1. Navigate to the homepage to explore community posts.
2. Click "Create new post" to generate an AI-powered image.
3. Enter your name and a detailed prompt, then click "Generate Image."
4. Post the generated image to the community.

## Folder Structure
```
GenArtX/
├── client/         # Frontend code
├── server/         # Backend code
├── .gitignore      # Git ignore file
├── README.md       # Project documentation
└── webpack.config.js # Webpack configuration
```

## License
This project is licensed under the MIT License.
