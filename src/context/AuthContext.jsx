import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Admin User',
    email: 'admin@neoestates.com',
    role: 'admin', // Change this to 'user' to test regular user view
    isAuthenticated: true
  });

  const login = (userData) => {
    setUser({ ...userData, isAuthenticated: true });
  };

  const logout = () => {
    setUser({
      id: null,
      name: '',
      email: '',
      role: 'user',
      isAuthenticated: false
    });
  };

  const updateUserRole = (role) => {
    setUser(prev => ({ ...prev, role }));
  };

  const value = {
    user,
    login,
    logout,
    updateUserRole,
    isAdmin: user.role === 'admin',
    isAuthenticated: user.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 