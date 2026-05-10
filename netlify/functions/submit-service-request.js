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
    const { selectedService, email, domain, socialMedia, message } = JSON.parse(event.body || '{}');

    if (!selectedService || !email || !message) {
      return json(400, { error: 'Missing required fields: selectedService, email, message' });
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
          console.error('Email error (service request):', error);
        }
      }

      if (lastError) {
        throw lastError;
      }

      return false;
    };

    const emailSubject = `New Service Request: ${selectedService}`;
    const emailBody = `
New service request received:

Selected Service: ${selectedService}
Customer Email: ${email}
Domain: ${domain || 'Not provided'}
Social Media: ${socialMedia || 'Not provided'}

Message:
${message}

---
This request was submitted through the WebHub services page.
    `.trim();

    let emailSent = false;
    let dataSaved = false;

    try {
      await sendWithFallback({
        from: `"WebHub Services" <${emailUser}>`,
        to: emailUser,
        subject: emailSubject,
        text: emailBody,
        html: emailBody.replace(/\n/g, '<br>'),
      });
      emailSent = true;
    } catch (mailError) {
      console.error('Email error (service request):', mailError);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase
      .from('service_requests')
      .insert([
        {
          selected_service: selectedService,
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
      return json(500, {
        error: 'Failed to process service request',
        details: 'Both email delivery and database save failed.',
      });
    }

    return json(200, {
      message: 'Service request submitted successfully!',
      requestId: `req_${Date.now()}`,
      emailSent,
      dataSaved,
    });
  } catch (error) {
    console.error('Error processing service request:', error);
    return json(500, {
      error: 'Failed to process service request',
      details: error.message,
    });
  }
};
