import axios from 'axios';

const api = axios.create({
    baseURL: 'https://65a7b4e694c2c5762da75a31.mockapi.io/',
    headers: {'Content-Type': 'application/json'},
});

export default api;