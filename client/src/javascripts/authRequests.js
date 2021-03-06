/* globals fetch FormData */

import { api } from '../api';

async function register(firstName, lastName, email, password, username, image = null, street, city, state, category1, category2, longitude, latitude, status) {
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('username', username);
  formData.append('image', image);
  formData.append('street', street);
  formData.append('city', city);
  formData.append('state', state);
  formData.append('category1', category1);
  formData.append('category2', category2);
  formData.append('longitude', longitude);
  formData.append('latitude', latitude);
  formData.append('status', status);

  return fetch(`${api.url}/register`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
      mode: 'cors',
    });
}

async function login(email, password) {
  return fetch(`${api.url}/login`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      mode: 'cors',
    });
}

async function logout() {
  return fetch(`${api.url}/logout`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      mode: 'cors',
    });
}

async function checkAuth() {
  return fetch(`${api.url}/checkAuth`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      mode: 'cors',
    });
}

export {
  register,
  login,
  logout,
  checkAuth,
};
