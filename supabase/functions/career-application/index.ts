import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ApplicationData {
  fullName: string
  email: string
  phone: string
  workMode: string
  message?: string
  position?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    })
  }

  try {
    const formData = await req.formData()
    
    // Extract form fields
    const applicationData: ApplicationData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      workMode: formData.get('workMode') as string,
      message: formData.get('message') as string || '',
      position: formData.get('position') as string || 'General Application'
    }

    // Extract files
    const cvFile = formData.get('cv') as File
    const coverLetterFile = formData.get('coverLetter') as File | null

    // Validate required fields
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone || !applicationData.workMode) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!cvFile) {
      return new Response(
        JSON.stringify({ error: 'CV file is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate file types and sizes
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(cvFile.type) || cvFile.size > maxSize) {
      return new Response(
        JSON.stringify({ error: 'Invalid CV file type or size' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (coverLetterFile && (!allowedTypes.includes(coverLetterFile.type) || coverLetterFile.size > maxSize)) {
      return new Response(
        JSON.stringify({ error: 'Invalid cover letter file type or size' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Convert files to base64 for email attachment
    const cvBuffer = await cvFile.arrayBuffer()
    const cvBase64 = btoa(String.fromCharCode(...new Uint8Array(cvBuffer)))

    let coverLetterBase64 = null
    if (coverLetterFile) {
      const coverLetterBuffer = await coverLetterFile.arrayBuffer()
      coverLetterBase64 = btoa(String.fromCharCode(...new Uint8Array(coverLetterBuffer)))
    }

    // Prepare email content
    const emailSubject = `New Job Application from ${applicationData.fullName} - ${applicationData.position}`
    const emailBody = `
New job application received:

Name: ${applicationData.fullName}
Email: ${applicationData.email}
Phone: ${applicationData.phone}
Position: ${applicationData.position}
Mode of Working: ${applicationData.workMode}

Message:
${applicationData.message || 'No additional message provided'}

---
This application was submitted through the WebHub careers page.
    `.trim()

    // Prepare attachments
    const attachments = [
      {
        filename: cvFile.name,
        content: cvBase64,
        encoding: 'base64',
        contentType: cvFile.type
      }
    ]

    if (coverLetterFile && coverLetterBase64) {
      attachments.push({
        filename: coverLetterFile.name,
        content: coverLetterBase64,
        encoding: 'base64',
        contentType: coverLetterFile.type
      })
    }

    // Send email using a third-party service (example with EmailJS-like structure)
    // In production, you would use a proper email service like SendGrid, Mailgun, etc.
    const emailPayload = {
      to: 'some12thing@gmail.com',
      from: 'careers@webhub.com',
      subject: emailSubject,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
      attachments: attachments
    }

    // For demonstration, we'll log the email data
    // In production, replace this with actual email sending logic
    console.log('Email would be sent with:', {
      ...emailPayload,
      attachments: attachments.map(att => ({
        filename: att.filename,
        size: att.content.length,
        type: att.contentType
      }))
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({ 
        message: 'Application submitted successfully!',
        applicationId: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing application:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process application',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})