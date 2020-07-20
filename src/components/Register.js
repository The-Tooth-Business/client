import React, { useState } from 'react';
import { useGlobalState } from '../config/globalState';
import { registerUser, setLoggedInUser } from '../services/authServices';
import UserForm from './UserForm';

const Register = ({ history }) => {
	const { dispatch } = useGlobalState();

	const [errorMessage, setErrorMessage] = useState(null);

	function handleSubmit(userDetails) {
		registerUser(userDetails)
			.then((response) => {
				setLoggedInUser(response.username);
				dispatch({
					type: 'setLoggedInUser',
					data: response.username,
				});
				dispatch({
					type: 'setAdminUser',
					data: response.admin,
				});
				history.push('/dashboard');
			})
			.catch((error) => {
				setErrorMessage('Please try again');
				console.log('Error registering user', error);
			});
	}

	return (
		<UserForm
			handleSubmit={handleSubmit}
			errorMessage={errorMessage}
			label={'Register'}
		/>
	);
};

export default Register;
