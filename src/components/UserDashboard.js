import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import Bookings from './Bookings';
import Continent from './Continent';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import PendingBookings from './PendingBookings';
import { getTeeth, getFairyDollars, getWishes } from '../utils/calculations';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';

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
}));

function UserDashboard() {
	const { store } = useGlobalState();
	const { adminUser, bookings } = store;
	const [wishes, setWishes] = useState(getWishes());
	const [dollars, setDollars] = useState(getFairyDollars());
	const [content, setContent] = useState('');

	useEffect(() => {
		const wishesInterval = setInterval(() => setWishes(getWishes()), 60000);
		const dollarsInterval = setInterval(
			() => setDollars(getFairyDollars()),
			30000
		);
		return () => {
			clearInterval(wishesInterval);
			clearInterval(dollarsInterval);
		};
	}, []);

	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<div className={classes.content}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={3}>
						{adminUser && <PendingBookings />}
					</Grid>

					<Grid item xs={12} md={6} lg={3}>
						{adminUser && (
							<Card
								number={`F$ ${dollars}`}
								text={'Current Fairy dollar per A$'}
								background={
									'linear-gradient(180deg, rgba(255,205,241,1) 50%, rgba(235,173,237,1) 100%)'
								}
							/>
						)}
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{adminUser && (
							<Card
								number={getTeeth(bookings)}
								text={'Tooth exchanges today'}
								background={
									'linear-gradient(94deg, rgba(81,27,119,1) 50%, rgba(41,20,115,1) 100%)'
								}
							/>
						)}
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{adminUser && (
							<Card
								number={wishes}
								text={'Wishes made in last minute'}
								background={
									'radial-gradient(circle, rgba(41,223,189,1) 62%, rgba(101,255,213,1) 96%)'
								}
							/>
						)}
					</Grid>
					<Grid item xs={12} lg={6}>
						{adminUser && <Continent />}
					</Grid>
					<Grid item xs={12} lg={6}>
						{adminUser && (
							<div>
								<MapChart setTooltipContent={setContent} bookings={bookings} />
								<ReactTooltip>{content}</ReactTooltip>
							</div>
						)}
					</Grid>

					<Grid item xs={12}>
						<Bookings bookings={bookings} />
					</Grid>
				</Grid>
			</div>
		</main>
	);
}

export default UserDashboard;
