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
			<div>
				<Link style={linkStyles} to="/auth/login">
					Login
				</Link>
				<Link style={linkStyles} to="/auth/register">
					Register
				</Link>
			</div>
		</div>
	);
};

export default Nav;
