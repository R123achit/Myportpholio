# 🚀 Vercel Deployment Guide - Complete Steps

## 📋 Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for cloud database)
- Your code pushed to GitHub repository

---

## 🗄️ Step 1: Setup MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new **FREE** cluster (M0 Sandbox)

### 1.2 Configure Database Access
1. In Atlas dashboard, go to **Database Access**
2. Click **Add New Database User**
   - Username: `portfolio_user` (or your choice)
   - Password: Generate a strong password (SAVE THIS!)
   - Built-in Role: **Read and write to any database**
3. Click **Add User**

### 1.3 Configure Network Access
1. Go to **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 1.4 Get Connection String
1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://portfolio_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `mongodb+srv://portfolio_user:yourpassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

---

## 🔐 Step 2: Prepare Your GitHub Repository

### 2.1 Push Code to GitHub
```powershell
# If not already a git repository
cd C:\Users\rachi\Final_portpholi
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create GitHub repo and push
# (Create new repo on GitHub first, then:)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2.2 Important Files Check
Make sure these files exist:
- ✅ `backend/vercel.json` (created)
- ✅ `frontend/vite.config.js`
- ✅ `backend/package.json`
- ✅ `frontend/package.json`

---

## 🌐 Step 3: Deploy Backend on Vercel

### 3.1 Import Backend Project
1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel will detect both frontend and backend folders

### 3.2 Configure Backend Deployment
1. **Framework Preset:** Other
2. **Root Directory:** Click **Edit** → Select `backend`
3. **Build Command:** Leave empty (or `npm install`)
4. **Output Directory:** Leave empty
5. **Install Command:** `npm install`

### 3.3 Add Environment Variables
Click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `PORT` | `5000` |
| `EMAIL_USER` | Your email (optional) |
| `EMAIL_PASS` | Your email app password (optional) |
| `NODE_ENV` | `production` |

Example:
```
MONGODB_URI=mongodb+srv://portfolio_user:yourpassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

### 3.4 Deploy Backend
1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. Copy your backend URL (e.g., `https://your-backend.vercel.app`)

---

## 🎨 Step 4: Deploy Frontend on Vercel

### 4.1 Import Frontend Project
1. Go back to Vercel dashboard
2. Click **Add New** → **Project**
3. Import the SAME GitHub repository again
4. This time, configure for frontend

### 4.2 Configure Frontend Deployment
1. **Framework Preset:** Vite
2. **Root Directory:** Click **Edit** → Select `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`

### 4.3 Add Frontend Environment Variables
Click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your backend URL from Step 3.4 |

Example:
```
VITE_API_URL=https://your-backend.vercel.app
```

### 4.4 Deploy Frontend
1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. Your site is live! 🎉

---

## 🔧 Step 5: Update Frontend API Configuration

### 5.1 Update Vite Config
Edit `frontend/vite.config.js` to use environment variable:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
```

### 5.2 Update API Calls in Components
In your components (like `Contact.jsx`), update API calls:

```javascript
// Change from:
const response = await axios.post('/api/contact', formData);

// To:
const API_URL = import.meta.env.VITE_API_URL || '';
const response = await axios.post(`${API_URL}/api/contact`, formData);
```

### 5.3 Redeploy Frontend
After making changes:
```powershell
git add .
git commit -m "Update API configuration for production"
git push
```

Vercel will **auto-deploy** when you push to GitHub! 🚀

---

## ✅ Step 6: Verify Deployment

### 6.1 Check Backend
Visit: `https://your-backend.vercel.app/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "Portfolio API is running"
}
```

### 6.2 Check Frontend
1. Visit your frontend URL: `https://your-project.vercel.app`
2. Test contact form
3. Check coding stats
4. Verify all sections load correctly

### 6.3 Check MongoDB
1. Go to MongoDB Atlas dashboard
2. Click **Browse Collections**
3. You should see `portfolio` database and `contacts` collection

---

## 🔄 Step 7: Enable Auto-Deployment

Good news! Vercel automatically deploys when you push to GitHub.

**To deploy updates:**
```powershell
# Make your changes, then:
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically build and deploy! ✨

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Update `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://your-frontend.vercel.app'  // Add your frontend URL
  ],
  credentials: true
}));
```

### Issue 2: API Not Working
**Solution:** Check environment variables in Vercel dashboard
- Go to Project Settings → Environment Variables
- Make sure `MONGODB_URI` is correct

### Issue 3: Build Fails
**Solution:** Check logs in Vercel dashboard
- Click on failed deployment
- Read error messages
- Usually missing dependencies or environment variables

### Issue 4: Database Connection Failed
**Solution:** 
- Check MongoDB Atlas Network Access (allow 0.0.0.0/0)
- Verify connection string in environment variables
- Check database user permissions

---

## 📱 Custom Domain (Optional)

### Add Custom Domain
1. Go to Project Settings → Domains
2. Add your domain (e.g., `yourname.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

---

## 🎯 Quick Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Code pushed to GitHub
- [ ] Backend deployed on Vercel
- [ ] Backend environment variables added
- [ ] Backend URL copied
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable (VITE_API_URL) added
- [ ] API calls updated to use VITE_API_URL
- [ ] Contact form tested
- [ ] All sections verified

---

## 🆘 Need Help?

### Vercel Documentation
- https://vercel.com/docs

### MongoDB Atlas Documentation
- https://docs.atlas.mongodb.com/

### Common Commands
```powershell
# View deployment logs
vercel logs

# Deploy manually
vercel --prod

# List deployments
vercel ls
```

---

## 🎉 Success!

Your portfolio is now live on Vercel with:
- ✅ Professional custom cursor
- ✅ Particle.js background
- ✅ Scroll progress indicator
- ✅ Loading animation
- ✅ Live LeetCode stats
- ✅ CodeChef stats
- ✅ Working contact form
- ✅ MongoDB database
- ✅ Auto-deployment from GitHub

**Share your portfolio:** `https://your-project.vercel.app` 🚀

---

*Last updated: November 6, 2025*
