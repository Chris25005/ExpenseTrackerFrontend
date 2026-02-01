import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage, but parse user safely
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem('token');
    return t && t !== 'null' ? t : null;
  });
  const [loading, setLoading] = useState(false);

  // Keep localStorage in sync with state
  useEffect(() => {
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  // Login: set user and token
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  // Logout: clear state and storage
  const logout = () => {
    setUser(null);
    setToken(null);
    // localStorage will be cleared by useEffect
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
