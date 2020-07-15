import React, { useState } from 'react';
import { loginUser } from '../services/authServices';
import { useGlobalState } from '../config/globalState';

const Login = ({ history }) => {
	const { dispatch } = useGlobalState();
	const initialFormState = {
		username: '',
		password: '',
	};
	const [userDetails, setUserDetails] = useState(initialFormState);
	const [errorMessage, setErrorMessage] = useState(null);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log('submit');
		loginUser(userDetails)
			.then((response) => {
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
		<form data-cy="login-form" onSubmit={handleSubmit}>
			{errorMessage && <p>{errorMessage}</p>}
			<div>
				<label>Username</label>
				<input
					data-cy="username"
					required
					type="text"
					name="username"
					placeholder="Enter a username"
					onChange={handleChange}
				></input>
			</div>
			<div>
				<label>Password</label>
				<input
					data-cy="password"
					required
					type="password"
					name="password"
					placeholder="Enter a password"
					onChange={handleChange}
				></input>
			</div>
			<input data-cy="login-button" type="submit" value="Login"></input>
		</form>
	);
};

export default Login;
