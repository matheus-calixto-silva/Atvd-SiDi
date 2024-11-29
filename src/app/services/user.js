import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios';

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data;

    const user = users.find(
      (user) =>
        (user.email === username || user.cpf === username) &&
        user.senha === password
    );

    if (user) {
      console.log(user);
      return user;
    }
    return null;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return null;
  }
};

export async function registerUser(newUser) {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error('Usuário já registrado');
    } else {
      console.error('Erro ao registrar usuário:', error);
    }
    return null;
  }
}

export async function registerPoint(userId, newRegistro) {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    const user = response.data;

    const updatedRegistros = [...user.registrosPontos, newRegistro];
    await axios.patch(`${API_URL}/${userId}`, {
      registrosPontos: updatedRegistros,
    });

    const updatedUser = { ...user, registrosPontos: updatedRegistros };

    localStorage.setItem('user', JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Erro ao registrar ponto:', error);
    return { success: false, error: error.message };
  }
}

export async function editPoint(userId, registroId, updatedRegistro) {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    const user = response.data;

    // Atualizando o registro de ponto no array
    const updatedRegistros = user.registrosPontos.map((registro) =>
      registro.id === registroId
        ? { ...registro, ...updatedRegistro }
        : registro
    );

    await axios.patch(`${API_URL}/${userId}`, {
      registrosPontos: updatedRegistros,
    });

    const updatedUser = { ...user, registrosPontos: updatedRegistros };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Erro ao editar ponto:', error);
    return { success: false, error: error.message };
  }
}

// Excluir um registro de ponto
export async function deletePoint(userId, registroId) {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    const user = response.data;

    // Filtrando o registro de ponto a ser removido
    const updatedRegistros = user.registrosPontos.filter(
      (registro) => registro.id !== registroId
    );

    await axios.patch(`${API_URL}/${userId}`, {
      registrosPontos: updatedRegistros,
    });

    const updatedUser = { ...user, registrosPontos: updatedRegistros };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Erro ao excluir ponto:', error);
    return { success: false, error: error.message };
  }
}

export function getUserLocalStorage() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function setUserLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user');
}
