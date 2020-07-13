import React from 'react';
import Bookings from './Bookings';
import Balance from './Balance';

const UserDashboard = () => {
	return (
		<div>
			<Balance />
			<Bookings />
		</div>
	);
};

export default UserDashboard;
