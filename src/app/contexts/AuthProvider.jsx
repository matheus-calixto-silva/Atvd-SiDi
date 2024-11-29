import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useNavigation from '../libs/navigate';
import {
  getUserLocalStorage,
  loginRequest,
  removeUserLocalStorage,
  setUserLocalStorage,
} from './utils';

import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigation();

  useEffect(() => {
    const userLocalStorage = getUserLocalStorage();
    if (userLocalStorage) {
      setUser(userLocalStorage);
      navigate('/inicio');
    } else {
      navigate('/');
    }
  }, []);

  const handleLogin = async (username, password) => {
    const loggedInUser = await loginRequest(username, password);

    if (loggedInUser) {
      setUser(loggedInUser);
      setUserLocalStorage(loggedInUser); // Salva o usuário no localStorage
      navigate('/inicio'); // Redireciona para uma rota protegida
      return true;
    } else {
      return false;
    }
  };

  function handleLogout() {
    setUser(null);
    removeUserLocalStorage();
    navigate('/login');
  }

  const addRegistroPonto = (registro) => {
    if (user) {
      const updatedUser = {
        ...user,
        registrosPontos: [...(user.registrosPontos || []), registro],
      };
      setUser(updatedUser);
      setUserLocalStorage(updatedUser); // Atualiza também no localStorage
    }
  };

  const editRegistroPonto = (id, registroAtualizado) => {
    if (user) {
      const updatedRegistrosPontos = (user.registrosPontos || []).map(
        (registro) =>
          registro.id === id ? { ...registro, ...registroAtualizado } : registro
      );

      const updatedUser = { ...user, registrosPontos: updatedRegistrosPontos };
      setUser(updatedUser);
      setUserLocalStorage(updatedUser); // Atualiza também no localStorage
    }
  };

  const deleteRegistroPonto = (id) => {
    if (user) {
      const updatedRegistrosPontos = (user.registrosPontos || []).filter(
        (registro) => registro.id !== id
      );

      const updatedUser = { ...user, registrosPontos: updatedRegistrosPontos };
      setUser(updatedUser);
      setUserLocalStorage(updatedUser); // Atualiza também no localStorage
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
      addRegistroPonto,
      editRegistroPonto,
      deleteRegistroPonto,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
