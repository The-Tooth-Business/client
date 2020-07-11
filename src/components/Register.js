import React, { useState } from 'react';

const Register = ({ history, registerUser }) => {
	const initialFormState = {
		username: '',
		email: '',
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
		registerUser(userDetails);
		history.push('/');
	}
	return (
		<form onSubmit={handleSubmit}>
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
				<label>Email</label>
				<input
					required
					type="email"
					name="email"
					placeholder="Enter an email"
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
			<input type="submit" value="Register"></input>
		</form>
	);
};

export default Register;
