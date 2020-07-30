import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import Bookings from './Bookings';
import Continent from './Continent';
import { Grid, Paper } from '@material-ui/core';
import Card from './Card';
import PendingBookings from './PendingBookings';
import {
	getTeeth,
	getFairyDollars,
	getWishes,
	totalTeeth,
} from '../utils/calculations';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';
import MakeAWish from './MakeAWish';
import IncomingWish from './IncomingWish';

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
	paper: {
		padding: theme.spacing(5),
		textAlign: 'left',
		color: 'white',
		width: '100%',
		background: 'linear-gradient(45deg, rgba(41,223,189,1) 62%, rgba(101,255,213,1) 96%)',
	},
	ul: {
		textDecoration: 'none',
	},
	root: {
		flexGrow: 1,
	},
}));

function UserDashboard() {
	const { store } = useGlobalState();
	const { adminUser, bookings, reviews } = store;
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
	}, [bookings, reviews]);

	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<div className={classes.content}>
				<Grid container spacing={3}>
					{!adminUser && (
						<Grid item xs={12} lg={6}>
							<MakeAWish />
						</Grid>
					)}
					{!adminUser && bookings.length > 0 && (
						<Grid item xs={12} md={6}>
							<Card
								number={totalTeeth(bookings)}
								text={'Total teeth collected'}
								background={
									'linear-gradient(94deg, rgba(81,27,119,1) 50%, rgba(41,20,115,1) 100%)'
								}
							/>
						</Grid>
					)}
					{!adminUser && bookings.length === 0 && (
						<Grid item xs={12} md={6}>
							<Card
								number={'Hmm..'}
								text={`Looks like you don't have any bookings yet`}
								background={
									'linear-gradient(180deg, rgba(255,205,241,1) 50%, rgba(235,173,237,1) 100%)'
								}
							/>
						</Grid>
					)}
					{adminUser && (
						<Grid item xs={12} lg={6}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<div>
										<MapChart setTooltipContent={setContent} bookings={bookings} />
										<ReactTooltip>{content}</ReactTooltip>
									</div>
								</Grid>
								<Grid item xs={12}>
									<PendingBookings />
								</Grid>
								<Grid item xs={12}>
									<IncomingWish />
								</Grid>
							</Grid>
						</Grid>
					)}
					<Grid item xs={12} md={12} lg={6}>
						<Grid container spacing={3}>
							{adminUser && (
								<Grid item xs={12} md={6}>
									<Card
										number={`F$ ${dollars}`}
										text={'Current Fairy dollar per A$'}
										background={
											'linear-gradient(180deg, rgba(255,205,241,1) 50%, rgba(235,173,237,1) 100%)'
										}
									/>
								</Grid>
							)}
							{adminUser && (
								<Grid item xs={12} md={6}>
									<Card
										number={getTeeth(bookings)}
										text={'Tooth exchanges tonight'}
										background={
											'linear-gradient(94deg, rgba(81,27,119,1) 50%, rgba(41,20,115,1) 100%)'
										}
									/>
								</Grid>
							)}
							{adminUser && (
								<Grid item xs={12} md={6}>
									<Card
										number={wishes}
										text={'Wishes made in last minute'}
										background={
											'linear-gradient(45deg, rgba(41,223,189,1) 62%, rgba(101,255,213,1) 96%)'
										}
									/>
								</Grid>
							)}

							<Grid item xs={12} md={6}>
								{adminUser && (
									<Card
										number={reviews.length > 0 ? `${reviews[0].rating}/10` : '0%'}
										text={`latest review: ${
											reviews.length > 0 ? reviews[0].comments : 'no comment'
										}`}
										background={
											'linear-gradient(0deg, rgb(255, 192, 0) 30%, rgb(255, 161, 0) 96%)'
										}
									/>
								)}
							</Grid>
							<Grid item xs={12}>
								{adminUser && <Continent />}
							</Grid>
						</Grid>
					</Grid>
					{/* render for both admin and parent */}
					<Grid item xs={12}>
					
						{ !adminUser && bookings.length === 0 && (
							<Paper className={classes.paper}>
							<fragment>
							<h1 className={classes.title}>Welcome! </h1>		
								
									<h3>This seems to be your first visit to Tooth Inc. If you are here to book a tooth pick up for your little darling this is the right place. 
									<ul>
									<li>Click on the 'Make a booking' button on the side there. Yes, that one...but not yet!</li>
									<li>WHEN you get there, fill in the form. Don't forget anything - we aren't psychic (well we are but make it easy for us)...</li>
									<li>Click submit. If the little whirly button goes green, that is it. We will send a fairy tonight- at no cost to you. They will take the tooth and leave the money.</li>
									<li>Go back to your dashboard and make a wish. Go on, you deserve it. You have done some good parenting today.</li>
									<li>If you need to make any changes, come back and edit your booking any time before 9pm.</li>
									</ul>
									</h3>
									</fragment>	
									</Paper>
							)}
							
								{ bookings.length >= 1 && (
									<Bookings bookings={bookings} />
								)}
						
					</Grid>
				</Grid>
			</div>
		</main>
	);
}

export default UserDashboard;
