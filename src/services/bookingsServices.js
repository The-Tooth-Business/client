import api from '../config/api';

export async function getBookings(username, admin) {
	console.log('making get req', username, admin);
	if (username === 'FIC' && admin) {
		const response = await api.get(`/bookings?admin=true`);
		return response.data;
	} else {
		const response = await api.get(`/bookings?username=${username}`);
		return response.data;
	}
}
