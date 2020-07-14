import React, { useState } from 'react';
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
		loginUser();
		history.push('/dashboard');
	}
	// Login user
	function loginUser() {
		dispatch({
			type: 'setLoggedInUser',
			data: userDetails.username,
		});
		dispatch({
			type: 'setAdminUser',
			data: userDetails.username,
		});
	}
	return (
		<form data-cy='login-form' onSubmit={handleSubmit}>
			<div>
				<label>Username</label>
				<input data-cy='username'
					required
					type="text"
					name="username"
					placeholder="Enter a username"
					onChange={handleChange}
				></input>
			</div>
			<div>
				<label>Password</label>
				<input data-cy='password'
					required
					type="password"
					name="password"
					placeholder="Enter a password"
					onChange={handleChange}
				></input>
			</div>
			<input data-cy='login-button' type="submit" value="Login"></input>
		</form>
	);
};

export default Login;
