import React from 'react';
import Booking from './Booking';
import { useGlobalState } from '../config/globalState';

const Bookings = () => {
	const { store } = useGlobalState();
	const { bookings } = store;
	if (!bookings) return null;

	return (
		<div>
			{bookings
				.sort((a, b) => b.modified_date - a.modified_date)
				.map((booking) => (
					<Booking key={booking._id} booking={booking} />
				))}
		</div>
	);
};

export default Bookings;
