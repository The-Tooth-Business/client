import axios from 'axios';

export default axios.create({
	baseURL: 'https://localhost:3030',
	timeout: 5000,
});
