import axios from 'axios';

export default axios.create({
  baseURL: 'https://loft-taxi.glitch.me',
  responseType: 'json',
});
