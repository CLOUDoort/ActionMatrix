import supabase from '@/services/supabase';

export const googleLogin = async (): Promise<void> => {
  const redirectTo = import.meta.env.VITE_REDIRECT_URL;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo,
    },
  });

  if (error) throw new Error(`Google Login Error: ${error.message}`);
};
