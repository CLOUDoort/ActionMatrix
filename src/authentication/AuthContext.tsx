import type { Auth, AuthAction, AuthValue, User } from 'Auth';
import { ReactNode, useContext, useReducer } from 'react';

import { createContext } from 'react';

const AuthContext = createContext<AuthValue | null>(null);

const initialState: Auth = {
  version: '',
  user: {
    name: '',
    avatarUrl: '',
  },
};

const reducer = (state: Auth, action: AuthAction): Auth => {
  switch (action.type) {
    case 'auth/demo': {
      return {
        ...state,
        version: 'demo',
        user: {
          name: 'demo',
          avatarUrl: '',
        },
      };
    }
    case 'auth/login': {
      if (!action.payload) throw new Error('User information is required');
      const { name, avatarUrl } = action.payload;
      return {
        ...state,
        version: 'login',
        user: {
          name,
          avatarUrl,
        },
      };
    }
    default:
      throw new Error('Unknown Action type');
  }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);

  const demoAuth = () => {
    dispatch({
      type: 'auth/demo',
    });
  };

  const loginAuth = (user: User) => {
    dispatch({
      type: 'auth/login',
      payload: user,
    });
  };

  return <AuthContext.Provider value={{ auth, demoAuth, loginAuth }}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) throw new Error('Auth Context was used outside the AuthProvider');

  return context;
};

export { AuthContextProvider, useAuthContext };
