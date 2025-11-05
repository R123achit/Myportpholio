# ⚡ Quick Reference - Your Portfolio

## 🎯 Your Servers Are Running!

✅ **Backend:** http://localhost:5000
✅ **Frontend:** http://localhost:5173 (Vite default)

## 📝 Quick Customization Guide

### 1️⃣ Update Your Name & Info (5 minutes)

**File:** `frontend/src/components/Hero.jsx`
- **Line 52:** Change `"Your Name"` to your actual name
- **Lines 45-47:** Update social media URLs:
  ```jsx
  { icon: <FiGithub />, href: 'https://github.com/YOUR_USERNAME', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/YOUR_USERNAME', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:YOUR_EMAIL@example.com', label: 'Email' },
  ```

**File:** `frontend/src/components/Footer.jsx`
- Update the same social links
- Update copyright name

### 2️⃣ Add Your Photo (2 minutes)

1. Copy your photo to: `frontend/public/profile.jpg`
2. **File:** `frontend/src/components/About.jsx`
   - **Line 47-48:** Change:
   ```jsx
   <img
     src="/profile.jpg"  // Change this
     alt="Profile"
   ```

### 3️⃣ Add Your Resume (1 minute)

1. Copy your PDF to: `frontend/public/resume.pdf`
2. The download button in Hero section will work automatically!

### 4️⃣ Update About Section (5 minutes)

**File:** `frontend/src/components/About.jsx`
- **Lines 56-63:** Update your bio/description
- **Lines 68-80:** Update statistics (projects count, years experience, etc.)
- **Lines 87-107:** Update "What I Do" section

### 5️⃣ Update Contact Info (3 minutes)

**File:** `frontend/src/components/Contact.jsx`
- **Lines 46-60:** Update email, phone, and location:
  ```jsx
  {
    icon: <FiMail />,
    title: 'Email',
    value: 'your.email@example.com',
    link: 'mailto:your.email@example.com',
  },
  ```

### 6️⃣ Add Your Projects (10 minutes)

**File:** `backend/seed.js`
- Edit the `sampleProjects` array (lines 7-99)
- Update with your real projects:
  ```js
  {
    title: 'Your Project Name',
    description: 'Detailed description...',
    techStack: ['React', 'Node.js', 'MongoDB'],
    image: 'https://your-image-url.com/image.jpg',
    github: 'https://github.com/yourusername/project',
    live: 'https://your-project-live-url.com',
    featured: true,
    order: 1,
  }
  ```
- Run from backend folder: `node seed.js`

### 7️⃣ Update Skills (5 minutes)

**File:** `frontend/src/components/Skills.jsx`
- **Lines 19-58:** Update skills in both categories
- Add/remove as needed
- Find icons at: https://react-icons.github.io/react-icons/

## 🎨 Color Customization

**File:** `frontend/tailwind.config.js`
```js
colors: {
  primary: '#3B82F6',    // Change these
  secondary: '#8B5CF6',
  dark: '#0F172A',
  light: '#F8FAFC',
},
```

## 🔗 API Endpoints (for testing)

### Get All Projects
```
GET http://localhost:5000/api/projects
```

### Add New Project
```
POST http://localhost:5000/api/projects
Content-Type: application/json

{
  "title": "Test Project",
  "description": "A test project",
  "techStack": ["React", "Node.js"],
  "image": "https://via.placeholder.com/600x400",
  "github": "https://github.com/test",
  "live": "https://test.com"
}
```

### Submit Contact Form
```
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Test message"
}
```

## 🚀 Quick Commands

### Start Everything
```powershell
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Seed Database with Projects
```powershell
cd backend
node seed.js
```

### Build for Production
```powershell
cd frontend
npm run build
```

## 📱 Test Checklist

Before sharing your portfolio:

- [ ] Personal name and info updated
- [ ] Social media links working
- [ ] Profile photo displays correctly
- [ ] Resume downloads successfully
- [ ] All projects load and display
- [ ] Project links (GitHub, Live) work
- [ ] Contact form submits successfully
- [ ] Dark mode toggles properly
- [ ] Responsive on mobile (use browser DevTools)
- [ ] Smooth scrolling works
- [ ] All animations working
- [ ] No console errors

## 🐛 Common Issues & Fixes

### MongoDB Not Connected
```powershell
# Start MongoDB
mongod

# Or check if it's running
mongod --version
```

### Port Already in Use
**Backend (5000):**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Frontend (5173):**
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Projects Not Loading
1. Check backend is running: http://localhost:5000/api/projects
2. Run seed script: `cd backend && node seed.js`
3. Check MongoDB is connected

### Tailwind CSS Not Working
```powershell
cd frontend
npm install -D tailwindcss postcss autoprefixer
npm run dev
```

## 📸 Screenshots Location

For best results, use these image dimensions:
- **Profile Photo:** 400x400px (square)
- **Project Images:** 600x400px (3:2 ratio)
- **Resume:** PDF format

## 🎓 File Locations Quick Map

```
📁 frontend/
  📁 public/
    📄 resume.pdf         ← Add your resume here
    📄 profile.jpg        ← Add your photo here
  📁 src/
    📁 components/
      📄 Hero.jsx         ← Update: Name, Social Links
      📄 About.jsx        ← Update: Photo path, Bio, Stats
      📄 Skills.jsx       ← Update: Your skills
      📄 Contact.jsx      ← Update: Email, Phone, Location
      📄 Footer.jsx       ← Update: Social links, Name

📁 backend/
  📄 seed.js             ← Update: Your projects
  📄 .env                ← Update: Email credentials (optional)
```

## 💡 Pro Tips

1. **Use Real Project Screenshots:** Take screenshots of your actual projects
2. **Keep Descriptions Concise:** 1-2 sentences per project
3. **Highlight Tech Stack:** Recruiters look for specific technologies
4. **Add Live Demos:** If possible, deploy projects to Vercel/Netlify
5. **Professional Photo:** Use a professional headshot
6. **Test on Mobile:** 60% of traffic is mobile
7. **Fast Loading:** Optimize images (<200KB each)
8. **Keep Updated:** Add new projects regularly

## 📞 Need Help?

Check these files:
- `README.md` - Full project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `PROJECT_SUMMARY.md` - Complete feature list

## 🎉 You're All Set!

Your portfolio is running at: **http://localhost:5173**

Now customize it and make it yours! 🚀
