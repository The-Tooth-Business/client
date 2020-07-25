import api from '../config/api';

export async function getContinents() {
	const response = await api.get('/continent');
	return response.data;
}

export async function getFairyByContinent(continent) {
	const response = await api.get(`/continent/continent?continent=${continent}`);
	return response.data;
}
