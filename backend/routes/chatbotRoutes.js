import express from 'express';
import axios from 'axios';

const router = express.Router();

// Portfolio context for the AI
const portfolioContext = `
You are an enthusiastic and knowledgeable AI assistant for Rachit Kesarwani's portfolio website. Your responses should be detailed, engaging, and informative.

PERSONAL INFO:
- Name: Rachit Kesarwani
- Role: Full Stack Developer & AI/ML Enthusiast
- Email: rachitkesarwani1000@gmail.com
- GitHub: https://github.com/R123achit
- LinkedIn: https://www.linkedin.com/in/rachit-kesarwani-817b8b280
- Location: India

SKILLS & EXPERTISE:
Frontend Technologies:
- React 19.1.1 (latest version with modern features)
- JavaScript (ES6+)
- HTML5 & CSS3
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- Vite as build tool for lightning-fast development

Backend Technologies:
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- RESTful API design and development
- Server-side rendering and optimization
- Database schema design and management

AI/ML Technologies:
- Python programming
- TensorFlow for deep learning
- PyTorch for neural networks
- Scikit-learn for machine learning algorithms
- Keras for rapid prototyping
- Pandas & NumPy for data manipulation
- Jupyter Notebooks for experimentation
- OpenCV for computer vision

Development Tools:
- Git & GitHub for version control
- VS Code as primary IDE
- Postman for API testing
- npm/yarn package managers
- Chrome DevTools for debugging

COMPETITIVE PROGRAMMING:
- LeetCode Profile: R123achit (actively solving algorithmic problems)
- CodeChef Profile: r123achit
  * Current Rating: 1497
  * Stars: 2★ (2-star coder)
  * Global Rank: 141,515
  * Demonstrates strong problem-solving and algorithmic thinking

PORTFOLIO FEATURES (This Website):
This portfolio showcases advanced web development skills:
- Custom cursor with buttery-smooth animations using requestAnimationFrame
- Particle.js background with interactive particle network
- Scroll progress indicator showing page navigation
- Professional loading animations
- Live coding statistics fetched from LeetCode API
- CodeChef stats integration
- AI-powered chatbot (powered by OpenAI GPT-3.5)
- Fully responsive design (mobile, tablet, desktop)
- Dark mode support with smooth transitions
- Contact form with MongoDB database integration
- Email notifications using Nodemailer
- Smooth scroll animations with Framer Motion
- Modern gradient designs and glassmorphism effects

PROJECTS & CAPABILITIES:
Rachit specializes in building:
- Full-stack MERN (MongoDB, Express, React, Node.js) applications
- AI/ML solutions for real-world problems
- Responsive and accessible web interfaces
- RESTful APIs with proper authentication
- Database-driven applications with complex queries
- Real-time features using WebSockets
- Data visualization dashboards
- E-commerce platforms
- Social media applications
- Portfolio and business websites

WHAT RACHIT OFFERS:
Professional Services:
- Full-stack web application development
- AI/ML model development and deployment
- Responsive UI/UX design and implementation
- Database architecture and optimization
- API development and third-party integrations
- Code review and optimization
- Technical consultation
- Problem-solving with efficient algorithms

WHY HIRE RACHIT:
- Strong foundation in both frontend and backend technologies
- Experience with cutting-edge AI/ML frameworks
- Proven problem-solving skills (competitive programming)
- Modern development practices and clean code
- Passionate about learning new technologies
- Excellent communication and collaboration skills
- Portfolio demonstrates real-world projects

RESPONSE GUIDELINES:
- Be enthusiastic and professional
- Provide detailed explanations when discussing skills or projects
- Include specific technologies and their purposes
- Share relevant links (GitHub, LinkedIn, Email) when asked about contact
- Encourage visitors to explore the portfolio sections
- If asked about availability, mention he's open to opportunities
- Be conversational and friendly, not robotic
- Use emojis occasionally to add personality
- When discussing projects, emphasize both technical skills and problem-solving approach

Remember: You're representing Rachit professionally. Be helpful, informative, and encourage visitors to reach out for collaborations or opportunities!
`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      // Detailed fallback response
      return res.json({
        reply: getDetailedFallbackResponse(message)
      });
    }

    // Call OpenAI API with increased token limit for detailed responses
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: portfolioContext,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 500, // Increased for more detailed responses
        temperature: 0.8, // Slightly higher for more natural, varied responses
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    
    // Use detailed fallback on error
    res.json({ 
      reply: getDetailedFallbackResponse(req.body.message)
    });
  }
});

