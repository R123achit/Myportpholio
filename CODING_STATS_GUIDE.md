# Coding Stats Customization Guide

## 🎯 How to Update Your Coding Stats

### Step 1: Update Your Usernames

Open `frontend/src/components/CodingStats.jsx` and update these lines (around line 27-28):

```javascript
const leetcodeUsername = 'your_leetcode_username';  // Replace with your LeetCode username
const codechefUsername = 'your_codechef_username';  // Replace with your CodeChef username
```

**Example:**
```javascript
const leetcodeUsername = 'rachit_kesarwani';
const codechefUsername = 'rachit_123';
```

**That's it!** The component will automatically fetch your real stats from both platforms.

## 📡 APIs Used

### 1. LeetCode GraphQL API
- **Endpoint**: `https://leetcode.com/graphql`
- **Data Fetched**:
  - Total problems solved
  - Easy, Medium, Hard breakdown
  - Global ranking
- **Status**: ✅ Official LeetCode API - Always works

### 2. CodeChef API (Third-party)
- **Endpoint**: `https://codechef-api.vercel.app/handle/{username}`
- **Data Fetched**:
  - Current rating
  - Star level (auto-calculated from rating)
  - Global rank
  - Highest rating
- **Status**: ✅ Community API - Usually reliable

## � How It Works

1. **On page load**, the component fetches your real stats from both platforms
2. **Loading spinner** shows while data is being fetched
3. **If successful**: Shows ✅ Live Statistics
4. **If API fails**: Shows ⚠️ Using Demo Data (fallback dummy data)

## 🎨 Star Calculation (CodeChef)

Stars are automatically calculated based on rating:
- ⭐ (1 star): < 1400
- ⭐⭐ (2 stars): 1400-1599
- ⭐⭐⭐ (3 stars): 1600-1799
- ⭐⭐⭐⭐ (4 stars): 1800-1999
- ⭐⭐⭐⭐⭐ (5 stars): 2000-2199
- ⭐⭐⭐⭐⭐⭐ (6 stars): 2200-2499
- ⭐⭐⭐⭐⭐⭐⭐ (7 stars): 2500+

## 🎨 Customization Options

### Change Colors

Update the gradient colors for each platform:

```javascript
{
  name: 'LeetCode',
  color: 'from-orange-500 to-yellow-500',  // Change these colors
  bgColor: 'bg-orange-500/10',
  // ...
}
```

### Add More Platforms

Add a new platform object in the `platforms` array:

```javascript
{
  name: 'HackerRank',
  icon: <SiHackerrank />,
  color: 'from-green-500 to-emerald-500',
  bgColor: 'bg-green-500/10',
  stats: [
    { label: 'Stars', value: 50 },
    { label: 'Badges', value: 10 },
  ],
}
```

## 🔧 Troubleshooting

### LeetCode Stats Not Loading?

1. Check if your username is correct
2. Try accessing: `https://leetcode-stats-api.herokuapp.com/your_username` in browser
3. If API is down, stats will show dummy data automatically

### Want Real-Time CodeChef Stats?

CodeChef doesn't provide a public API. Options:
1. **Manual Update** (recommended): Update stats in the code when they change
2. **Web Scraping**: Create your own backend scraper (advanced)
3. **Third-party API**: Use services like RapidAPI for CodeChef stats (may cost money)

## 📝 Quick Update Checklist

- [ ] Update LeetCode username
- [ ] Update CodeChef username
- [ ] Update CodeChef rating
- [ ] Update CodeChef stars
- [ ] Update CodeChef ranks
- [ ] Update Codeforces rating
- [ ] Update GeeksforGeeks problems
- [ ] Update total problems solved
- [ ] Update active days streak

## 🚀 After Making Changes

1. Save the file
2. Your dev server will auto-reload
3. Scroll to the "Coding Stats" section
4. Verify all stats display correctly

---

**Note:** The stats are fetched only once when the page loads. To refresh, reload the page (F5).
