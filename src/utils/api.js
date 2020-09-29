import axios from 'axios';

const api = axios.create({
  baseURL: 'https://loft-taxi.glitch.me',
  responseType: 'json',
});

export const postLogin = (payload) => api.post('/auth', payload);

export const postRegister = (payload) => api.post('/register', payload);

export const postCard = (payload) => api.post('/card', payload);

export const getCard = (payload) => api.get(`/card?token=${payload.token}`);

export const getAddressesData = () => api.get(`/addressList`);
