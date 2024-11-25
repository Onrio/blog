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
    });

    if (authError) {
      console.error('Error during Supabase auth sign-up:', authError.message);
      throw new Error('Failed to register user: ' + authError.message);
    }

    const userId = authData.user?.id;

    console.log('Auth UID:', authData.user?.id);

    console.log('Auth UID (user ID):', userId);

    if (!userId) {
      throw new Error('Failed to retrieve user ID after registration.');
    }

    console.log('Preparing to insert user profile for ID:', userId);

    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,
        full_name: name,
        georgian_name: georgianName,
        mobile: mobile || null,
        twitter: twitter || null,
        facebook: facebook || null,
        linkedin: linkedin || null,
        github: github || null,
        about: about || null,
      },
    ]);

    if (profileError) {
      console.error('Error inserting user profile:', profileError.message);

      console.log('Rolling back: Deleting partially registered user.');
      const { error: adminError } =
        await supabase.auth.admin.deleteUser(userId);
      if (adminError) {
        console.error(
          'Failed to delete partially registered user:',
          adminError.message
        );
      }

      throw new Error(
        'Failed to create user profile. Registration rolled back.'
      );
    }

    console.log('User successfully registered and profile created:', authData);
    return authData;
  } catch (error: any) {
    console.error('Registration failed:', error.message);
    throw new Error('Registration failed. Please try again later.');
  }
}
