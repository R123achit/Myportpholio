import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
} from 'react-icons/fa';
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiBootstrap,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiPostman,
  SiSocketdotio,
  SiNodedotjs,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiKeras,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiPython,
  SiOpencv,
} from 'react-icons/si';

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: 'Using Now',
      skills: [
        { name: 'HTML5', icon: <FaHtml5 />, color: 'text-orange-500' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: 'text-blue-500' },
        { name: 'JavaScript', icon: <FaJs />, color: 'text-yellow-500' },
        { name: 'React', icon: <FaReact />, color: 'text-cyan-500' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-black dark:text-white' },
        { name: 'Git', icon: <FaGitAlt />, color: 'text-orange-600' },
        { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-500' },
        { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-600' },
        { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-600' },
        { name: 'Express', icon: <SiExpress />, color: 'text-gray-700 dark:text-gray-400' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-cyan-400' },
      ],
    },
    {
      title: 'Learning',
      skills: [
        
        { name: 'Postman', icon: <SiPostman />, color: 'text-orange-500' },
        { name: 'Socket.io', icon: <SiSocketdotio />, color: 'text-yellow-500' },
        { name: 'Redux', icon: <SiRedux />, color: 'text-purple-600' },
        {name: 'tensorflow', icon: <SiTensorflow/>, color: 'text-orange-600' },
        {name: 'pytorch', icon: <SiPytorch/>, color: 'text-red-500' },
        {name: 'scikitlearn', icon: <SiScikitlearn/>, color: 'text-orange-400' },
        {name: 'keras', icon: <SiKeras/>, color: 'text-red-600' },
        {name: 'pandas', icon: <SiPandas/>, color: 'text-blue-700' },
        {name: 'numpy', icon: <SiNumpy/>, color: 'text-blue-600' },
        {name: 'jupyter', icon: <SiJupyter/>, color: 'text-orange-500' },
        {name: 'opencv', icon: <SiOpencv/>, color: 'text-green-600' },
      ],
    },
    {
      title: 'AI & ML',
      skills: [
        { name: 'Python', icon: <SiPython />, color: 'text-blue-500' },
        { name: 'TensorFlow', icon: <SiTensorflow />, color: 'text-orange-600' },
        { name: 'PyTorch', icon: <SiPytorch />, color: 'text-red-500' },
        { name: 'Scikit-learn', icon: <SiScikitlearn />, color: 'text-orange-400' },
        { name: 'Keras', icon: <SiKeras />, color: 'text-red-600' },
        { name: 'Pandas', icon: <SiPandas />, color: 'text-blue-700' },
        { name: 'NumPy', icon: <SiNumpy />, color: 'text-blue-600' },
        { name: 'Jupyter', icon: <SiJupyter />, color: 'text-orange-500' },
        { name: 'OpenCV', icon: <SiOpencv />, color: 'text-green-600' },
      ],
    },
  ];

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

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
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
              SKILLS
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div key={categoryIndex} variants={itemVariants}>
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-700 dark:text-gray-300">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative"
                    >
                      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600">
                        <div className={`text-5xl mb-3 ${skill.color} transition-transform group-hover:scale-110`}>
                          {skill.icon}
                        </div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </p>
                      </div>
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Other Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['RESTful APIs', 'Responsive Design', 'Problem Solving', 'Team Collaboration', 'Agile/Scrum'].map(
                (skill, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {skill}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
