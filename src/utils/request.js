import { BASE_URL } from './constants';

const handleResponse = async response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const request = (endpoint, options = {}) => {
  const requestOptions = {
    ...options,
    headers: {
      ...options.headers
    }
  };

  return fetch(`${BASE_URL}${endpoint}`, requestOptions)
    .then(handleResponse)
    .catch(error => {
      console.error(error);
    });
};

export default request;
