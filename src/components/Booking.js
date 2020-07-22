import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { deleteBooking } from '../services/bookingsServices';
import { updateBooking } from '../services/bookingsServices';
import Review from './Review';

const Booking = ({ history, booking, showControls }) => {
	const { dispatch, store } = useGlobalState();
	const { bookings, adminUser } = store;
	if (!booking) return null;

	const linkStyles = {
		textDecoration: 'none',
		color: 'black',
	};
	const divstyles = {
		position: 'absolute',
		left: '40%',
		top: '30%',
	};

	function handleDelete(event) {
		event.preventDefault();
		deleteBooking(booking._id)
			.then(() => {
				const updatedBookings = bookings.filter(
					(order) => order._id !== booking._id
				);
				dispatch({
					type: 'setBookings',
					data: updatedBookings,
				});
				history.push('/dashboard');
			})
			.catch((error) => {
				console.log('Failed to delete booking', error);
			});
	}

	function handleEdit(event) {
		event.preventDefault();
		history.push(`/booking/edit/${booking._id}`);
	}

	function handleClose() {
		// event.preventDefault();
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
			if (response.error) {
				throw new Error(response.error);
			}
			history.push('/dashboard');
		});
	}

	const {
		modified_date,
		child_name,
		teeth,
		address,
		city,
		postcode,
		country,
		continent,
		currency,
	} = booking;
	return (
		<div style={divstyles}>
			{!booking.open_status && <Review booking={booking} />}
			<Link
				data-cy="child-name"
				style={linkStyles}
				to={`/bookings/${booking._id}`}
			>
				<h1>{child_name}</h1>
			</Link>
			<p>{modified_date}</p>
			<p>{teeth}</p>
			<p>{address}</p>
			<p>{city}</p>
			<p>{postcode}</p>
			<p>{country}</p>
			<p>{continent}</p>
			<p>{currency}</p>

			{showControls && (
				<ButtonGroup
					size="large"
					color="primary"
					aria-label="large outlined primary button group"
				>
					{adminUser && booking.open_status && (
						<Button onClick={handleClose}>Close</Button>
					)}
					{booking.open_status && <Button onClick={handleEdit}>Edit</Button>}
					<Button onClick={handleDelete}>Delete</Button>
				</ButtonGroup>
			)}
		</div>
	);
};

export default Booking;
