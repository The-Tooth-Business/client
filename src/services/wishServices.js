import api from '../config/api';

export async function getWishes() {
	const response = await api.get('/wish');
	return response.data;
}

export async function addWish(makeWish) {
	const response = await api.post('/wish', makeWish);
	console.log('received new wish from server: ', response.data);
	return response.data;
}

export async function deleteWish(id) {
	const response = await api.delete(`/wish/${id}`);
	return response.data;
}

export async function updateWish(wish) {
	const response = await api.patch(`/bookings/${wish._id}`, wish);
	console.log('received updated wish from server: ', response.data);
	return response.data;
}