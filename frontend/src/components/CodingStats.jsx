import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiTrendingUp, FiAward, FiActivity } from 'react-icons/fi';
import { SiLeetcode, SiCodechef, SiCodeforces, SiGeeksforgeeks } from 'react-icons/si';

const CodingStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [stats, setStats] = useState({
    leetcode: {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
      loading: true,
      error: false,
    },
    codechef: {
      rating: 0,
      stars: 0,
      globalRank: 0,
      highestRating: 0,
      loading: true,
      error: false,
    },
  });

  // Replace with your actual usernames
  const leetcodeUsername = 'R123cahit';
  const codechefUsername = 'r123achit';
  
  // Manual CodeChef stats - UPDATE THESE WITH YOUR REAL STATS
  // Go to https://www.codechef.com/users/r123achit and copy your stats here
  const manualCodeChefStats = {
    rating: 1497,        // Your current rating
    stars: 2,            // Your stars (1-7 based on rating)
    globalRank: 141515,  // Your global rank
    highestRating: 1497, // Your highest rating
  };

  useEffect(() => {
    // Fetch LeetCode Stats using public API
    const fetchLeetCodeStats = async () => {
      try {
        // Using LeetCode public API endpoint
        const response = await fetch(
          `https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`
        );
        const data = await response.json();
        
        if (data && data.totalSolved !== undefined) {
          setStats((prev) => ({
            ...prev,
            leetcode: {
              totalSolved: data.totalSolved || 0,
              easySolved: data.easySolved || 0,
              mediumSolved: data.mediumSolved || 0,
              hardSolved: data.hardSolved || 0,
              ranking: data.ranking || 0,
              loading: false,
              error: false,
            },
          }));
          console.log('✅ LeetCode data fetched successfully:', data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('❌ LeetCode API Error:', error);
        // Try alternative API
        try {
          const altResponse = await fetch(
            `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/solved`
          );
          const altData = await altResponse.json();
          
          if (altData && altData.solvedProblem !== undefined) {
            setStats((prev) => ({
              ...prev,
              leetcode: {
                totalSolved: altData.solvedProblem || 0,
                easySolved: altData.easySolved || 0,
                mediumSolved: altData.mediumSolved || 0,
                hardSolved: altData.hardSolved || 0,
                ranking: altData.ranking || 0,
                loading: false,
                error: false,
              },
            }));
            console.log('✅ LeetCode data fetched from alternative API');
          } else {
            throw new Error('Alternative API also failed');
          }
        } catch (altError) {
          console.error('❌ Alternative LeetCode API also failed');
          setStats((prev) => ({
            ...prev,
            leetcode: {
              totalSolved: 250,
              easySolved: 120,
              mediumSolved: 100,
              hardSolved: 30,
              ranking: 150000,
              loading: false,
              error: true,
            },
          }));
        }
      }
    };

    // Fetch CodeChef Stats using CodeChef API
    const fetchCodeChefStats = async () => {
      // CodeChef APIs have CORS issues, using manual stats
      console.log('📊 Using manual CodeChef stats (APIs blocked by CORS)');
      
      const useManual = manualCodeChefStats.rating > 0;
      
      setStats((prev) => ({
        ...prev,
        codechef: {
          rating: manualCodeChefStats.rating,
          stars: manualCodeChefStats.stars,
          globalRank: manualCodeChefStats.globalRank,
          highestRating: manualCodeChefStats.highestRating,
          loading: false,
          error: !useManual,
        },
      }));
      
      if (useManual) {
        console.log('✅ CodeChef stats loaded:', manualCodeChefStats);
      } else {
        console.log('⚠️ Please update manualCodeChefStats in CodingStats.jsx (lines 33-37)');
      }
    };

    // Execute fetch functions
    console.log('🔄 Fetching stats for:', { leetcodeUsername, codechefUsername });
    fetchLeetCodeStats();
    fetchCodeChefStats();
  }, [leetcodeUsername, codechefUsername]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const platforms = [
    {
      name: 'LeetCode',
      icon: <SiLeetcode />,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
      stats: [
        { label: 'Total Solved', value: stats.leetcode.totalSolved, icon: <FiCode /> },
        { label: 'Easy', value: stats.leetcode.easySolved, color: 'text-green-500' },
        { label: 'Medium', value: stats.leetcode.mediumSolved, color: 'text-yellow-500' },
        { label: 'Hard', value: stats.leetcode.hardSolved, color: 'text-red-500' },
      ],
      loading: stats.leetcode.loading,
      error: stats.leetcode.error,
    },
    {
      name: 'CodeChef',
      icon: <SiCodechef />,
      color: 'from-brown-500 to-orange-600',
      bgColor: 'bg-orange-600/10',
      stats: [
        { label: 'Current Rating', value: stats.codechef.rating, icon: <FiTrendingUp /> },
        { label: 'Stars', value: `${stats.codechef.stars}★`, icon: <FiAward />, color: 'text-yellow-500' },
        { label: 'Global Rank', value: stats.codechef.globalRank.toLocaleString() },
        { label: 'Highest Rating', value: stats.codechef.highestRating },
      ],
      loading: stats.codechef.loading,
      error: stats.codechef.error,
    },
  ];

  return (
    <section id="coding-stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              CODING STATS
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My competitive programming journey across various platforms
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Platform Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`text-5xl bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {platform.error ? '⚠️ Using Demo Data' : '✅ Live Statistics'}
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                {platform.loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {platform.stats.map((stat, statIndex) => (
                      <motion.div
                        key={statIndex}
                        whileHover={{ scale: 1.05 }}
                        className={`${platform.bgColor} backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-600`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {stat.icon && (
                            <span className="text-lg text-gray-600 dark:text-gray-400">
                              {stat.icon}
                            </span>
                          )}
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {stat.label}
                          </p>
                        </div>
                        <p className={`text-2xl font-bold ${stat.color || 'text-gray-800 dark:text-white'}`}>
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Decorative Elements */}
                <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r ${platform.color} opacity-10 rounded-full blur-3xl`}></div>
              </motion.div>
            ))}
          </div>

          {/* Additional Platforms (Optional) */}
          <motion.div variants={itemVariants} className="mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { name: 'Codeforces', icon: <SiCodeforces />, value: '1500+', color: 'text-blue-500' },
                { name: 'GeeksforGeeks', icon: <SiGeeksforgeeks />, value: '500+', color: 'text-green-600' },
                { name: 'Total Problems', icon: <FiCode />, value: '800+', color: 'text-purple-500' },
                { name: 'Active Days', icon: <FiActivity />, value: '150+', color: 'text-pink-500' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`text-4xl mx-auto mb-3 ${item.color}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {item.name}
                  </h4>
                  <p className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodingStats;
