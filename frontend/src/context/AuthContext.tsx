import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gender?: 'male' | 'female';
  avatar?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  gender?: 'male' | 'female';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('vikram_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const defaultUsers = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@vikramuniv.ac.in',
        role: 'admin' as UserRole,
        avatar: '/images/admin-avatar.jpg',
        password: 'password'
      }
    ];

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('vikram_registered_users') || '[]');
    const allUsers = [...defaultUsers, ...registeredUsers];

    const foundUser = allUsers.find((u: any) => u.email === email);
    
    if (foundUser && foundUser.password === password) {
      // Create user object without password for context state
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('vikram_user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('vikram_registered_users') || '[]');
      const userExists = existingUsers.some((u: any) => u.email === data.email);
      
      if (userExists) {
        setLoading(false);
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.role,
        gender: data.gender,
      };
      
      // Save user but also store their password for mock login
      // We will store the full user object including password in the array
      const userWithPassword = { ...newUser, password: data.password };
      existingUsers.push(userWithPassword);
      localStorage.setItem('vikram_registered_users', JSON.stringify(existingUsers));
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vikram_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 