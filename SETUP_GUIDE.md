# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally OR MongoDB Atlas account
- Git

## Step 1: Install MongoDB (if not already installed)

### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will start automatically as a Windows service

### Verify MongoDB is running:
```powershell
mongod --version
```

## Step 2: Start MongoDB (if not running)

### Windows (if not running as service):
```powershell
# Start MongoDB
mongod
```

Or use MongoDB Compass (GUI tool) to connect to `mongodb://localhost:27017`

## Step 3: Backend Setup

```powershell
# Navigate to backend folder
cd backend

# Dependencies are already installed, but if needed:
# npm install

# Seed the database with sample projects
npm run seed

# Start the backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

## Step 4: Frontend Setup

```powershell
# Open a new terminal
# Navigate to frontend folder
cd frontend

# Dependencies are already installed, but if needed:
# npm install

# Start the development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 🎨 Customization Checklist

### 1. Update Personal Information

#### Hero Section (`frontend/src/components/Hero.jsx`)
- [ ] Change "Your Name" to your actual name
- [ ] Update GitHub URL
- [ ] Update LinkedIn URL
- [ ] Update Email address
- [ ] Update role descriptions in TypeAnimation

#### About Section (`frontend/src/components/About.jsx`)
- [ ] Replace placeholder image with your photo
- [ ] Update bio and description
- [ ] Update stats (projects, experience, technologies)
- [ ] Update "What I Do" section

#### Contact Section (`frontend/src/components/Contact.jsx`)
- [ ] Update email address
- [ ] Update phone number
- [ ] Update location
- [ ] Replace map placeholder with actual location image or embed

#### Footer (`frontend/src/components/Footer.jsx`)
- [ ] Update social links
- [ ] Update copyright name

### 2. Add Your Resume

1. Add your resume PDF to `frontend/public/resume.pdf`
2. The download button in Hero section will automatically work

### 3. Add Your Photo

1. Add your photo to `frontend/public/` folder (e.g., `profile.jpg`)
2. Update the image src in About.jsx:
   ```jsx
   <img src="/profile.jpg" alt="Profile" />
   ```

### 4. Configure Email (Optional)

To enable contact form email notifications:

1. Edit `backend/.env`
2. Add your Gmail credentials:
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your_app_specific_password
   ```

**Note:** For Gmail, you need to create an App Password:
- Go to Google Account Settings → Security → 2-Step Verification
- Generate App Password
- Use this password in EMAIL_PASS

### 5. Add/Edit Projects

#### Option 1: Edit the seed file
1. Edit `backend/seed.js`
2. Update the `sampleProjects` array with your projects
3. Run: `npm run seed` from backend folder

#### Option 2: Use MongoDB Compass
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `portfolio` database → `projects` collection
4. Add/edit projects manually

#### Option 3: Use API (Postman/Thunder Client)
```http
POST http://localhost:5000/api/projects
Content-Type: application/json

{
  "title": "My Awesome Project",
  "description": "A cool project description",
  "techStack": ["React", "Node.js", "MongoDB"],
  "image": "https://your-image-url.com/image.jpg",
  "github": "https://github.com/yourusername/project",
  "live": "https://your-project.com",
  "featured": true,
  "order": 1
}
```

### 6. Update Skills

Edit `frontend/src/components/Skills.jsx`:
- Add or remove skills from `skillCategories` array
- Categorize as "Using Now" or "Learning"
- Icons are from `react-icons` (search: https://react-icons.github.io/react-icons/)

## 🌐 Production Deployment

### Frontend Deployment (Vercel - Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Set build settings:
   - **Build Command:** `cd frontend && npm run build`
   - **Output Directory:** `frontend/dist`
5. Deploy!

### Backend Deployment (Render - Recommended)

1. Push your code to GitHub
2. Go to https://render.com
3. Create New Web Service
4. Connect your repository
5. Set build settings:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
6. Add Environment Variables:
   - `MONGODB_URI` (from MongoDB Atlas)
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NODE_ENV=production`
7. Deploy!

### Database (MongoDB Atlas)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update backend `.env` with Atlas URI:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```
5. Whitelist your IP or use `0.0.0.0/0` for all IPs

### Update Frontend API URL

After deploying backend, update `frontend/vite.config.js`:
```js
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-url.onrender.com',
      changeOrigin: true,
    },
  },
}
```

Or create an `.env` file in frontend:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🛠️ Troubleshooting

### MongoDB Connection Issues
```powershell
# Check if MongoDB is running
mongod --version

# Start MongoDB service (Windows)
net start MongoDB
```

### Port Already in Use
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Tailwind CSS Not Working
```powershell
cd frontend
npm install -D tailwindcss postcss autoprefixer
```

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal for error messages
3. Ensure MongoDB is running
4. Verify all dependencies are installed
5. Check that ports 3000 and 5000 are available

## 🎉 You're All Set!

Open http://localhost:3000 in your browser to see your portfolio!

Remember to:
- ✅ Customize all personal information
- ✅ Add your projects
- ✅ Update your photo
- ✅ Add your resume
- ✅ Test the contact form
- ✅ Check responsive design on mobile
