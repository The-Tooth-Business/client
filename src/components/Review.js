import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { updateBooking } from '../services/bookingsServices';
import { useGlobalState } from '../config/globalState';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 300,
	},
}));

const Review = ({ history, booking }) => {
	const { dispatch, store } = useGlobalState();
	const { bookings } = store;
	const classes = useStyles();

	console.log('to review: ', booking);

	const [slider, setSlider] = useState(0);
	const [comment, setComment] = useState('');

	function handleSliderChange(event, newValue) {
		setSlider(newValue);
	}
	function handleCommentChange(event) {
		event.preventDefault();
		setComment(event.target.value);
	}

	function handleReviewSubmit(event) {
		event.preventDefault();
		const updatedBooking = {
			_id: booking._id,
			child_name: booking.child_name,
			teeth: booking.teeth,
			address: booking.address,
			city: booking.city,
			postcode: booking.postcode,
			country: booking.country,
			continent: booking.continent,
			currency: booking.currency,
			open_status: false,
			rating: slider,
			comments: comment,
			review_status: true,
		};
		updateBooking(updatedBooking)
			.then((response) => {
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
			})
			.catch((error) => {
				console.log('error', error);
			});
	}

	return (
		<div>
			<h2>We value your feedback</h2>
			<div className={classes.root}>
				<Typography id="review-slider" gutterBottom>
					Please rate your fairy from 1 - 10
				</Typography>
				<Slider
					value={slider}
					aria-labelledby="review-slider"
					step={1}
					marks
					min={1}
					max={10}
					name="rating"
					valueLabelDisplay="auto"
					onChange={handleSliderChange}
				/>
				<TextField
					name="comments"
					label="additional feedback"
					onChange={handleCommentChange}
				/>
			</div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleReviewSubmit}
				className={classes.button}
			>
				Submit
			</Button>
		</div>
	);
};

export default withRouter(Review);
