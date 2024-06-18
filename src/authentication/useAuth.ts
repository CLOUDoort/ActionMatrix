import { useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { getUserProfile } from './getUserProfile';

export const useAuth = async () => {
  const version = localStorage.getItem('version')!;
  const { demoAuth, loginAuth } = useAuthContext();

  useEffect(() => {
    const fetch = async () => {
      if (version === 'demo') demoAuth();
      else {
        const user = await getUserProfile();
        loginAuth(user);
      }
    };
    fetch();
  }, []);
};
