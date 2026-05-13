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
