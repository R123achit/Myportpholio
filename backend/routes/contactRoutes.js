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
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Portfolio Contact from ${name}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><strong>Reply to:</strong> ${email}</p>
          `,
          replyTo: email,
        });
        emailSent = true;
        console.log('✅ Email sent successfully');
      } catch (emailError) {
        console.error('⚠️  Email sending failed:', emailError.message);
        // Continue even if email fails
      }
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
