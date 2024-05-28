import axios from 'axios';

const api = axios.create({
	baseURL: 'https://controle-ponto-api.onrender.com',
});

export { api };
