# 🤖 AI Chatbot Setup Guide

## ✨ Features

Your portfolio now includes an **AI-powered chatbot** that can answer questions about:
- ✅ Your skills and technologies
- ✅ Your projects and experience
- ✅ How to contact you
- ✅ Your competitive programming stats
- ✅ General portfolio information

## 🔑 Step 1: Get OpenAI API Key

### Option 1: OpenAI (Recommended)

1. **Go to:** https://platform.openai.com/signup
2. **Sign up** or login
3. **Go to API Keys:** https://platform.openai.com/api-keys
4. **Click:** "Create new secret key"
5. **Copy the key** (starts with `sk-...`)
6. **Save it securely** (you won't see it again!)

**Cost:** Free tier includes $5 credit, then very cheap (~$0.002 per conversation)

### Option 2: Free Alternative APIs (If you don't want to use OpenAI)

You can modify the chatbot to use free alternatives like:
- Hugging Face Inference API (free)
- Cohere API (free tier available)
- Local LLaMA models (completely free)

---

## 🔧 Step 2: Add API Key to Environment

### For Local Development:

1. Open `backend/.env`
2. Replace `your_openai_api_key_here` with your actual API key:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
EMAIL_USER=rachitkesarwani1000@gmail.com
EMAIL_PASS=qegufdtbasxjqxgg
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### For Production (Vercel):

1. Go to **Vercel Dashboard** → Your Backend Project
2. **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-your-actual-api-key-here`
4. **Redeploy** the backend

---

## 📦 Step 3: Install Dependencies

```powershell
# Install backend dependency
cd backend
npm install axios

# (Frontend already has axios installed)
```

---

## 🚀 Step 4: Run the Chatbot

### Start Backend:
```powershell
cd backend
npm run dev
```

### Start Frontend:
```powershell
cd frontend
npm run dev
```

### Test the Chatbot:
1. Open http://localhost:5174
2. Look for the **chat bubble** in the bottom-right corner
3. Click it and ask questions!

---

## 💬 Example Questions to Ask

- "What are Rachit's skills?"
- "Tell me about his projects"
- "What's his experience?"
- "How can I contact him?"
- "What technologies does he know?"
- "Tell me about his competitive programming"
- "What makes Rachit a good developer?"

---

## 🎨 Chatbot Features

### Visual Features:
- ✨ Smooth animations with Framer Motion
- 💬 Real-time typing indicators
- 🎯 Quick question suggestions
- 📱 Fully responsive design
- 🌓 Dark mode support
- 🎨 Gradient UI matching portfolio theme

### Technical Features:
- 🤖 OpenAI GPT-3.5 Turbo integration
- 🔄 Automatic fallback responses (if API fails)
- ⚡ Fast response times
- 💾 Context-aware about your portfolio
- 🛡️ Error handling and graceful degradation

---

## 🔧 Customization

### Update Portfolio Information:

Edit `backend/routes/chatbotRoutes.js` and modify the `portfolioContext` variable with your updated information.

### Change AI Model:

In `chatbotRoutes.js`, change the model:
```javascript
model: 'gpt-4', // Instead of 'gpt-3.5-turbo' (more expensive but better)
```

### Adjust Response Length:

```javascript
max_tokens: 300, // Increase for longer responses
```

### Change Personality:

Modify the system prompt in `portfolioContext` to change how the AI responds.

---

## 🐛 Troubleshooting

### Issue 1: Chatbot not responding
**Solution:** Check if `OPENAI_API_KEY` is set in `.env`

### Issue 2: API errors
**Solution:** Verify your OpenAI API key is valid and has credits

### Issue 3: Fallback responses only
**Solution:** Check backend console for error messages, may need to add payment method to OpenAI

### Issue 4: CORS errors
**Solution:** Make sure backend is running and CORS is configured

---

## 💰 Cost Optimization

### Current Setup:
- Model: GPT-3.5 Turbo
- Cost: ~$0.002 per chat message
- 100 messages = ~$0.20

### Tips to Reduce Costs:
1. Use `max_tokens: 150` instead of 300
2. Cache common responses
3. Use free tier ($5 credit)
4. Switch to free alternatives if needed

---

## 🆓 Free Alternative Setup (Optional)

If you want to avoid OpenAI costs, you can use Hugging Face:

1. Get free API key from: https://huggingface.co/settings/tokens
2. Update `chatbotRoutes.js` to use Hugging Face Inference API
3. Use models like: `mistralai/Mistral-7B-Instruct-v0.1`

---

## ✅ Checklist

- [ ] OpenAI account created
- [ ] API key obtained
- [ ] API key added to `backend/.env`
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend running successfully
- [ ] Frontend running successfully
- [ ] Chatbot button visible on portfolio
- [ ] Test conversation working
- [ ] Portfolio information accurate in chatbot context

---

## 🎉 You're Done!

Your portfolio now has an **AI chatbot** that can:
- Answer visitor questions 24/7
- Showcase your skills intelligently
- Provide instant information
- Engage visitors professionally
- Make your portfolio stand out!

**The chatbot bubble appears in the bottom-right corner of your portfolio!** 🚀

---

*For production deployment, remember to add `OPENAI_API_KEY` to Vercel environment variables!*
