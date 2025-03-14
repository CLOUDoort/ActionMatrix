import { handleError } from '@/ui/HandleError';
import supabase from '@/services/supabase';

export const googleLogout = async (): Promise<void> => {
  const { error: logoutError } = await supabase.auth.signOut();

  if (logoutError) handleError(logoutError, 'Error logout: ');
};
