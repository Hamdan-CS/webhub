const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase configuration
const supabaseUrl = 'https://efczaugqvccoeyxatrbr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmY3phdWdxdmNjb2V5eGF0cmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzE1MjIsImV4cCI6MjA2Nzk0NzUyMn0.laLJz1b3gGlGd-MbD7HwuJaCR1wl5UJgfMAa9npNi6o';
const supabase = createClient(supabaseUrl, supabaseKey);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

// Configure nodemailer
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-sending-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Career application endpoint
app.post('/apply', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 }
]), async (req, res) => {
  try {
    const { fullName, email, phone, workMode, message, position } = req.body;
    const cvFile = req.files?.cv?.[0];
    const coverLetterFile = req.files?.coverLetter?.[0];

    // Validate required fields
    if (!fullName || !email || !phone || !workMode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!cvFile) {
      return res.status(400).json({ error: 'CV file is required' });
    }

    console.log('📧 Processing application for:', fullName);

    // Prepare email content
    const emailSubject = `New Job Application from ${fullName} - ${position || 'General Application'}`;
    const emailBody = `
New job application received:

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Position: ${position || 'General Application'}
Mode of Working: ${workMode}

Message:
${message || 'No additional message provided'}

---
This application was submitted through the WebHub careers page.
    `.trim();

    // Prepare attachments
    const attachments = [
      {
        filename: cvFile.originalname,
        content: cvFile.buffer,
        contentType: cvFile.mimetype
      }
    ];

    if (coverLetterFile) {
      attachments.push({
        filename: coverLetterFile.originalname,
        content: coverLetterFile.buffer,
        contentType: coverLetterFile.mimetype
      });
    }

    // Email options
    const mailOptions = {
      from: `"WebHub Careers" <${process.env.EMAIL_USER || 'your-sending-email@gmail.com'}>`,
      to: 'some12thing@gmail.com',
      subject: emailSubject,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
      attachments: attachments
    };

    // Send email
    console.log('📤 Sending email to some12thing@gmail.com...');
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');

    // Save to Supabase
    console.log('💾 Saving to Supabase database...');
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          name: fullName,
          email: email,
          phone: phone,
          mode_of_working: workMode,
          message: message || null,
          cv_filename: cvFile.originalname,
          cover_letter_filename: coverLetterFile ? coverLetterFile.originalname : null,
          position: position === 'Talent Submission' ? 'Talent Submission' : (position || 'General Application'),
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('❌ Supabase error:', error);
      // Still return success since email was sent
      console.log('⚠️ Email sent but database save failed');
    } else {
      console.log('✅ Data saved to Supabase successfully!');
    }

    // Generate application ID
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.status(200).json({ 
      message: 'Application submitted successfully!',
      applicationId: applicationId,
      emailSent: true,
      dataSaved: !error
    });

  } catch (error) {
    console.error('❌ Error processing application:', error);
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
    }
    
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ 
      error: 'Failed to process application',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    supabase: 'Connected',
    email: 'Configured'
  });
});

// Test Supabase connection
app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    res.json({ 
      message: 'Supabase connection successful',
      data: data
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Supabase connection failed',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 WebHub Career Application Server`);
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'your-sending-email@gmail.com'}`);
  console.log(`📬 Applications will be sent to: some12thing@gmail.com`);
  console.log(`🗄️  Supabase URL: ${supabaseUrl}`);
  console.log(`✅ Ready to accept applications!`);
});

module.exports = app;