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

  useEffect(() => {
    const storedAuth = localStorage.getItem(MY_AUTH_APP);
    if (storedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async function (email, password) {
    try {
      const response = await authenticate(email, password);

      if (response.error) {
        throw new Error('An error occurred. Please try again later.');
      } else {
        const { access_token } = response;
        localStorage.setItem(MY_AUTH_APP, 'true');
        setIsAuthenticated(true);
        setAuthToken(access_token);

        console.log(
          'Authentication saved in localStorage:',
          localStorage.getItem(MY_AUTH_APP)
        );
      }
    } catch (error) {
      throw new Error('Email or password is incorrect.');
    }
  }, []);

  const logout = useCallback(function () {
    localStorage.removeItem(MY_AUTH_APP);
    setIsAuthenticated(false);
    setAuthToken(null);

    console.log(
      'Authentication removed from localStorage:',
      localStorage.getItem(MY_AUTH_APP)
    );
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
    }),
    [login, logout, isAuthenticated, authToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
