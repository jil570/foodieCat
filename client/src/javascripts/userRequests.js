/* globals fetch */

import { api } from '../api';

async function updateFile(address, category1, category2) {
  // eslint-disable-next-line no-undef

  return fetch(`${api.url}/profile`,
    {
      method: 'POST',
      body: JSON.stringify({
        address,
        category1,
        category2,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      mode: 'cors',
    });
}

async function getUser() {
  return fetch(`${api.url}/getUser`,
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

async function getOtherUser(username) {
  return fetch(`${api.url}/getOtherUser/${username}`,
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

async function getSuggestedUsers() {
  return fetch(`${api.url}/getSuggestedUsers`,
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
  getUser,
  getOtherUser,
  getSuggestedUsers,
  updateFile,
};
