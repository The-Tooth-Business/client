import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import Bookings from './Bookings';
import Balance from './Balance';
import Continent from './Continent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
	const { adminUser } = store;
	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<div className={classes.content}>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Balance />
							</Paper>
						)}
					</Grid>
					<Grid item xs={12}>
						{adminUser && (
							<Paper className={classes.paper}>
								<Continent />
							</Paper>
						)}
					</Grid>

					<Grid item xs={6}>
						<Paper className={classes.paper}>xs=6</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							<Bookings />
						</Paper>
					</Grid>
				</Grid>
			</div>
		</main>
	);
}

export default UserDashboard;
