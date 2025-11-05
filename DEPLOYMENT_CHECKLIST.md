# ✅ Vercel Deployment Checklist

## Quick Steps Summary

### 1️⃣ Setup MongoDB Atlas (5 minutes)
- [ ] Create account at https://www.mongodb.com/cloud/atlas
- [ ] Create FREE M0 cluster
- [ ] Add database user (username + password)
- [ ] Allow IP access (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Replace `<password>` with your actual password
- [ ] Add database name to connection string

**Your connection string should look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

### 2️⃣ Push to GitHub (3 minutes)
```powershell
# In your project root
cd C:\Users\rachi\Final_portpholi

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

### 3️⃣ Deploy Backend (5 minutes)

1. **Go to Vercel:** https://vercel.com/dashboard
2. **Import project** from GitHub
3. **Configure:**
   - Framework: Other
   - Root Directory: `backend`
   - Build Command: (leave empty)
   - Install Command: `npm install`

4. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy** and copy the URL (e.g., `https://portfolio-backend-xyz.vercel.app`)

---

### 4️⃣ Deploy Frontend (5 minutes)

1. **Import SAME GitHub repo again**
2. **Configure:**
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```
   *(Use the backend URL from step 3)*

4. **Deploy** 🎉

---

### 5️⃣ Update Backend CORS (2 minutes)

Edit `backend/server.js` and add your frontend URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://your-frontend.vercel.app'  // Add this!
  ],
  credentials: true
}));
```

Then commit and push:
```powershell
git add .
git commit -m "Update CORS for production"
git push
```

Vercel will auto-deploy! ✨

---

### 6️⃣ Test Everything (5 minutes)

- [ ] Visit frontend URL
- [ ] All sections load correctly
- [ ] Custom cursor works
- [ ] Particles animation works
- [ ] Scroll progress works
- [ ] Loading animation shows
- [ ] LeetCode stats fetch
- [ ] Contact form submits successfully
- [ ] Check MongoDB Atlas for contact entry

---

## 🎯 Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=production
EMAIL_USER=your-email@gmail.com (optional)
EMAIL_PASS=your-app-password (optional)
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.vercel.app
```

---

## 🔄 How to Deploy Updates

After making any changes:

```powershell
git add .
git commit -m "Your change description"
git push
```

**Vercel auto-deploys on every push!** 🚀

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Fix:** Add frontend URL to backend CORS settings

### Issue: API calls fail
**Fix:** Check `VITE_API_URL` in Vercel environment variables

### Issue: Database connection error
**Fix:** 
- Check MongoDB Atlas network access (0.0.0.0/0)
- Verify MONGODB_URI in Vercel environment variables
- Check database user permissions

### Issue: Environment variables not working
**Fix:**
- Go to Vercel Project Settings → Environment Variables
- Make sure they're added for "Production"
- Redeploy after adding variables

---

## 📱 Optional: Add Custom Domain

1. Buy domain (GoDaddy, Namecheap, etc.)
2. In Vercel: Project Settings → Domains
3. Add your domain
4. Follow DNS instructions
5. Wait for DNS propagation (24-48 hours)

---

## ✅ Final Checklist

- [ ] MongoDB Atlas setup complete
- [ ] GitHub repo created and pushed
- [ ] Backend deployed on Vercel
- [ ] Backend environment variables added
- [ ] Backend URL copied
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable added
- [ ] CORS updated with frontend URL
- [ ] All features tested and working
- [ ] Contact form saves to database

---

## 🎉 You're Live!

Your portfolio is now professionally hosted with:
- ✅ Automatic deployments from GitHub
- ✅ Global CDN (super fast)
- ✅ Free SSL certificate
- ✅ Serverless backend
- ✅ Cloud database

**Share your portfolio and impress recruiters!** 🚀

---

*For detailed step-by-step guide, see VERCEL_DEPLOYMENT_GUIDE.md*
