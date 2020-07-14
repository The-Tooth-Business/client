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
			.then(() => {
				dispatch({
					type: 'setLoggedInUser',
					data: userDetails.username,
				});
				dispatch({
					type: 'setAdminUser',
					data: userDetails.username,
				});
				history.push('/dashboard');
			})
			.catch((error) => {
				if (error.response && error.response.status === 401)
					console.log(
						'Authentication failed. Please check your username and password.'
					);
			});
	}
	return (
		<form data-cy="loginForm" onSubmit={handleSubmit}>
			<div>
				<label>Username</label>
				<input
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
					required
					type="password"
					name="password"
					placeholder="Enter a password"
					onChange={handleChange}
				></input>
			</div>
			<input type="submit" value="Login"></input>
		</form>
	);
};

export default Login;
