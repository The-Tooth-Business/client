import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../config/globalState';
import { updateBooking } from '../services/bookingsServices';

export default function PendingBookings() {
	const { store, dispatch } = useGlobalState();
	const { bookings } = store;

	const [pending, setPending] = useState([]);

	let date = new Date();
	let day = date.getUTCDate();
	let pendingBookings = [];

	useEffect(() => {
		bookings.map((booking) =>
			booking.open_status && new Date(booking.modified_date).getUTCDate() < day
				? pendingBookings.push(booking)
				: null
		);
		setPending(pendingBookings);
	}, [bookings]);

	function handleClose() {
		pending.forEach((booking) => {
			const updatedBooking = booking;
			updatedBooking.open_status = false;

			updateBooking(updatedBooking).then((response) => {
				const otherBookings = bookings.filter(
					(booking) => booking._id !== updatedBooking._id
				);
				dispatch({
					type: 'setBookings',
					data: [updatedBooking, ...otherBookings],
				});
				console.log('updated bookings');
				if (response.error) {
					throw new Error(response.error);
				}
			});
		});
	}

	console.log('current pending bookings: ', pending);

	return (
		<div>
			<h3> Pending Bookings: {pending.length}</h3>
			<button onClick={handleClose}>Close all pending Bookings</button>
		</div>
	);
}
