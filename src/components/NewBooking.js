import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { addBooking } from '../services/bookingsServices';
import { useGlobalState } from '../config/globalState';
// import CircularIntegration from './CircularIntegration';
import Form from './Form';

const NewBooking = ({ history }) => {
	const { dispatch } = useGlobalState();
	const [errorMessage, setErrorMessage] = useState(null);

	function handleSubmit(booking) {
		addBooking(booking)
			.then((response) => {
				dispatch({
					type: 'addBooking',
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
			buttonLabel="Create Booking"
			handleSubmit={handleSubmit}
			errorMessage={errorMessage}
		/>
	);
};

export default withRouter(NewBooking);
