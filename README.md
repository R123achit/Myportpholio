# Portfolio Website - MERN Stack

A modern, responsive full-stack developer portfolio website built with the MERN stack (MongoDB, Express.js, React + Vite, Node.js) and styled with Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Dynamic Content**: Projects fetched from MongoDB database
- **Contact Form**: Functional contact form with email notifications
- **Modern UI**: Clean, professional design with gradient accents
- **SEO Friendly**: Optimized for search engines

## 📦 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Framer Motion
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer
- CORS

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally
- Git

### Clone the repository
```bash
git clone <your-repo-url>
cd Final_portpholi
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file
copy .env.example .env

# Edit .env with your configuration
# Then seed the database with sample projects
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
```

## 🎨 Customization

### Update Personal Information
1. **Hero Section**: Edit `frontend/src/components/Hero.jsx`
   - Update your name, title, and description
   - Change social media links

2. **About Section**: Edit `frontend/src/components/About.jsx`
   - Replace placeholder image with your photo
   - Update bio and experience

3. **Skills**: Edit `frontend/src/components/Skills.jsx`
   - Add/remove skills and technologies

4. **Contact**: Edit `frontend/src/components/Contact.jsx`
   - Update contact information

### Add Projects
You can add projects in two ways:

1. **Via Database** (Recommended):
   - Use MongoDB Compass or shell to add projects directly
   - Or create an admin panel (future enhancement)

2. **Via API**:
   ```bash
   POST http://localhost:5000/api/projects
   Content-Type: application/json

   {
     "title": "Project Name",
     "description": "Project description",
     "techStack": ["React", "Node.js"],
     "image": "image-url",
     "github": "github-url",
     "live": "live-demo-url"
   }
   ```

## 📱 Sections

- **Navbar**: Fixed navigation with smooth scrolling
- **Hero**: Landing section with animated text
- **About**: Personal information and expertise
- **Skills**: Technology stack showcase
- **Portfolio**: Project gallery with filters
- **Contact**: Contact form and information
- **Footer**: Social links and credits

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to Vercel or Netlify

### Backend (Render/Railway/Heroku)
1. Push your code to GitHub
2. Connect your repository to the hosting platform
3. Set environment variables
4. Deploy!

### Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas
2. Get your connection string
3. Update `MONGODB_URI` in your backend `.env`

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👨‍💻 Author

Your Name - B.Tech Final Year Student
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from React Icons
- Animations powered by Framer Motion
