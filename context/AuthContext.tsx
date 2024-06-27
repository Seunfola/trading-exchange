import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Initialize isAuthenticated based on the presence of a token in localStorage
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false; // Default to false if localStorage is not available
  });

  const login = () => {
    setIsAuthenticated(true);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', 'dummy-token'); // Replace with actual token handling
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
