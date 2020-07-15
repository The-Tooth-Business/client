import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
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
	const { store } = useGlobalState();
	const { adminUser } = store;
	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			{adminUser && <Balance />}
			<Bookings />
		</main>
	);
}

export default UserDashboard;
