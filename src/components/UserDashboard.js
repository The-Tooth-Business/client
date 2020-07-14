import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Bookings from './Bookings';
import Balance from './Balance';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function UserDashboard() {
	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Balance />
			<Bookings />
		</main>
	);
}

export default UserDashboard;
