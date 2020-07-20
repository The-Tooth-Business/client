import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { addBooking } from '../services/bookingsServices';
import { useGlobalState } from '../config/globalState';
import Form from './Form';

const NewBooking = ({ history, nextId }) => {
	const { dispatch } = useGlobalState();

	//state
	const initialFormState = {
		child_name: '',
		surname: '',
		teeth: '',
		address: '',
		city: '',
		postcode: '',
		country: '',
		continent: '',
		currency: '',
	};
	// const [formState, setFormState] = useState(initialFormState);
	const [errorMessage, setErrorMessage] = useState(null);

	// const newBooking = {};
	function handleSubmit(newBooking) {
		addBooking(newBooking)
			.then((response) => {
				dispatch({
					type: 'addBooking',
					data: response,
				});
				if (response.error) {
					throw new Error(response.error);
				}
				history.push('/dashboard');
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
