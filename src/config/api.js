import axios from 'axios';
let baseUrl;
console.log('environment: ', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
	baseUrl = process.env.REACT_APP_PRODUCTION_URL;
}
if (process.env.NODE_ENV === 'staging') {
	baseUrl = process.env.REACT_APP_STAGING_URL;
}
if (process.env.NODE_ENV === 'development') {
	baseUrl = process.env.REACT_APP_LOCAL_URL;
}

export default axios.create({
	baseURL: baseUrl,
	timeout: 5000,
});
