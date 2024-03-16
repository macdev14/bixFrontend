import React, { createContext, useState, useEffect, useContext } from 'react';
import IUser, { ILogin, Props } from '../../../types';
import usePost from '../../api/usePost';
import { useApi } from '../../hooks/useApi';
import _ from 'lodash';

interface AuthContextData {
  signed?: boolean;
  user: object | null;
  SignIn(user: object): Promise<void>;
  Logout(): void;
  isAuthenticated():  Promise<boolean>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: Props) => {
  const [user, setUser] = useState<object | null>(null);
  const { signin } = useApi();

  useEffect(() => {
    
    setUser({username:''})
  }, []); // Empty dependency array to run only once on mount

  async function isAuthenticated (){
    const storage = await localStorage.getItem('@App:user')
    if (storage){
      const parsedStorage = JSON.parse(storage)
      return !_.isEmpty(parsedStorage)
    }
    else{
    return false;
    }
    
  }
  
  async function SignIn({ username, password }: ILogin) {
    try {
      const data = await signin(username, password);
      if (data) {
        setUser(data.user);
        localStorage.setItem('@App:user', JSON.stringify(data.user));
        localStorage.setItem('@App:token', data.access);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  function Logout() {
    try {
      // setUser(null);
      localStorage.removeItem('@App:user');
      localStorage.removeItem('@App:token');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, SignIn, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
