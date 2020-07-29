import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../config/globalState';
import { updateBooking } from '../services/bookingsServices';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function PendingBookings() {
	const [pending, setPending] = useState([]);
	const useStyles = makeStyles((theme) => ({
		root: {
			flexShrink: 0,
			marginLeft: theme.spacing(2.5),
		},
		paper: {
			padding: theme.spacing(2),
			height: '100%',
			width: '100%',
			textAlign: 'center',
		},
		title: {
			color: pending.length > 0 ? 'red' : 'green',
			fontSize: 40,
		},
		disc: {
			fontSize: '10px',
			fontStyle: 'italic',
		},
	}));
	const classes = useStyles();
	const { store, dispatch } = useGlobalState();
	const { bookings } = store;

	useEffect(() => {
		let date = new Date();
		let day = date.getUTCDate();
		let pendingBookings = [];
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
				dispatch({
					type: 'updateBooking',
					data: updatedBooking,
				});
				if (response.error) {
					throw new Error(response.error);
				}
			});
		});
	}

	return (
		<Paper data-cy="pending" className={classes.paper}>
			<h1 data-cy="pending-number" className={classes.title}>
				{pending.length}
			</h1>
			<p>bookings are waiting to be closed</p>
			<Button
				data-cy="pending-button"
				onClick={handleClose}
				disabled={pending.length === 0}
			>
				Close all pending Bookings
			</Button>
		</Paper>
	);
}
