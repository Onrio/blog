import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error registering user:', error.message);
    }

    console.log('User registered successfully:', user);
    return user;
  } catch (error) {
    console.error(
      'Failed to fetch. Check your network and Supabase configuration:',
      error
    );
    throw new Error('Failed to register user.');
  }
}
