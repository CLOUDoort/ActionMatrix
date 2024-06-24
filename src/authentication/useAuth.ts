import { getUserProfile } from './getUserProfile';
import { useAuthContext } from './AuthContext';
import { useEffect } from 'react';

export const useAuth = async (version: string) => {
  const { demoAuth, loginAuth } = useAuthContext();

  useEffect(() => {
    const fetch = async () => {
      try {
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
