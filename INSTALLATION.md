# 🏔️ Swar Himal Player - Installation Guide

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud)
- **Git**

---

## Backend Setup

### 1. Navigate to Server Directory
```bash
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
cp .env.example .env
```

### 4. Update .env File
Edit the `.env` file and add your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/swar-himal
PORT=5000
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

### 5. Start MongoDB
```bash
# On Windows
mongod

# On macOS (if installed via Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

### 6. Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

---

## Frontend Setup

### 1. Navigate to Client Directory
```bash
cd client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File (Optional)
```bash
echo REACT_APP_API_URL=http://localhost:5000 > .env
```

### 4. Start Development Server
```bash
npm start
```

Application will open at `http://localhost:3000`

---

## Full Project Setup (From Root)

If you want to run both frontend and backend:

### Terminal 1 - Backend
```bash
cd server
npm install
npm start
```

### Terminal 2 - Frontend
```bash
cd client
npm install
npm start
```

---

## Verify Installation

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "🏔️ Swar Himal Player Server is running",
  "timestamp": "2024-01-10T12:00:00.000Z"
}
```

### Frontend
Open browser and go to `http://localhost:3000`

---

## Database Initialization (Optional)

### Add Sample Songs to Database

1. Create a MongoDB connection
2. Insert sample data:

```javascript
db.songs.insertMany([
  {
    title: "Resham Firiri",
    artist: "Traditional",
    album: "Nepal Classics",
    genre: "folk",
    duration: 240,
    language: "nepali",
    isNepaleSong: true,
    coverImage: "url_to_image",
    audioUrl: "url_to_audio"
  },
  // Add more songs...
])
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB credentials if using Atlas

### CORS Error
- Ensure frontend is on different port than backend
- Check CORS configuration in server.js

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

---

## Production Build

### Build Frontend
```bash
cd client
npm run build
```

Output will be in `client/build/` directory

---

## API Documentation

See API endpoints in README.md

---

## Support

For issues or questions, create an issue on GitHub.

🎵 Happy listening! 🏔️
