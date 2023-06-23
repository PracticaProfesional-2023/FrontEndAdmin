import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { authenticate } from '../api/auth';

const MY_AUTH_APP = 'MY_AUTH_APP_1';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem(MY_AUTH_APP);
    const storedUser = localStorage.getItem('user');
    if (storedAuth && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async function (email, password) {
    try {
      const response = await authenticate(email, password);

      if (response.error) {
        throw new Error('An error occurred. Please try again later.');
      } else {
        const { access_token, user } = response;
        localStorage.setItem(MY_AUTH_APP, 'true');
        setIsAuthenticated(true);
        setAuthToken(access_token);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user)); // Guardar información del usuario en el localStorage
      }
    } catch (error) {
      throw new Error('Email or password is incorrect.');
    }
  }, []);

  const logout = useCallback(function () {
    localStorage.removeItem(MY_AUTH_APP);
    setIsAuthenticated(false);
    setAuthToken(null);
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('token', authToken);
    } else {
      localStorage.removeItem('token');
    }
  }, [authToken]);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      authToken,
      user,
    }),
    [login, logout, isAuthenticated, authToken, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
