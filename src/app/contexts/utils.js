import { loginRequest as loginUserRequest } from '../services/user';

export function setUserLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user');
}

export const getUserLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export async function loginRequest(username, password) {
  try {
    const response = await loginUserRequest(username, password);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
