const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { name, email, topic, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !topic || !message) {
      return json(400, { error: 'Missing required fields: name, email, topic, message' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!supabaseUrl || !supabaseAnonKey || !emailUser || !emailPass) {
      return json(500, { error: 'Missing server environment variables' });
    }

    const createTransporters = () => {
      const common = {
        auth: {
          user: emailUser,
          pass: (emailPass || '').replace(/\s+/g, ''),
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

    const sendWithFallback = async (mailOptions) => {
      const transporters = createTransporters();
      let lastError = null;

      for (const transporter of transporters) {
        try {
          await transporter.sendMail(mailOptions);
          return true;
        } catch (error) {
          lastError = error;
          console.error('Email error (contact):', error);
        }
      }

      if (lastError) {
        throw lastError;
      }

      return false;
    };

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
      });
      emailSent = true;
    } catch (mailError) {
      console.error('Email error (contact):', mailError);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
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
      return json(500, {
        error: 'Failed to process contact form',
        details: 'Both email delivery and database save failed.',
      });
    }

    return json(200, {
      message: 'Contact form submitted successfully!',
      submissionId: `sub_${Date.now()}`,
      emailSent,
      dataSaved,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return json(500, {
      error: 'Failed to process contact form',
      details: error.message,
    });
  }
};
