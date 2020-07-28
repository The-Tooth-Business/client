import React, { useState } from 'react';
import {
	loginUser,
	setLoggedInUser,
	getAdminUser,
	setAdminUser,
	getLoggedInUser,
} from '../services/authServices';
import { useGlobalState } from '../config/globalState';
import UserForm from './UserForm';

const Login = ({ history }) => {
	const { dispatch } = useGlobalState();

	const [errorMessage, setErrorMessage] = useState(null);

	function handleSubmit(userDetails) {
		loginUser(userDetails)
			.then((response) => {
				setLoggedInUser(response.username);
				setAdminUser(response.admin);
				dispatch({
					type: 'setLoggedInUser',
					data: getLoggedInUser(),
				});
				dispatch({
					type: 'setAdminUser',
					data: getAdminUser(),
				});
				history.push('/dashboard');
			})
			.catch((error) => {
				setLoggedInUser(null);
				if (error.response && error.response.status === 401)
					setErrorMessage(
						'Authentication failed. Please check your username and password.'
					);
				else
					setErrorMessage(
						'There may be a problem with the server. Please try again after a few moments.'
					);
			});
	}

	return (
		<UserForm
			handleSubmit={handleSubmit}
			errorMessage={errorMessage}
			label={'Login'}
		/>
	);
};

export default Login;
