import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  updatePasswordUser,
} from '../api/usersApi';
import { AuthContext } from './authContext';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const authContext = useContext(AuthContext);
  const { authToken } = authContext;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(authToken);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    if (authToken) {
      fetchUsers();
    }
  }, [authToken]);

  const updateUserById = async (userId, userData) => {
    try {
      const response = await updateUser(userId, userData, authToken);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === userId ? response.data.user : user
        );
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };
  const updatePasswordById = async (userId, userData) => {
    try {
      await updatePasswordUser(userId, userData, authToken);
    } catch (error) {
      console.error('Error al actualizar la Contraseña:', error);
    }
  };

  const deleteUserById = async (userId) => {
    try {
      await deleteUser(userId, authToken);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const createUserInternal = async (userData) => {
    try {
      const response = await createUser(userData);
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        updateUserById,
        deleteUserById,
        createUserInternal,
        updatePasswordById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
