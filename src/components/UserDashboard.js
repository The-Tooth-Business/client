import React from 'react';
import Bookings from './Bookings';
import Balance from './Balance';
// import { useGlobalState } from '../config/globalState';

const UserDashboard = ({ adminUser }) => {
	// const { store } = useGlobalState();
	// const { loggedInUser } = store;

	return (
		<div>
			{adminUser && <Balance />}
			<Bookings />
		</div>
	);
};

export default UserDashboard;
