import express from 'express';
import axios from 'axios';

const router = express.Router();

// GitHub API configuration
const GITHUB_USERNAME = 'R123achit'; // Your GitHub username
const GITHUB_API_URL = 'https://api.github.com';

// Cache configuration
let cachedRepos = null;
let lastFetchTime = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch user's public repositories from GitHub
 */
router.get('/repos', async (req, res) => {
  try {
    // Return cached data if available and fresh
    if (cachedRepos && lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) {
      console.log('📦 Returning cached GitHub repos');
      return res.json({
        success: true,
        cached: true,
        projects: cachedRepos,
        lastUpdated: lastFetchTime,
      });
    }

    console.log('🔄 Fetching fresh data from GitHub API...');

    // Fetch repositories from GitHub
    const response = await axios.get(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`,
      {
        params: {
          sort: 'updated', // Sort by last updated
          per_page: 100, // Get up to 100 repos
          type: 'owner', // Only repos owned by user (not forks)
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Optional: Add GitHub token for higher rate limits
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    // Transform GitHub data to match portfolio format
    const projectsData = await Promise.all(
      response.data
        .filter(repo => {
          // Filter out forked repos and repos you want to hide
          return !repo.fork && !repo.private;
        })
        .map(async (repo) => {
          // Extract languages from topics or set default
          const techStack = repo.topics && repo.topics.length > 0 
            ? repo.topics.slice(0, 5) // Limit to 5 topics
            : [repo.language].filter(Boolean); // Use primary language if no topics

          // Try to fetch social preview image
          let socialImage = null;
          try {
            // GitHub's Open Graph image URL format
            socialImage = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;
          } catch (error) {
            console.log(`⚠️  No social preview for ${repo.name}`);
          }

          return {
            _id: repo.id.toString(),
            title: repo.name
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '), // Convert repo-name to Repo Name
            description: repo.description || 'No description available',
            techStack: techStack,
            image: socialImage || repo.owner.avatar_url, // Use social preview or fallback to avatar
            github: repo.html_url,
            live: repo.homepage || null, // Homepage URL if set in repo settings
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            updatedAt: repo.updated_at,
            createdAt: repo.created_at,
          };
        })
    );

    // Sort and limit projects
    const projects = projectsData
      .sort((a, b) => {
        // Sort by stars, then by update date
        if (b.stars !== a.stars) {
          return b.stars - a.stars;
        }
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .slice(0, 12); // Limit to 12 most relevant projects

    // Cache the results
    cachedRepos = projects;
    lastFetchTime = Date.now();

    console.log(`✅ Fetched ${projects.length} repositories from GitHub`);

    res.json({
      success: true,
      cached: false,
      projects: projects,
      lastUpdated: lastFetchTime,
      totalRepos: response.data.length,
    });

  } catch (error) {
    console.error('❌ GitHub API Error:', error.message);
    
    // Return cached data if API fails
    if (cachedRepos) {
      console.log('⚠️  API failed, returning cached data');
      return res.json({
        success: true,
        cached: true,
        projects: cachedRepos,
        lastUpdated: lastFetchTime,
        error: 'Using cached data due to API error',
      });
    }

    // Return error if no cache available
    res.status(500).json({
      success: false,
      error: 'Failed to fetch GitHub repositories',
      message: error.message,
    });
  }
});

/**
 * Fetch GitHub user stats
 */
router.get('/stats', async (req, res) => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      axios.get(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`),
      axios.get(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`, {
        params: { per_page: 100 },
      }),
    ]);

    const user = userResponse.data;
    const repos = reposResponse.data;

    // Calculate total stars across all repos
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Get language statistics
    const languages = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const stats = {
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalForks,
      languages,
      createdAt: user.created_at,
    };

    res.json({
      success: true,
      stats,
    });

  } catch (error) {
    console.error('❌ GitHub Stats Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch GitHub stats',
      message: error.message,
    });
  }
});

/**
 * Clear cache (for manual refresh)
 */
router.post('/refresh', (req, res) => {
  cachedRepos = null;
  lastFetchTime = null;
  console.log('🔄 GitHub cache cleared');
  res.json({
    success: true,
    message: 'Cache cleared. Next request will fetch fresh data.',
  });
});

export default router;
