import axios from 'axios';

console.log('environment: ', process.env.REACT_APP_API_ENDPOINT);

export default axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	timeout: 5000,
});
