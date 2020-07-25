import React, { useState, useEffect } from 'react';
import { getFairyByContinent } from '../services/fairyServices';
import { getBookingsByContinent } from '../services/bookingsServices';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import avatar from '../images/avatar.jpg';
import Bookings from './Bookings';
import { getAverageRating } from '../utils/calculations';

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	avatar: {
		width: '300px',
		height: '300px',
		backgroundImage: `url(${avatar})`,
		backgroundRepeat: 'no-repeat',
		opacity: 0.9,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
}));

const FairyProfile = ({ continent }) => {
	const classes = useStyles();
	const initialState = {
		continent: 'continent',
		fairy_name: 'name',
		description: 'description',
	};
	const [fairyBookings, setFairyBookings] = useState([]);
	const [fairyData, setFairyData] = useState(initialState);
	const [fairyRating, setFairyRating] = useState(0);

	useEffect(() => {
		getBookingsByContinent(continent).then((bookings) => {
			setFairyBookings(bookings);
			setFairyRating(getAverageRating(bookings));
		});
		getFairyByContinent(continent)
			.then((fairy) => {
				setFairyData(fairy);
			})
			.catch((error) => {
				console.log('An error occurred setting fairy data: ', error);
			});
	}, [continent]);

	return (
		<div>
			<div className={classes.toolbar} />
			<main className={classes.content}>
				<div className={classes.avatar}> </div>
				<p>{fairyData.description}</p>
				<p>Average rating: {fairyRating || '0'}/10</p>
				<Card
					number={fairyData.fairy_name}
					text={`The ${fairyData.continent} Fairy`}
					background={
						'linear-gradient(45deg, rgba(41,223,189,1) 62%, rgba(101,255,213,1) 96%)'
					}
				/>

				<Bookings bookings={fairyBookings} />
			</main>
		</div>
	);
};

export default FairyProfile;
