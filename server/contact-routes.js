const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const emailUser = process.env.EMAIL_USER;
const emailPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');
if (!emailUser) {
  console.error('❌ Error: EMAIL_USER environment variable is required');
  process.exit(1);
}

const createTransporters = () => {
  const common = {
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 25000,
    tls: {
      servername: 'smtp.gmail.com',
      minVersion: 'TLSv1.2',
    },
  };

  return [
    nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      ...common,
    }),
    nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      ...common,
    }),
  ];
};

const sendWithFallback = async (mailOptions, logLabel) => {
  const transporters = createTransporters();
  let lastError = null;

  for (const transporter of transporters) {
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      lastError = error;
      console.error(`Email error (${logLabel}):`, error);
    }
  }

  if (lastError) {
    throw lastError;
  }

  return false;
};

router.post('/contact', async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    console.log('📝 Processing contact form from:', email);

    if (!name || !email || !topic || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, topic, message',
      });
    }

    const emailSubject = `New Contact Form Submission - ${topic}`;
    const emailBody = `
New contact form submission received:

Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${message}

---
This message was submitted through the WebHub contact form.
    `.trim();

    let emailSent = false;
    let dataSaved = false;

    try {
      await sendWithFallback({
        from: `"WebHub Contact Form" <${emailUser}>`,
        to: emailUser,
        replyTo: email,
        subject: emailSubject,
        text: emailBody,
        html: emailBody.replace(/\n/g, '<br>'),
      }, 'contact');
      emailSent = true;
    } catch (mailError) {
      console.error('Email failed after fallback attempts (contact):', mailError);
    }

    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          topic,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Database error (contact_submissions):', error);
    } else {
      dataSaved = true;
    }

    if (!emailSent && !dataSaved) {
      return res.status(500).json({
        error: 'Failed to process contact form',
        details: 'Both email delivery and database save failed.',
      });
    }

    console.log('✅ Contact form processed successfully');

    return res.status(200).json({
      message: 'Contact form submitted successfully!',
      submissionId: `sub_${Date.now()}`,
      emailSent,
      dataSaved,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: 'Failed to process contact form',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

router.post('/submit-service-request', async (req, res) => {
  try {
    const { selectedService, email, domain, socialMedia, message } = req.body;

    if (!selectedService || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: selectedService, email, message',
      });
    }

    const serviceMap = {
      // Initial Setup types
      website: { label: 'Website Setup', price: '$150 - $300', type: 'Initial Setup' },
      social: { label: 'Social Media Setup', price: '$100 - $200', type: 'Initial Setup' },
      seo: { label: 'SEO & Google My Business', price: '$100 - $200', type: 'Initial Setup' },
      // Additional services
      posters: { label: 'Promotional Posters', price: '$50 - $100', type: 'Additional Service' },
      events: { label: 'Event Content Creation', price: '$75 - $150', type: 'Additional Service' },
    };

    const serviceInfo = serviceMap[selectedService] || { label: selectedService, price: '', type: 'Service' };

    const emailSubject = `New Service Request: ${serviceInfo.label} (${serviceInfo.price})`;
    const emailBody = `New service request received:\n\nType: ${serviceInfo.type}\nSelected: ${serviceInfo.label}\nPrice: ${serviceInfo.price}\nCustomer Email: ${email}\n\n---\nThis request was submitted through the WebHub services page.`;

    let emailSent = false;
    let dataSaved = false;

    try {
      await sendWithFallback({
        from: `"WebHub Services" <${emailUser}>`,
        to: emailUser,
        subject: emailSubject,
        text: emailBody,
        html: emailBody.replace(/\n/g, '<br>'),
      }, 'service request');
      emailSent = true;
    } catch (mailError) {
      console.error('Email failed after fallback attempts (service request):', mailError);
    }

    const { error } = await supabase
      .from('service_requests')
      .insert([
        {
          selected_service: selectedService,
          selected_service_label: serviceInfo.label,
          selected_service_type: serviceInfo.type,
          selected_service_price: serviceInfo.price,
          email,
          domain: domain || null,
          social_media: socialMedia || null,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Database error (service_requests):', error);
    } else {
      dataSaved = true;
    }

    if (!emailSent && !dataSaved) {
      return res.status(500).json({
        error: 'Failed to process service request',
        details: 'Both email delivery and database save failed.',
      });
    }

    return res.status(200).json({
      message: 'Service request submitted successfully!',
      requestId: `req_${Date.now()}`,
      emailSent,
      dataSaved,
    });
  } catch (error) {
    console.error('Error processing service request:', error);
    return res.status(500).json({
      error: 'Failed to process service request',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

module.exports = router;