// Detailed fallback responses when OpenAI is not available
function getDetailedFallbackResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech stack')) {
    return `Rachit is a versatile Full Stack Developer with expertise across multiple domains! 🚀

**Frontend Development:**
He excels in React 19 (the latest version!), creating dynamic and responsive user interfaces. He uses modern tools like Vite for blazing-fast development, Tailwind CSS for beautiful styling, and Framer Motion for smooth, professional animations.

**Backend Development:**
On the server side, Rachit works with Node.js and Express.js to build robust APIs. He's proficient in MongoDB database management and designing scalable architectures that can handle real-world traffic.

**AI/ML Expertise:**
What sets Rachit apart is his AI/ML knowledge! He works with Python, TensorFlow, PyTorch, and Scikit-learn to build intelligent solutions. Whether it's computer vision with OpenCV or data analysis with Pandas, he's got you covered.

**Development Tools:**
He's comfortable with Git/GitHub, VS Code, Postman, and modern development workflows. Plus, he applies his competitive programming skills to write efficient, optimized code! 💡

Want to know more about any specific technology?`;
  }
  
  if (msg.includes('project') || msg.includes('work')) {
    return `Rachit has built some impressive projects that showcase his full-stack capabilities! 🎨

**This Portfolio Website:**
You're experiencing one right now! It features:
- Custom cursor with smooth 60fps animations
- Interactive particle.js background
- Real-time coding stats from LeetCode & CodeChef APIs
- AI-powered chatbot (that's me! 👋)
- Responsive design that works beautifully on all devices
- Dark mode with smooth transitions
- Contact form integrated with MongoDB

**Full-Stack Applications:**
He's developed MERN stack applications with features like user authentication, real-time updates, database management, and RESTful APIs.

**AI/ML Projects:**
Rachit has worked on machine learning models for various use cases, implementing neural networks, computer vision solutions, and data-driven applications.

**What He Can Build For You:**
- E-commerce platforms
- Social media applications
- Business websites and portfolios
- AI-powered tools
- Data visualization dashboards
- Custom web solutions tailored to your needs

Check out the Portfolio section above to see his work in detail! 📁`;
  }
  
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || msg.includes('hire')) {
    return `I'd love to help you connect with Rachit! He's always open to discussing new opportunities and collaborations. 📧

**Email:**
rachitkesarwani1000@gmail.com
Perfect for project inquiries, collaboration opportunities, or just saying hello!

**LinkedIn:**
https://www.linkedin.com/in/rachit-kesarwani-817b8b280
Connect professionally and see his detailed work experience and recommendations.

**GitHub:**
https://github.com/R123achit
Explore his code repositories and see his development style firsthand.

**What Rachit Offers:**
✅ Full-stack web development (MERN stack)
✅ AI/ML solutions and consulting
✅ Responsive UI/UX design
✅ API development and integration
✅ Database architecture
✅ Technical problem-solving

Whether you're looking for a full-time developer, freelance help, or just want to discuss a project idea, feel free to reach out. Rachit typically responds within 24 hours! 🚀

You can also use the contact form on this website - it's directly integrated with his database!`;
  }
  
  if (msg.includes('experience') || msg.includes('about') || msg.includes('who')) {
    return `Let me tell you about Rachit Kesarwani! 👨‍💻

Rachit is a passionate Full Stack Developer and AI/ML enthusiast based in India. What makes him unique is his combination of modern web development skills with cutting-edge artificial intelligence expertise.

**Development Background:**
He's proficient in the complete MERN stack (MongoDB, Express, React, Node.js) and has hands-on experience building production-ready applications. From designing databases to creating beautiful, responsive frontends, he handles it all.

**AI/ML Journey:**
Beyond web development, Rachit dives deep into AI/ML technologies. He works with TensorFlow, PyTorch, and various machine learning frameworks to build intelligent solutions that solve real-world problems.

**Problem-Solving Skills:**
His competitive programming experience (CodeChef 2★, active on LeetCode) demonstrates strong algorithmic thinking and problem-solving abilities. This translates into writing efficient, optimized code in real projects.

**What Drives Him:**
Rachit is constantly learning and staying updated with the latest technologies. This portfolio itself showcases modern web features like custom cursors, particle effects, and AI chatbots - all built from scratch!

**Current Focus:**
He's actively working on full-stack projects, AI/ML applications, and is open to exciting opportunities where he can make a meaningful impact.

Want to know more about his specific skills or projects? Just ask! 😊`;
  }
  
  if (msg.includes('leetcode') || msg.includes('codechef') || msg.includes('competitive') || msg.includes('coding stat')) {
    return `Rachit is actively involved in competitive programming! 🏆

**LeetCode:**
Username: R123achit
He regularly solves algorithmic problems on LeetCode, focusing on data structures, algorithms, and problem-solving patterns. This platform helps him sharpen his coding skills and prepare for technical interviews.

**CodeChef:**
Username: r123achit
- Current Rating: 1497
- Stars: 2★ (2-star coder)
- Global Rank: 141,515

His CodeChef journey demonstrates consistent growth and dedication to improving his algorithmic thinking.

**Why This Matters:**
Competitive programming isn't just about solving puzzles - it teaches:
✅ Efficient algorithm design
✅ Optimized time and space complexity
✅ Problem-solving under pressure
✅ Clean, bug-free code writing
✅ Understanding of data structures

**Real-World Impact:**
These skills directly translate to writing better production code. When building applications, Rachit can optimize database queries, improve API performance, and handle edge cases effectively.

You can see his live stats in the "Coding Stats" section above! The LeetCode stats update in real-time! �`;
  }

  // Default response
  return `Hello! 👋 I'm Rachit's AI assistant, and I'm here to help you learn all about his skills and experience!

**I can tell you about:**

💡 **Skills & Technologies**
Ask about his frontend, backend, or AI/ML expertise

� **Projects & Portfolio**
Learn about the amazing projects he's built

🎓 **Experience & Background**
Discover his journey as a developer

🏆 **Competitive Programming**
Explore his LeetCode and CodeChef achievements

📧 **Contact & Opportunities**
Find out how to reach him for collaborations

**Try asking questions like:**
- "What are Rachit's skills?"
- "Tell me about his projects"
- "What's his experience with AI/ML?"
- "How can I hire him?"
- "What are his coding stats?"

I'm here to provide detailed answers to help you get to know Rachit better! What would you like to know? 😊`;
}

export default router;
