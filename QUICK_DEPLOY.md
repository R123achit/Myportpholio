# 🚀 Quick Deployment Commands

## Prerequisites
1. MongoDB Atlas account → Get connection string
2. GitHub account → Push code
3. Vercel account → Deploy

---

## Step 1: Push to GitHub
```powershell
git init
git add .
git commit -m "Initial deployment"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy on Vercel

### Backend Deployment
1. Import GitHub repo
2. Root Directory: `backend`
3. Add env variables:
   - `MONGODB_URI` = Your MongoDB connection string
   - `PORT` = 5000
   - `NODE_ENV` = production
4. Deploy → Copy backend URL

### Frontend Deployment
1. Import SAME repo again
2. Root Directory: `frontend`
3. Framework: Vite
4. Add env variable:
   - `VITE_API_URL` = Your backend URL
5. Deploy → Your site is live! 🎉

---

## Step 3: Update CORS
Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://your-frontend.vercel.app'  // Add your frontend URL
  ]
}));
```

Push changes:
```powershell
git add .
git commit -m "Update CORS"
git push
```

---

## Deploy Future Updates
```powershell
git add .
git commit -m "Update message"
git push
```
**Auto-deploys!** ✨

---

## Important URLs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub: https://github.com

---

## Environment Variables

### Backend
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=production
```

### Frontend
```
VITE_API_URL=https://your-backend.vercel.app
```

---

✅ **Done!** Your portfolio is live on Vercel with auto-deployment! 🚀
