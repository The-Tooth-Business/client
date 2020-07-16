import api from '../config/api';

export async function loginUser(userData) {
	const response = await api.post('/auth/login', userData);
	console.log('User data received: ', response);
	return response.data;
}

export async function logoutUser() {
	return api.get('/auth/logout');
}

export async function registerUser(userInfo) {
	const response = await api.post('/auth/register', userInfo);
	console.log('Got new user back from server', response);
	return response.data;
}

// Get loggedInUser from localStorage
export function getLoggedInUser() {
	return localStorage.getItem('loggedInUser');
}

// Store loggedInUser username in local storage
export function setLoggedInUser(user) {
	console.log('setting user: ', user);
	user
		? localStorage.setItem('loggedInUser', user)
		: localStorage.removeItem('loggedInUser');
}
