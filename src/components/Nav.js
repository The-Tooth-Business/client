import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import { logoutUser } from '../services/authServices';

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

	function handleLogout() {
		logoutUser()
			.then((response) => {
				console.log('Got back response on logout', response.status);
			})
			.catch((error) => {
				console.log(
					'The server may be down - caught an exception on logout:',
					error
				);
			});
		dispatch({
			type: 'setLoggedInUser',
			data: null,
		});
	}

	return (
		<div data-cy="navbar" styles={divStyles}>
			{loggedInUser ? (
				<div>
					<h1>Welcome to Tooth Inc.</h1>
					<Link style={linkStyles} to="/dashboard">
						{loggedInUser}
					</Link>
					<Link
						data-cy="logout"
						style={linkStyles}
						to="/auth/login"
						onClick={handleLogout}
					>
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
					<Link style={linkStyles} to="/auth/login" data-cy="login">
						Login
					</Link>
					<Link style={linkStyles} to="/auth/register" data-cy="register">
						Register
					</Link>
				</div>
			)}
		</div>
	);
};

export default Nav;
