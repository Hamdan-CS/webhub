const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://dbltqzhultejrelbdhyt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRibHRxemh1bHRlanJlbGJkaHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMDg1MTMsImV4cCI6MjA5MTc4NDUxM30.IT6SHZKRdHL8x0iD8q6XsPd3GFYWPBgLmoJIaUQoN28';

async function testConnection() {
  console.log('🧪 Testing Supabase connection...');
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Test connection by trying to select from applications table
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      
      if (error.message.includes('relation "applications" does not exist')) {
        console.log('📋 The "applications" table does not exist yet.');
        console.log('🛠️  You need to create the table in Supabase with the following SQL:');
        console.log(`
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  mode_of_working VARCHAR(50) NOT NULL,
  message TEXT,
  cv_filename VARCHAR(255) NOT NULL,
  cover_letter_filename VARCHAR(255),
  position VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
        `);
      }
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Current applications count:', data.length);
    }
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testConnection();