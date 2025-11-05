import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration using Stripe.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'TailwindCSS'],
    image: 'https://via.placeholder.com/600x400?text=E-Commerce+Platform',
    github: 'https://github.com/yourusername/ecommerce-platform',
    live: 'https://ecommerce-demo.com',
    featured: true,
    order: 1,
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media metrics with real-time data visualization, charts, and comprehensive reporting features.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Redux'],
    image: 'https://via.placeholder.com/600x400?text=Social+Media+Dashboard',
    github: 'https://github.com/yourusername/social-dashboard',
    live: 'https://dashboard-demo.com',
    featured: true,
    order: 2,
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with drag-and-drop functionality, team features, real-time updates, and project tracking.',
    techStack: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Socket.io'],
    image: 'https://via.placeholder.com/600x400?text=Task+Management+App',
    github: 'https://github.com/yourusername/task-manager',
    live: 'https://taskmanager-demo.com',
    featured: true,
    order: 3,
  },
  {
    title: 'Weather Forecast App',
    description: 'Real-time weather application with location-based forecasts, interactive maps, and 7-day weather predictions.',
    techStack: ['React', 'OpenWeather API', 'Tailwind CSS', 'Mapbox'],
    image: 'https://via.placeholder.com/600x400?text=Weather+Forecast+App',
    github: 'https://github.com/yourusername/weather-app',
    live: 'https://weather-demo.com',
    order: 4,
  },
  {
    title: 'Blog CMS',
    description: 'Content management system for blogs with rich text editor, SEO optimization, image uploads, and user management.',
    techStack: ['Next.js', 'MongoDB', 'TailwindCSS', 'NextAuth', 'Cloudinary'],
    image: 'https://via.placeholder.com/600x400?text=Blog+CMS',
    github: 'https://github.com/yourusername/blog-cms',
    live: 'https://blog-demo.com',
    order: 5,
  },
  {
    title: 'Fitness Tracker',
    description: 'Personal fitness tracking application with workout plans, progress monitoring, calorie tracking, and achievement system.',
    techStack: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    image: 'https://via.placeholder.com/600x400?text=Fitness+Tracker',
    github: 'https://github.com/yourusername/fitness-tracker',
    live: 'https://fitness-demo.com',
    order: 6,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('✅ Sample projects added successfully');

    console.log('\n📊 Database seeded with sample data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
