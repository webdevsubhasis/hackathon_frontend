import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('recruitiq_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('recruitiq_token');
    if (!token) {
      setLoading(false);
      return;
    }
    authAPI
      .me()
      .then((res) => setUser(res.data.data.user))
      .catch(() => {
        localStorage.removeItem('recruitiq_token');
        localStorage.removeItem('recruitiq_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { token, user: u } = res.data.data;
    localStorage.setItem('recruitiq_token', token);
    localStorage.setItem('recruitiq_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const register = async (payload) => {
    const res = await authAPI.register(payload);
    const { token, user: u } = res.data.data;
    localStorage.setItem('recruitiq_token', token);
    localStorage.setItem('recruitiq_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('recruitiq_token');
    localStorage.removeItem('recruitiq_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
