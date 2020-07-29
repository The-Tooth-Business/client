import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import { Doughnut } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		// height: '100%',
	},
	title: {
		color: 'gray',
	},
}));

const Continent = () => {
	const { store } = useGlobalState();
	const { bookings } = store;
	const classes = useStyles();

	let continents = {};

	bookings.forEach((booking) => {
		continents[booking.continent]
			? continents[booking.continent]++
			: (continents[booking.continent] = 1);
	});

	const data = {
		labels: Object.keys(continents),
		datasets: [
			{
				label: 'Bookings by Continent',
				fill: true,
				backgroundColor: [
					'#ff3675',
					'#ffc000',
					'#1bbef4',
					'#f2744b',
					'#c84bf2',
					'#30d6af',
				],
				data: Object.values(continents),
			},
		],
	};

	return (
		<Paper data-cy="continents" className={classes.paper}>
			<h1 className={classes.title}>Bookings by continent</h1>
			<Doughnut data={data} />
		</Paper>
	);
};

export default Continent;
