import { useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { getUserProfile } from './getUserProfile';

export const useAuth = async () => {
  const { demoAuth, loginAuth } = useAuthContext();

  useEffect(() => {
    const fetch = async () => {
      try {
        const version = localStorage.getItem('version')!;
        if (version === 'demo') demoAuth();
        else {
          const user = await getUserProfile();
          loginAuth(user);
        }
      } catch (e: any) {
        throw new Error(e.message);
      }
    };
    fetch();
  }, []);
};
