import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
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
              ABOUT ME
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="/profile1.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                </motion.div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                Full Stack Developer & Designer
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm a passionate Full Stack Developer currently pursuing B.Tech in Information Technology.
                With a strong foundation in both frontend and backend technologies, I love creating
                beautiful, functional, and user-friendly applications.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                My journey in web development started with a curiosity about how websites work, and
                it has evolved into a passion for building scalable applications using the MERN stack.
                I'm constantly learning new technologies and best practices to improve my skills.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-blue-500">15+</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Projects</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-purple-500">3+</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Years Exp</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-pink-500">10+</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Technologies</p>
                </div>
              </div>

              {/* Expertise Areas */}
              <div className="pt-6">
                <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  What I Do
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">Development</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Building scalable full-stack applications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">Maintenance</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Maintaining and optimizing web applications
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
