import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
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

	return (
		<div data-cy="navbar" styles={divStyles}>
			<div>
				<Link data-cy="login" style={linkStyles} to="/auth/login">
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
