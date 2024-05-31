import supabase from '@/services/supabase';
import { toast } from 'react-toastify';

export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: 'http://localhost:5174/app/todo',
    },
  });

  if (data) {
    toast.success('Login successful!');
    console.log('Login', data);
  }
  if (error) console.error(error.message);
};
