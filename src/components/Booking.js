import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const Booking = ({ history, booking, showControls }) => {
	const { dispatch } = useGlobalState();
	// If we don't have a booking, return null.
	if (!booking) return null;

	const linkStyles = {
		textDecoration: 'none',
		color: 'black',
	};
	// const classes = useStyles();
	// const useStyles = makeStyles((theme) => ({
	// 	root: {
	// 	  display: 'flex',
	// 	  flexDirection: 'column',
	// 	  alignItems: 'center',
	// 	  '& > *': {
	// 		margin: theme.spacing(1),
	// 	  },
	// 	},
	//   }));
	// const buttonStyles = {
	// 	margin: '.5em',
	// 	fontSize: '1em',
	// };

	function handleDelete(event) {
		event.preventDefault();
		dispatch({
			type: 'deleteBooking',
			data: booking._id,
		});
		history.push('/dashboard');
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
					<ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
						<Button onClick={handleEdit}>
							Edit</Button>
						<Button onClick={handleDelete}>
							Delete</Button>
					</ButtonGroup>
			
			)}
		</div>
	);
};

export default Booking;
