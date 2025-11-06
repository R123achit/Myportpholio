# 🚀 GitHub Projects Integration

## Overview
Your portfolio now **automatically fetches and displays** all your public GitHub repositories! No more manual updates needed.

## ✨ Features

### 1. **Auto-Updated Projects**
- Fetches all public repos from your GitHub account (`R123achit`)
- Updates automatically every time the page loads
- Shows real GitHub data: stars ⭐, forks 🍴, languages

### 2. **Smart Caching**
- GitHub data is cached for 10 minutes
- Reduces API calls and improves performance
- Fresh data loaded when cache expires

### 3. **Fallback System**
- If GitHub API is unavailable → shows sample projects
- Never breaks your portfolio
- Automatic error handling

### 4. **GitHub Stats Display**
- Repository stars count
- Fork count
- Primary programming language
- Tech stack from GitHub topics
- Live demo links (if set in repo settings)

## 📊 What Data is Fetched?

From your GitHub repos, we display:
- ✅ Repository name (auto-formatted to Title Case)
- ✅ Description
- ✅ Topics/Languages as tech stack badges
- ✅ Stars and forks count
- ✅ GitHub repository link
- ✅ Live demo URL (from repo's homepage field)
- ✅ Last updated date
- ✅ Primary language

## 🎯 How It Works

### Backend (`/api/github/repos`)
```javascript
GET http://localhost:5000/api/github/repos
```

**Response:**
```json
{
  "success": true,
  "cached": false,
  "projects": [
    {
      "_id": "729578717",
      "title": "Shubod Pg",
      "description": "No description available",
      "techStack": ["HTML"],
      "github": "https://github.com/R123achit/shubod-pg",
      "live": "https://shubod-pg.vercel.app",
      "stars": 1,
      "forks": 0,
      "language": "HTML"
    }
  ],
  "lastUpdated": 1635123456789
}
```

### Frontend
- Automatically fetches on page load
- Shows loading spinner while fetching
- Displays projects in beautiful cards
- Shows "🚀 Live projects from my GitHub - Auto-updated!" when using real data

## 🔧 Configuration

### Change GitHub Username
Edit `backend/routes/githubRoutes.js`:
```javascript
const GITHUB_USERNAME = 'R123achit'; // Change this to your username
```

### Adjust Cache Duration
```javascript
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes (in milliseconds)
```

### Filter Specific Repos
You can exclude certain repos by editing the filter in `githubRoutes.js`:
```javascript
.filter(repo => {
  return !repo.fork && 
         !repo.private && 
         repo.name !== 'repo-to-hide'; // Add this line
})
```

## 📈 Additional Endpoints

### Get GitHub Stats
```javascript
GET /api/github/stats
```

Returns:
- Total public repos
- Followers/Following count
- Total stars across all repos
- Total forks
- Language statistics
- Profile info

### Refresh Cache
```javascript
POST /api/github/refresh
```

Clears cache and forces fresh data on next request.

## 🎨 Customization

### Add More Project Details
You can enhance projects by adding custom data:

1. **Set Homepage URL** in GitHub repo settings → Website field
2. **Add Topics** in GitHub repo → About section → Topics
3. **Write Description** in GitHub repo → About section

### Display Priority
Projects are sorted by:
1. Number of stars (most starred first)
2. Last updated date (most recent first)
3. Limited to top 12 projects

## 🚀 Benefits

✅ **Always Up-to-Date** - Push to GitHub, portfolio updates automatically  
✅ **No Manual Work** - New projects appear automatically  
✅ **Professional** - Shows real stats and activity  
✅ **Impressive** - Live connection to GitHub demonstrates skills  
✅ **SEO Friendly** - Fresh content for search engines  

## 🔒 Rate Limits

GitHub API allows:
- **60 requests/hour** for unauthenticated requests
- **5000 requests/hour** with GitHub token

With 10-minute caching, you'll use ~6 requests/hour (well within limits).

### Optional: Add GitHub Token (Higher Limits)

1. Create Personal Access Token:
   - Go to GitHub → Settings → Developer Settings → Personal Access Tokens
   - Generate new token (classic)
   - Select scope: `public_repo`
   - Copy the token

2. Add to `.env`:
   ```
   GITHUB_TOKEN=your_token_here
   ```

3. Uncomment in `githubRoutes.js`:
   ```javascript
   headers: {
     'Authorization': `token ${process.env.GITHUB_TOKEN}`,
   }
   ```

## 📱 What's Next?

Consider adding:
- **GitHub Contribution Graph**
- **Most Used Languages Chart**
- **Recent Activity Feed**
- **Individual Project Pages**
- **Filter by Technology**

## 🎉 Result

Your portfolio now showcases:
- ✅ Shubod Pg (1 ⭐)
- ✅ Myportpholio (JavaScript)
- ✅ CityConnect (1 fork)
- ✅ E-Commerce
- ✅ And more...

All automatically updated from your GitHub! 🚀
