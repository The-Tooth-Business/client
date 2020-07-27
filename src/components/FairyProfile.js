import React, { useState, useEffect } from 'react';
import { getFairyByContinent } from '../services/fairyServices';
import { getBookingsByContinent } from '../services/bookingsServices';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import Asia from '../images/Asia.jpeg';
import NorthAmerica from '../images/NorthAmerica.jpeg';
import SouthAmerica from '../images/SouthAmerica.jpeg';
import Europe from '../images/Europe.jpeg';
import Oceania from '../images/Oceania.jpeg';
import Antarctica from '../images/Antarctica.jpeg';
import Africa from '../images/Africa.jpeg';
import Bookings from './Bookings';
import { getAverageRating, totalTeeth } from '../utils/calculations';
import { useGlobalState } from '../config/globalState';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const FairyProfile = ({ continent }) => {
	const { store } = useGlobalState();
	const { adminUser } = store;

	const initialState = {
		continent: 'continent',
		fairy_name: 'name',
		description: 'description',
	};
	const [fairyBookings, setFairyBookings] = useState([]);
	const [fairyData, setFairyData] = useState(initialState);
	const [fairyRating, setFairyRating] = useState(0);
	const [image, setImage] = useState([]);

	useEffect(() => {
		const imgs = [
			{ name: 'Asia', url: Asia },
			{ name: 'Europe', url: Europe },
			{ name: 'North America', url: NorthAmerica },
			{ name: 'South America', url: SouthAmerica },
			{ name: 'Africa', url: Africa },
			{ name: 'Antarctica', url: Antarctica },
			{ name: 'Oceania', url: Oceania },
		];
		const profile = imgs.find((img) => img.name === continent).url;
		setImage(profile);
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

	const useStyles = makeStyles((theme) => ({
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		avatar: {
			width: '100%',
			height: '700px',
			backgroundImage: `url(${image})`,
			backgroundRepeat: 'no-repeat',
			opacity: 0.9,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'left',
			height: '100%',
			width: '100%',
		},
	}));
	const classes = useStyles();

	return (
		<div>
			<div className={classes.toolbar} />
			<main className={classes.content}>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={6}>
						<Paper className={classes.paper}>
							<div className={classes.avatar} />
							{/* <img src={image} alt="profile" /> */}
							<div>
								<h1>{fairyData.fairy_name}</h1>
								<h2>The {fairyData.continent} Fairy</h2>
								<p>{fairyData.description}</p>
							</div>
						</Paper>
					</Grid>
					{adminUser && (
						<Grid item xs={12} lg={3}>
							<Card
								number={`${fairyRating || '0'}/10`}
								text={'Average rating'}
								background={
									fairyRating > 5
										? 'linear-gradient(149deg, rgba(10,172,99,1) 17%, rgba(61,255,149,1) 91%)'
										: 'linear-gradient(295deg, rgba(238,131,127,1) 17%, rgba(255,61,61,1) 91%)'
								}
							/>
						</Grid>
					)}
					<Grid item xs={12} lg={3}>
						<Card
							number={totalTeeth(fairyBookings)}
							text={'total exchanges'}
							background={'pink'}
						/>
					</Grid>

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
