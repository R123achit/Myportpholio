import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// Dummy data for when backend is not available
const dummyProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application with user authentication, product management, and payment integration.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    image: 'image.png',
    github: 'https://github.com/yourusername/project1',
    live: 'https://project1.com',
  },
  {
    _id: '2',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media metrics with real-time data visualization and reporting.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    image: 'image copy1.png',
    github: 'https://github.com/yourusername/project2',
    live: 'https://project2.com',
  },
  {
    _id: '3',
    title: 'Task Management App',
    description: 'Collaborative task management tool with drag-and-drop functionality and team features.',
    techStack: ['React', 'Redux', 'Node.js', 'PostgreSQL'],
    image: 'image copy2.png',
    github: 'https://github.com/yourusername/project3',
    live: 'https://project3.com',
  },
  // {
  //   _id: '4',
  //   title: 'Weather Forecast App',
  //   description: 'Real-time weather application with location-based forecasts and interactive maps.',
  //   techStack: ['React', 'OpenWeather API', 'Tailwind CSS'],
  //   image: 'https://via.placeholder.com/600x400?text=Weather+Forecast+App',
  //   github: 'https://github.com/yourusername/project4',
  //   live: 'https://project4.com',
  // },
  // {
  //   _id: '5',
  //   title: 'Blog CMS',
  //   description: 'Content management system for blogs with rich text editor and SEO optimization.',
  //   techStack: ['Next.js', 'MongoDB', 'TailwindCSS', 'NextAuth'],
  //   image: 'https://via.placeholder.com/600x400?text=Blog+CMS',
  //   github: 'https://github.com/yourusername/project5',
  //   live: 'https://project5.com',
  // },
  {
    _id: '6',
    title: 'Fitness Tracker',
    description: 'Personal fitness tracking application with workout plans and progress monitoring.',
    techStack: ['React Native', 'Firebase', 'Redux'],
    image: 'image copy3.png',
    github: 'https://github.com/yourusername/project6',
    live: 'https://project6.com',
  },
];

const Portfolio = () => {
  const [projects] = useState(dummyProjects);
  const [loading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

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
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects showcasing my skills and experience
            </p>
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

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
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
