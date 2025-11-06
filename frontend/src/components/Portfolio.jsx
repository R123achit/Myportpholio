import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingGithub, setUsingGithub] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Fetch projects from GitHub API
  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/github/repos`);
        
        if (response.data.success && response.data.projects.length > 0) {
          setProjects(response.data.projects);
          setUsingGithub(true);
          console.log('✅ Loaded projects from GitHub:', response.data.projects.length);
        } else {
          setProjects([]);
          setUsingGithub(false);
          setError('No projects found');
          console.log('⚠️ No projects found');
        }
      } catch (err) {
        console.error('❌ Failed to fetch GitHub repos:', err.message);
        setProjects([]);
        setUsingGithub(false);
        setError('Failed to load projects. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchGithubProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
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
              PORTFOLIO
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            {error && (
              <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                {error}
              </p>
            )}
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* GitHub Stats (if available) */}
                    {usingGithub && (project.stars > 0 || project.forks > 0) && (
                      <div className="flex gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {project.stars > 0 && (
                          <div className="flex items-center gap-1">
                            <FiStar className="text-yellow-500" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.forks > 0 && (
                          <div className="flex items-center gap-1">
                            <FiGitBranch className="text-blue-500" />
                            <span>{project.forks}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full capitalize"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                          <FiGithub className="text-xl" />
                          <span className="text-sm font-medium">Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                          <FiExternalLink className="text-xl" />
                          <span className="text-sm font-medium">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
