import React from 'react';
import { Link } from 'react-router-dom';

const Booking = ({ history, booking, showControls, deleteBooking }) => {
	// If we don't have a booking, return null.
	if (!booking) return null;

	const linkStyles = {
		textDecoration: 'none',
		color: 'black',
	};
	const buttonStyles = {
		margin: '.5em',
		fontSize: '1em',
	};

	// console.log('showcontrols', showControls)
	function handleDelete() {
		deleteBooking(booking._id);
		history.push('/');
	}

	function handleEdit(event) {
		event.preventDefault();
		history.push(`/booking/edit/${booking._id}`);
	}

	const {
		modified_date,
		name,
		surname,
		teeth,
		address,
		city,
		postcode,
		country,
		continent,
		currency,
	} = booking;
	return (
		<div>
			<Link style={linkStyles} to={`/bookings/${booking._id}`}>
				<h1>{name}</h1>
			</Link>
			<p>{modified_date.toLocaleString()}</p>
			<p>{surname}</p>
			<p>{teeth}</p>
			<p>{address}</p>
			<p>{city}</p>
			<p>{postcode}</p>
			<p>{country}</p>
			<p>{continent}</p>
			<p>{currency}</p>
			{showControls && (
				<div>
					<button style={buttonStyles} onClick={handleEdit}>
						Edit
					</button>
					<button style={buttonStyles} onClick={handleDelete}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default Booking;
