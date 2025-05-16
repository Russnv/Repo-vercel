// context/AuthContext.tsx
"use client";

import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from "react";

interface User {
  login: string;
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
    credential: {
      id: number;
      password: string
    },
    orders: {
        id: number;
        status: string;
        date: string;
      }[];
    },
    token: string;
  };


interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  logged: boolean;
  getUser:()=>User;
}


const UserContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLogged, setUserLogged] = useState<boolean>(false);

  
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUserLogged(true);
  };

  const getUser=()=>{
    const user:User = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(user);
    return user;
  }

  const logout = () => {
    setUser(null);
    setUserLogged(false);
    localStorage.removeItem('user');
  };

  const logged: boolean = userLogged;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserLogged(true);
    }
    getUser();
    
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, logged, getUser}}>
      {children}
    </UserContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
