import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('access'));
  const [user, setUser] = useState(() =>
    token ? jwtDecode(token) : null
  );

  const loginContext = (newToken) => {
    localStorage.setItem('access', newToken);
    setToken(newToken);
    setUser(jwtDecode(newToken));
  };

  const logoutContext = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh')
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
