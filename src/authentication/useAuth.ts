import { useEffect } from 'react';
import { useAuthContext } from './AuthContext';

export const useAuth = (data: any) => {
  const { demoAuth, loginAuth } = useAuthContext();

  useEffect(() => {
    if (data === 'demo') demoAuth();
    else {
      loginAuth({
        name: data.username,
        avatarUrl: data.avatar_url,
      });
    }
  }, []);
};
