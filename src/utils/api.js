import axios from 'axios';

const api = axios.create({
  baseURL: 'https://loft-taxi.glitch.me',
  responseType: 'json',
});

export const executeAuthorization = (payload) => api.post('/auth', payload);

export const register = (payload) => api.post('/register', payload);

export const setCardData = (payload) => api.post('/card', payload);

export const getCardData = (payload) => api.get(`/card?token=${payload.token}`);

export const getAddressesData = () => api.get(`/addressList`);

export const getRouteData = (payload) =>
  api.get(
    `/route?address1=${payload.fromAddress}&address2=${payload.toAddress}`,
  );
