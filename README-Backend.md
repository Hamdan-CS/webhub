# WebHub Career Application Backend

This backend handles career application submissions and sends emails with file attachments to `some12thing@gmail.com`.

## Features

- ✅ Accepts form data with file uploads (CV and Cover Letter)
- ✅ Validates file types (PDF, DOC, DOCX only)
- ✅ Validates file sizes (max 5MB each)
- ✅ Sends formatted emails with attachments
- ✅ CORS enabled for frontend integration
- ✅ Error handling and validation
- ✅ Spam protection (honeypot field support)

## Setup Instructions

### Option 1: Using Supabase Edge Functions (Recommended)

The Supabase Edge Function is already configured and will work automatically with your deployed frontend.

### Option 2: Local Node.js Server

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure email settings:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your Gmail credentials:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Get Gmail App Password:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Enable 2-Factor Authentication
   - Go to Security > App passwords
   - Generate a new app password for "Mail"
   - Use that password in `EMAIL_PASS`

5. **Start the server:**
   ```bash
   npm run dev
   ```

6. **Update frontend API endpoint:**
   In `src/components/ApplicationModal.tsx`, change the fetch URL to:
   ```typescript
   const response = await fetch('http://localhost:3001/api/career-application', {
     method: 'POST',
     body: submitFormData
   });
   ```

## API Endpoints

### POST `/api/career-application`

Accepts multipart/form-data with the following fields:

**Required Fields:**
- `fullName` (string)
- `email` (string)
- `phone` (string)
- `workMode` (string: 'remote', 'onsite', 'hybrid')
- `cv` (file: PDF, DOC, DOCX, max 5MB)

**Optional Fields:**
- `position` (string)
- `message` (string)
- `coverLetter` (file: PDF, DOC, DOCX, max 5MB)

**Response:**
```json
{
  "message": "Application submitted successfully!",
  "applicationId": "app_1234567890_abc123"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Email Template

The system sends emails to `some12thing@gmail.com` with the following format:

**Subject:** `New Job Application from [Name] - [Position]`

**Body:**
```
New job application received:

Name: John Doe
Email: john@example.com
Phone: +1 (555) 123-4567
Position: Junior Web Designer
Mode of Working: Remote

Message:
I'm excited to apply for this position...

---
This application was submitted through the WebHub careers page.
```

**Attachments:**
- CV file (required)
- Cover Letter file (optional)

## Security Features

- File type validation (only PDF, DOC, DOCX)
- File size limits (5MB max per file)
- CORS protection
- Input validation and sanitization
- Error handling without exposing sensitive information

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (validation errors)
- `500` - Server error

Common error responses:
```json
{ "error": "Missing required fields" }
{ "error": "CV file is required" }
{ "error": "Invalid file type. Only PDF, DOC, and DOCX files are allowed." }
{ "error": "File size too large. Maximum size is 5MB." }
```

## Testing

You can test the API using curl:

```bash
curl -X POST http://localhost:3001/api/career-application \
  -F "fullName=John Doe" \
  -F "email=john@example.com" \
  -F "phone=+1234567890" \
  -F "workMode=remote" \
  -F "position=Test Position" \
  -F "message=Test message" \
  -F "cv=@/path/to/cv.pdf"
```

## Production Deployment

For production deployment:

1. Set environment variables on your hosting platform
2. Use a proper email service (SendGrid, Mailgun, etc.) instead of Gmail
3. Add rate limiting and additional security measures
4. Set up proper logging and monitoring
5. Use HTTPS only

## Troubleshooting

**Email not sending:**
- Check Gmail credentials and app password
- Ensure 2FA is enabled on Gmail account
- Verify firewall/network settings

**File upload issues:**
- Check file size (max 5MB)
- Verify file type (PDF, DOC, DOCX only)
- Ensure proper form encoding (multipart/form-data)

**CORS errors:**
- Verify frontend URL is allowed in CORS settings
- Check that requests include proper headers