import { createClient } from '@supabase/supabase-js';
import { Database } from '@/supabase/supabase.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Key is missing. Check your .env file.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export { supabase };
