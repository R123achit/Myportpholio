import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiActivity, FiStar, FiGitBranch } from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CodingStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [stats, setStats] = useState({ github: null, leetcode: null, codechef: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/coding-stats`);
        if (response.data.success) {
          setStats(response.data.stats);
          console.log('Coding stats loaded');
        }
      } catch (error) {
        console.error('Failed to fetch coding stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="coding-stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={ref} 
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              CODING <span className="text-purple-600 dark:text-purple-400">ACTIVITY</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 mx-auto rounded-full mb-4"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* GitHub Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <FiGithub className="text-3xl text-gray-800 dark:text-white" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">GitHub</h3>
                  </div>
                  <a
                    href="https://github.com/R123achit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-600 transition-colors"
                  >
                    <FiActivity className="text-xl" />
                  </a>
                </div>

                {stats.github ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="text-2xl font-bold text-purple-500">{stats.github.totalRepos}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="text-2xl font-bold text-yellow-500">{stats.github.totalStars}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Stars</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="text-2xl font-bold text-blue-500">{stats.github.totalForks}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Forks</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="text-2xl font-bold text-green-500">{stats.github.followers}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                      </div>
                    </div>

                    {/* GitHub Contribution Graph */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-semibold">Contribution Graph</h4>
                      <img
                        src="https://ghchart.rshah.org/7c3aed/R123achit"
                        alt="GitHub Contribution Graph"
                        className="w-full rounded"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">Unable to load GitHub stats</p>
                )}
              </motion.div>

              {/* LeetCode Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <SiLeetcode className="text-3xl text-yellow-500" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">LeetCode</h3>
                  </div>
                  <a
                    href={stats.leetcode?.profileUrl || 'https://leetcode.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 hover:text-yellow-600 transition-colors"
                  >
                    <FiStar className="text-xl" />
                  </a>
                </div>

                {stats.leetcode ? (
                  <>
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-6 mb-6 shadow">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-yellow-700 dark:text-yellow-400">{stats.leetcode.totalSolved || 0}</div>
                        <div className="text-sm text-gray-800 dark:text-gray-200 mt-2 font-semibold">Problems Solved</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow text-center">
                        <div className="text-xl font-bold text-green-500">{stats.leetcode.easySolved || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Easy</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow text-center">
                        <div className="text-xl font-bold text-orange-500">{stats.leetcode.mediumSolved || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Medium</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow text-center">
                        <div className="text-xl font-bold text-red-500">{stats.leetcode.hardSolved || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Hard</div>
                      </div>
                    </div>

                    {stats.leetcode.ranking && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Global Ranking</span>
                          <span className="text-lg font-bold text-yellow-500">#{stats.leetcode.ranking.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">Connect your LeetCode account</p>
                    <p className="text-xs text-gray-400">Add username to backend config</p>
                  </div>
                )}
              </motion.div>

              {/* CodeChef Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <SiCodechef className="text-3xl text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">CodeChef</h3>
                  </div>
                  <a
                    href={stats.codechef?.profileUrl || 'https://www.codechef.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    <FiGitBranch className="text-xl" />
                  </a>
                </div>

                {stats.codechef ? (
                  <>
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-6 mb-6 shadow">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-orange-700 dark:text-orange-400">{stats.codechef.rating || 'N/A'}</div>
                        <div className="text-sm text-gray-800 dark:text-gray-200 mt-2 font-semibold">Current Rating</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-bold">{stats.codechef.stars || 'Unrated'}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="text-2xl font-bold text-purple-500">{stats.codechef.problemsSolved || 0}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="text-2xl font-bold text-blue-500">{stats.codechef.contests || 0}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Contests</div>
                      </div>
                    </div>

                    {stats.codechef.globalRank && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Global Rank</span>
                          <span className="text-lg font-bold text-orange-500">{stats.codechef.globalRank.toLocaleString()}</span>
                        </div>
                      </div>
                    )}

                    {stats.codechef.maxRating && stats.codechef.maxRating !== stats.codechef.rating && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Highest Rating</span>
                          <span className="text-lg font-bold text-orange-600">{stats.codechef.maxRating}</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">Connect your CodeChef account</p>
                    <p className="text-xs text-gray-400">Add username to backend config</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {/* Overall Summary */}
          {!loading && stats.github && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Combined Achievement</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400">
                    {(stats.leetcode?.totalSolved || 0) + (stats.codechef?.problemsSolved || 0)}
                  </div>
                  <div className="text-sm text-gray-800 dark:text-gray-300 mt-2 font-semibold">Total Problems</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.github?.totalRepos || 0}
                  </div>
                  <div className="text-sm text-gray-800 dark:text-gray-300 mt-2 font-semibold">GitHub Repos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400">
                    {stats.github?.totalStars || 0}
                  </div>
                  <div className="text-sm text-gray-800 dark:text-gray-300 mt-2 font-semibold">GitHub Stars</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400">
                    {stats.codechef?.contests || 0}
                  </div>
                  <div className="text-sm text-gray-800 dark:text-gray-300 mt-2 font-semibold">Contests</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingStats;
