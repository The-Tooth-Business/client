import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import Bookings from './Bookings';
import Continent from './Continent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import { getTeeth, getFairyDollars, getWishes } from '../utils/calculations';
const drawerWidth = '20vw';

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
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

function UserDashboard() {
	const { store } = useGlobalState();
	const { adminUser, bookings } = store;
	const [wishes, setWishes] = useState(getWishes());

	useEffect(() => {
		const interval = setInterval(() => setWishes(getWishes()), 60000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<div className={classes.content}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={3}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Card
									number={`F$ ${getFairyDollars()}`}
									text={'Current Fairy dollar per A$'}
									color={'#ffc000'}
								/>
							</Paper>
						)}
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Card
									number={`F$ ${getFairyDollars()}`}
									text={'Current Fairy dollar per A$'}
									color={'black'}
								/>
							</Paper>
						)}
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Card
									number={getTeeth(bookings)}
									text={'Tooth exchanges today'}
									color={'#ff3675'}
								/>
							</Paper>
						)}
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Card
									number={wishes}
									text={'Wishes made in last minute'}
									color={'#30d6af'}
								/>
							</Paper>
						)}
					</Grid>
					<Grid item xs={12} lg={6}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Continent />
							</Paper>
						)}
					</Grid>
					<Grid item xs={12} lg={6}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Continent />
							</Paper>
						)}
					</Grid>

					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Bookings bookings={bookings} />
						</Paper>
					</Grid>
				</Grid>
			</div>
		</main>
	);
}

export default UserDashboard;
