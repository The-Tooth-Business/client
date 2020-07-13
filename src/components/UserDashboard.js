import React from 'react';
import Bookings from './Bookings';
import Balance from './Balance';
// import { useGlobalState } from '../config/globalState';

const UserDashboard = () => {
	// const { store } = useGlobalState();
	// const { loggedInUser } = store;

	return (
		<div>
			<Balance />
			<Bookings />
		</div>
	);
};

export default UserDashboard;
