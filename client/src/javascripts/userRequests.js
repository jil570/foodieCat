/* globals fetch */

import { api } from '../api';


async function updateFile(address, category1, category2) {
  //handle fetch and update long lat.
  var new_address = address.replace(/ /g,"+");
  var longitude = "x"
  var latitude = "y";

  fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+new_address+'&key=AIzaSyCJ-caPZti4P_6h8kreh-Yd14218QQ9yP0')
    .then((response) => {
      return response.json();
    })
    .then(data => {
      return fetch(`${api.url}/profile`,
      {
        method: 'POST',
        body: JSON.stringify({
          address,
          category1,
          category2,
          longitude:data.results[0].geometry.location['lng'].toString(),
          latitude:data.results[0].geometry.location['lat'].toString(),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Accept: 'application/json; charset=UTF-8',
        },
        credentials: 'include',
        mode: 'cors',
      });
    })

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
