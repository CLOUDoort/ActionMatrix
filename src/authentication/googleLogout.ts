import supabase from '@/services/supabase';

export const googleLogout = async (): Promise<void> => {
  const { error: logoutError } = await supabase.auth.signOut();

  if (logoutError) throw new Error(`Error logout: ${logoutError.message}`);
};
