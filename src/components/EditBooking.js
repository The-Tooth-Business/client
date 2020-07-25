import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import { updateBooking } from '../services/bookingsServices';
import Form from './Form';

const EditBooking = ({ history, match }) => {
	const { dispatch, store } = useGlobalState();
	const { bookings } = store;
	const [errorMessage, setErrorMessage] = useState(null);
	const bookingId = match.params.id;

	const booking = bookings.find((booking) => booking._id === bookingId);

	function handleSubmit(updatedBooking) {
		updateBooking(updatedBooking)
			.then((response) => {
				dispatch({
					type: 'updateBooking',
					data: response,
				});
				if (response.error) {
					throw new Error(response.error);
				}
				history.push(`/bookings/${response._id}`);
			})
			.catch((error) => {
				if (error) setErrorMessage('Missing fields please try again');
				else
					setErrorMessage(
						'There may be a problem with the server. Please try again after a few moments.'
					);
			});
	}

	return (
		<Form
			buttonLabel="Edit Booking"
			handleSubmit={handleSubmit}
			errorMessage={errorMessage}
			booking={booking}
		/>
	);
};
export default withRouter(EditBooking);
