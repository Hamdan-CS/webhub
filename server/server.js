const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const contactRoutes = require('./contact-routes');
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', contactRoutes);
// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  process.exit(1);
}
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
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
if (!emailUser || !emailPass) {
  console.error('❌ Error: EMAIL_USER and EMAIL_PASS environment variables are required');
  process.exit(1);
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
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
      from: `"WebHub Careers" <${process.env.EMAIL_USER || 'abuhamdan0557@gmail.com'}>`,
      to: 'abuhamdan0557@gmail.com',
      subject: emailSubject,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
      attachments: attachments
    };

    // Send email
    console.log('📤 Sending email to abuhamdan0557@gmail.com...');
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
app.get('/', (req, res) => {
  res.send('WebHub backend is running');
});

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
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'abuhamdan0557@gmail.com'}`);
  console.log(`📬 Applications will be sent to: abuhamdan0557@gmail.com`);
  console.log(`🗄️  Supabase URL: ${supabaseUrl}`);
  console.log(`✅ Ready to accept applications!`);
});

module.exports = app;