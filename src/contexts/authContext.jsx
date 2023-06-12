import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { authenticate } from '../api/auth'; // Llamamos a la API de autenticación

const MY_AUTH_APP = 'MY_AUTH_APP_1';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem(MY_AUTH_APP) ?? false
  );

  // Definimos la función de inicio de sesión
  const login = useCallback(async function (email, password) {
    try {
      const response = await authenticate(email, password);

      if (response.error) {
        throw new Error('An error occurred. Please try again later.');
      } else {
        window.localStorage.setItem(MY_AUTH_APP, true);
        setIsAuthenticated(true);

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
    window.localStorage.removeItem(MY_AUTH_APP);
    setIsAuthenticated(false);

    console.log(
      'Authentication removed from localStorage:',
      localStorage.getItem(MY_AUTH_APP)
    );
  }, []);

  // Creamos el valor del contexto utilizando useMemo para evitar renderizaciones innecesarias
  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
    }),
    [login, logout, isAuthenticated]
  );

  // Renderizamos el proveedor del contexto con el valor y los hijos proporcionados
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Especificamos las propiedades esperadas para el componente AuthContextProvider
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

// Definimos un hook personalizado para acceder al contexto de autenticación
export function useAuthContext() {
  return useContext(AuthContext);
}
