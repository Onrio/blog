import { supabase } from '@/supabase';

export async function registerUser({
  email,
  password,
  name,
  georgianName,
  mobile,
  twitter,
  facebook,
  linkedin,
  github,
  about,
}: {
  email: string;
  password: string;
  name: string;
  georgianName: string;
  mobile: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  about?: string;
}) {
  if (!email || !password || !name || !georgianName) {
    throw new Error('Required fields are missing.');
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: name,
          georgian_name: georgianName,
          mobile,
          twitter,
          facebook,
          linkedin,
          github,
          about,
        },
      },
    });

    if (authError) {
      console.error('Error during Supabase auth sign-up:', authError.message);
      throw new Error('Failed to register user: ' + authError.message);
    }

    console.log('User successfully registered and profile created:', authData);
    console.log(authData);
    return authData;
  } catch (error: any) {
    console.error('Registration failed:', error.message);
    throw new Error('Registration failed. Please try again later.');
  }
}
