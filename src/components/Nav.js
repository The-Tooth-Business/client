import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';

const Nav = () => {
	const { dispatch, store } = useGlobalState();
	const { loggedInUser } = store;
	const divStyles = {
		display: 'flex',
		flexDirection: 'column',
	};

	const linkStyles = {
		fontSize: '1.2em',
		textDecoration: 'none',
		margin: '.5em',
		color: 'black',
	};

	const logoutUser = () => {
		dispatch({
			type: 'setLoggedInUser',
			data: null,
		});
	};

	return (
		<div styles={divStyles}>
			{loggedInUser ? (
				<div>
					<h1>Welcome to Tooth Inc.</h1>
					<Link style={linkStyles} to="/dashboard">
						{loggedInUser}
					</Link>
					<Link style={linkStyles} to="/auth/login" data-cy='login' onClick={logoutUser}>
						Logout
					</Link>
					<Link style={linkStyles} to="/booking/new">
						Add a booking
					</Link>
					<Link style={linkStyles} to="/bookings">
						Bookings
					</Link>
				</div>
			) : (
				<div>
					<Link style={linkStyles} to="/auth/login">
						Login
					</Link>
					<Link style={linkStyles} to="/auth/register">
						Register
					</Link>
				</div>
			)}
		</div>
	);
};

export default Nav;
