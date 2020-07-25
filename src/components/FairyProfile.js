import React, { useState, useEffect } from 'react';
import { getFairyByContinent } from '../services/fairyServices';
import { getBookingsByContinent } from '../services/bookingsServices';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import avatar from '../images/avatar.jpg';
import Bookings from './Bookings';
import { getAverageRating } from '../utils/calculations';
import { useGlobalState } from '../config/globalState';
import Grid from '@material-ui/core/Grid';

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
	const { store } = useGlobalState();
	const { adminUser } = store;
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
				<Grid container spacing={3}>
					<Grid item xs={12} lg={3}>
						<div className={classes.avatar}> </div>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={6}>
						<Card
							number={fairyData.fairy_name}
							text={`The ${fairyData.continent} Fairy`}
							background={
								'linear-gradient(45deg, rgba(41,223,189,1) 62%, rgba(101,255,213,1) 96%)'
							}
						/>
						<p>{fairyData.description}</p>
					</Grid>
					{adminUser && (
						<Grid item xs={12} lg={3}>
							<Card
								number={`${fairyRating || '0'}/10`}
								text={'Average rating'}
								background={fairyRating > 5 ? 'green' : 'red'}
							/>
						</Grid>
					)}

					{adminUser && (
						<Grid item xs={12}>
							<Bookings bookings={fairyBookings} />
						</Grid>
					)}
				</Grid>
			</main>
		</div>
	);
};

export default FairyProfile;
