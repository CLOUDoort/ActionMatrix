declare module 'Auth' {
  export interface User {
    name: string;
    avatarUrl: string;
  }

  export interface Auth {
    version: string;
    user: User;
  }

  export interface AuthAction {
    type: string;
    payload?: User;
  }

  export interface AuthValue {
    auth: Auth;
    demoAuth: () => void;
    loginAuth: (user: User) => void;
  }
}
