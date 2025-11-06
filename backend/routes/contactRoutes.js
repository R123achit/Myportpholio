import express from 'express';
import Contact from '../models/Contact.js';
import pkg from 'nodemailer';
const { createTransport } = pkg;

const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return null;
};

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Try to save to database
    let savedToDb = false;
    try {
      const contact = new Contact({ name, email, message });
      await contact.save();
      savedToDb = true;
      console.log('✅ Contact saved to database');
    } catch (dbError) {
      console.error('⚠️  Database save failed:', dbError.message);
      // Continue even if database fails
    }

    // Send email notification (if configured)
    let emailSent = false;
    const transporter = createTransporter();
    
    if (transporter) {
      try {
        console.log('📧 Attempting to send email notification...');
        
        const mailOptions = {
          from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `New Portfolio Contact from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div style="background: white; padding: 20px; border-left: 4px solid #4F46E5;">
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280;">
                <a href="mailto:${email}?subject=Re: Your message" 
                   style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reply to ${name}
                </a>
              </p>
            </div>
          `,
          replyTo: email,
        };
        
        const info = await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log('✅ Email sent successfully!');
        console.log('📨 Message ID:', info.messageId);
      } catch (emailError) {
        console.error('❌ Email sending failed!');
        console.error('Error details:', emailError.message);
        console.error('Error code:', emailError.code);
        // Continue even if email fails
      }
    } else {
      console.log('⚠️  Email transporter not configured (EMAIL_USER or EMAIL_PASS missing)');
    }

    // Log the contact info to console as backup
    console.log('\n📬 NEW CONTACT FORM SUBMISSION:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('---\n');

    // Always return success
    res.status(201).json({
      message: 'Message received successfully! I will get back to you soon.',
      contact: { name, email },
      debug: {
        savedToDb,
        emailSent,
      },
    });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    // Even on error, try to return success to user
    res.status(200).json({
      message: 'Message received! Thank you for reaching out.',
    });
  }
});

// Get all contacts (for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Update contact status (for admin)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

export default router;
