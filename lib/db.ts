import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://vmcajmpqqdfotvovpzac.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtY2FqbXBxcWRmb3R2b3ZwemFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTczMzksImV4cCI6MjAzMTg3MzMzOX0.pjn34CFItP-VklSfS3aO69d6Thv-A3Lg-xlwH8pjmYs'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }