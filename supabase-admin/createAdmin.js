import { createClient } from '@supabase/supabase-js'

// 🔑 Replace these with your Supabase project URL and Service Role Key
const supabaseUrl = 'https://YOUR_PROJECT.supabase.co'
const supabaseKey = 'SERVICE_ROLE_KEY'  // Must be the SERVICE_ROLE_KEY from Supabase

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'peejaymarco@gmail.com',
    password: 'charlynpeejay7319',
    email_confirm: true
  })

  if (error) {
    console.error('Error creating admin:', error)
  } else {
    console.log('Admin created:', data)
  }
}

createAdmin()
