# Contact Form Setup Guide

Your contact form is now configured to work with full functionality! Follow these steps:

## ✅ What's Already Done:
1. ✅ Backend API route created (`/api/contact`)
2. ✅ MongoDB model for saving messages
3. ✅ Nodemailer configuration for email notifications
4. ✅ Frontend form connected to backend
5. ✅ Vite proxy configured to connect frontend to backend

## 📧 Email Configuration Required:

To receive email notifications when someone contacts you, you need to set up a Gmail App Password:

### Step 1: Create Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Under "How you sign in to Google", enable **2-Step Verification** (if not already enabled)
4. After 2-Step Verification is enabled, go back to Security
5. Under "How you sign in to Google", click on **App passwords**
6. Click **Select app** → Choose "Mail"
7. Click **Select device** → Choose "Other (Custom name)"
8. Type "Portfolio Contact Form" and click **Generate**
9. Copy the 16-character password (looks like: `xxxx xxxx xxxx xxxx`)

### Step 2: Update Backend .env File

Open `backend/.env` and replace `your_gmail_app_password_here` with your actual app password:

```
EMAIL_USER=rachitkesarwani1000@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**Note:** Remove the spaces from the app password, so it looks like: `xxxxxxxxxxxxxxxx`

## 🚀 How to Run:

### Terminal 1 - Start Backend Server:
```powershell
cd backend
npm start
```
You should see: `✅ Server running on port 5000`

### Terminal 2 - Start Frontend Server:
```powershell
cd frontend
npm run dev
```
You should see: `Local: http://localhost:5174/`

## 📋 How It Works:

1. **HR fills out the contact form** with their name, email, and message
2. **Clicks "Send Message"** button
3. **Form shows "Sending..." spinner**
4. **Backend saves the message** to MongoDB database
5. **You receive an email notification** at `rachitkesarwani1000@gmail.com` with:
   - Subject: "New Portfolio Contact from [Their Name]"
   - Content: Their name, email, and message
6. **Form shows success message** to the user
7. **You can reply** to their email directly from your inbox

## 🗄️ Database Storage:

All contact messages are saved in MongoDB with:
- Name
- Email
- Message
- Timestamp (createdAt)

You can view all messages later by querying the database.

## ✅ Testing:

1. Make sure both backend and frontend servers are running
2. Go to your portfolio contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email inbox for the notification
6. Check MongoDB to verify the message was saved

## 🔧 Troubleshooting:

### "Failed to send message" error:
- ✅ Check if backend server is running on port 5000
- ✅ Check if MongoDB is running
- ✅ Verify EMAIL_USER and EMAIL_PASS in backend/.env

### No email received:
- ✅ Check if you entered the correct Gmail App Password
- ✅ Make sure 2-Step Verification is enabled on your Google account
- ✅ Check spam/junk folder
- ✅ Check backend console for any email errors

### Database connection error:
- ✅ Make sure MongoDB is installed and running
- ✅ Run: `mongod` in a separate terminal

## 📝 Alternative (Without Email):

If you don't want to set up email notifications, the form will still work! Messages will be saved to the database, and the form will show success to users. You just won't get email notifications.

To disable email notifications, leave EMAIL_USER and EMAIL_PASS empty in `.env`:
```
EMAIL_USER=
EMAIL_PASS=
```

---

**Your contact form is ready! Just add your Gmail App Password and start both servers.**
