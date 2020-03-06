import { render, renderBookDetail } from './renderer.js'

const main = document.querySelector('main');
const cors = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
const detailEndpoint = 'https://zoeken.oba.nl/api/v1/details/?id=';
const key = 'ffbc1ededa6f23371bc40df1864843be';
const secret = '3374c8bacbdd81eef70e7bb33d451efd';
const detailDefault = 'Default';
const detailMinimum = 'Minimum';
const lang = 'nl';

const config = {
  Authorization: `Bearer ${secret}`
};

function buildUrl(query) {
  const url = `${cors}${endpoint}${query}&authorization=${key}&lang=${lang}&detaillevel=${detailDefault}&output=json&p=jeugd&refine=true`;
  return url;
}

function BuildDetailUrl(id) {
  const url = `${cors}${detailEndpoint}${id}&authorization=${key}&lang=${lang}&detaillevel=${detailDefault}&output=json&p=jeugd`;
  return url
}

//api call
export function GetData(query) {
  fetch(buildUrl(query), config)
    .then(response => {
      //handle client error with fetch
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(data => {
      render(data);
    })
    .catch(err => {
      console.log(err);
    });
}

export function GetDetailData(id) {
  fetch(BuildDetailUrl(id), config)
    .then(response => {
      //handle client error with fetch
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(data => {
      console.log(data);
      renderBookDetail(data, id);
    })
    .catch(err => {
      console.log(err);
    });
}