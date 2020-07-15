import api from '../config/api';

export async function getBookings(username, admin) {
	console.log('making get req', username, admin);
	if (admin) {
		const response = await api.get(`/bookings?admin=true`);
		return response.data;
	}

	const response = await api.get(`/bookings?username=${username}`);
	return response.data;
}
