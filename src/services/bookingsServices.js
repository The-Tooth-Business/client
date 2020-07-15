import api from '../config/api';

export async function getBookings(username, admin) {
	console.log('making get req', username, admin);
	if (username === 'FIC' || admin) {
		const response = await api.get(`/bookings?admin=true`);
		return response.data;
	} else {
		const response = await api.get(`/bookings?username=${username}`);
		return response.data;
	}
}

export async function addBooking(newBooking) {
	const response = await api.post('/bookings', newBooking);
	console.log('received new booking from server: ', response.data);
	return response.data;
}
