import React from 'react';
import Booking from './Booking';

const Bookings = ({ parentData }) => {
	return (
		<div>
			{parentData
				.sort((a, b) => b.modified_date - a.modified_date)
				.map((booking) => (
					<Booking key={booking._id} booking={booking} />
				))}
		</div>
	);
};

export default Bookings;
