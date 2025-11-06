import express from 'express';
import axios from 'axios';

const router = express.Router();

// Configuration - Replace with your actual usernames
const GITHUB_USERNAME = 'R123achit';
const LEETCODE_USERNAME = 'R123cahit'; // Replace with your LeetCode username
const CODECHEF_USERNAME = 'r123achit'; // Replace with your CodeChef username

// Cache configuration
let cachedStats = null;
let lastFetchTime = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Fetch GitHub Stats
 */
async function fetchGitHubStats() {
  try {
    const userResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    
    const totalStars = reposResponse.data.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposResponse.data.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    return {
      totalRepos: userResponse.data.public_repos,
      totalStars,
      totalForks,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      publicGists: userResponse.data.public_gists,
      profileUrl: userResponse.data.html_url,
      avatarUrl: userResponse.data.avatar_url,
    };
  } catch (error) {
    console.error('❌ GitHub API Error:', error.message);
    return null;
  }
}

/**
 * Fetch LeetCode Stats
 */
async function fetchLeetCodeStats() {
  try {
    // Try primary API
    const response = await axios.get(
      `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`
    );
    
    if (response.data && response.data.totalSolved !== undefined) {
      return {
        totalSolved: response.data.totalSolved || 0,
        easySolved: response.data.easySolved || 0,
        mediumSolved: response.data.mediumSolved || 0,
        hardSolved: response.data.hardSolved || 0,
        ranking: response.data.ranking || null,
        acceptanceRate: response.data.acceptanceRate || null,
        contributionPoints: response.data.contributionPoints || 0,
        profileUrl: `https://leetcode.com/${LEETCODE_USERNAME}`,
      };
    }
  } catch (error) {
    console.error('⚠️  LeetCode primary API failed, trying alternative...');
    
    try {
      // Try alternative API
      const altResponse = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`
      );
      
      if (altResponse.data) {
        return {
          totalSolved: altResponse.data.solvedProblem || 0,
          easySolved: altResponse.data.easySolved || 0,
          mediumSolved: altResponse.data.mediumSolved || 0,
          hardSolved: altResponse.data.hardSolved || 0,
          ranking: altResponse.data.ranking || null,
          acceptanceRate: altResponse.data.acceptanceRate || null,
          profileUrl: `https://leetcode.com/${LEETCODE_USERNAME}`,
        };
      }
    } catch (altError) {
      console.error('❌ LeetCode alternative API also failed');
    }
  }
  
  return null;
}

/**
 * Fetch CodeChef Stats
 * Note: CodeChef doesn't have a public API, so we'll use manual stats or scraping
 */
async function fetchCodeChefStats() {
  try {
    // Using CodeChef public API (unofficial)
    const response = await axios.get(
      `https://codechef-api.vercel.app/handle/${CODECHEF_USERNAME}`
    );
    
    if (response.data && response.data.success) {
      return {
        rating: response.data.currentRating || 0,
        maxRating: response.data.highestRating || 0,
        stars: response.data.stars || '',
        globalRank: response.data.globalRank || null,
        countryRank: response.data.countryRank || null,
        problemsSolved: response.data.totalProblemsSolved || 0,
        contests: response.data.contestsAttended || 0,
        profileUrl: `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
      };
    }
  } catch (error) {
    console.error('⚠️  CodeChef API Error:', error.message);
  }
  
  // Fallback to manual stats if API fails
  return {
    rating: 1497,
    maxRating: 1497,
    stars: '2★',
    globalRank: 141515,
    countryRank: null,
    problemsSolved: 45,
    contests: 12,
    profileUrl: `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
  };
}

/**
 * Main route to get all coding stats
 */
router.get('/', async (req, res) => {
  try {
    // Return cached data if available and fresh
    if (cachedStats && lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) {
      console.log('📦 Returning cached coding stats');
      return res.json({
        success: true,
        cached: true,
        stats: cachedStats,
        lastUpdated: lastFetchTime,
      });
    }

    console.log('🔄 Fetching fresh coding stats from APIs...');

    // Fetch all stats in parallel
    const [github, leetcode, codechef] = await Promise.all([
      fetchGitHubStats(),
      fetchLeetCodeStats(),
      fetchCodeChefStats(),
    ]);

    const stats = {
      github,
      leetcode,
      codechef,
    };

    // Cache the results
    cachedStats = stats;
    lastFetchTime = Date.now();

    console.log('✅ Coding stats fetched successfully');

    res.json({
      success: true,
      cached: false,
      stats,
      lastUpdated: lastFetchTime,
    });
  } catch (error) {
    console.error('❌ Error fetching coding stats:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch coding stats',
      message: error.message,
    });
  }
});

/**
 * Route to get GitHub contribution graph
 */
router.get('/github-contributions', async (req, res) => {
  try {
    res.json({
      success: true,
      graphUrl: `https://ghchart.rshah.org/7c3aed/${GITHUB_USERNAME}`,
      githubStatsUrl: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117`,
      topLanguagesUrl: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=radical&hide_border=true&bg_color=0d1117`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate contribution graph URLs',
    });
  }
});

/**
 * Force refresh cache
 */
router.post('/refresh', async (req, res) => {
  try {
    cachedStats = null;
    lastFetchTime = null;
    res.json({
      success: true,
      message: 'Cache cleared successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to refresh cache',
    });
  }
});

export default router;
