-- Create applications table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  mode_of_working VARCHAR(50) NOT NULL,
  message TEXT,
  cv_filename VARCHAR(255) NOT NULL,
  cover_letter_filename VARCHAR(255),
  position VARCHAR(255) DEFAULT 'General Application',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add some indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_position ON applications(position);

-- Add Row Level Security (optional but recommended)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting new applications
CREATE POLICY "Allow insert applications" ON applications
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows reading applications (for admin use)
CREATE POLICY "Allow read applications" ON applications
  FOR SELECT USING (true);