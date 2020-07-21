import api from '../config/api';

export async function getBookings() {
	const response = await api.get('/bookings');
	return response.data;
}

export async function getBookingsByContinent(continent) {
	const response = await api.get(`/bookings/continent?continent=${continent}`);
	return response.data;
}

export async function addBooking(newBooking) {
	const response = await api.post('/bookings', newBooking);
	console.log('received new booking from server: ', response.data);
	return response.data;
}

export async function deleteBooking(id) {
	const response = await api.delete(`/bookings/${id}`);
	return response.data;
}

export async function updateBooking(booking) {
	const response = await api.patch(`/bookings/${booking._id}`, booking);
	console.log('received updated booking from server: ', response.data);
	return response.data;
}
