import api from '../config/api';

export async function loginUser(userData) {
	const response = await api.post('/auth/login', userData);
	console.log('User data received: ', response);
	return response.data;
}

export async function logoutUser() {
	return api.get('/auth/logout');
}
