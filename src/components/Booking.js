import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { deleteBooking } from '../services/bookingsServices';
import { updateBooking } from '../services/bookingsServices';
import Review from './Review';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		width: '100%',
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(5),
		textAlign: 'left',
		width: '100%',
	},
}));

const Booking = ({ history, booking, showControls }) => {
	const classes = useStyles();
	const { dispatch, store } = useGlobalState();
	const { bookings, adminUser } = store;

	if (!booking) return null;
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
		open_status,
		review_status,
	} = booking;

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<div className={classes.content}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<h3>
								Thank you for booking your tooth collection with Tooth Inc.
							</h3>
							{open_status && (
								<p>
									The {continent} fairy will visit {address} this evening.
									Please put the tooth under the childs pillow and remove all
									dogs, cats and fly swats.
								</p>
							)}
							{!open_status && !review_status && (
								<p>
									{child_name}'s tooth has now been collected. Please let us
									know how the {continent} fairy did.
								</p>
							)}
							{!open_status && review_status && (
								<p>Thank you for your review.</p>
							)}
						</Paper>
					</Grid>
					{!open_status && !review_status && (
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Review booking={booking} />
							</Paper>
						</Grid>
					)}
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Typography>
								<h3>{child_name}</h3>
								<p>Date: {modified_date}</p>
								<p>Number of teeth: {teeth}</p>
								<p>Address: {address}</p>
								<p>City: {city}</p>
								<p>Postcode: {postcode}</p>
								<p>Country: {country}</p>
								<p>Continent: {continent}</p>
								<p>Currency: {currency}</p>
							</Typography>

							{showControls && (
								<ButtonGroup
									size="large"
									color="primary"
									aria-label="large outlined primary button group"
								>
									{adminUser && open_status && (
										<Button onClick={handleClose}>Close</Button>
									)}
									{open_status && <Button onClick={handleEdit}>Edit</Button>}
									<Button onClick={handleDelete}>Delete</Button>
								</ButtonGroup>
							)}
						</Paper>
					</Grid>
				</Grid>
			</div>
		</main>
	);
};

export default Booking;
