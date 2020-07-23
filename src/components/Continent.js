import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import { Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
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
				lineTension: 0.5,
				backgroundColor: '#30d6af',
				borderColor: '#30d6af',
				borderCapStyle: 'round',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#ed0f51',
				pointBackgroundColor: '#ed0f51',
				pointBorderWidth: 2,
				pointHoverRadius: 10,
				pointHoverBackgroundColor: '#ed0f51',
				pointHoverBorderColor: '#ed0f51',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: Object.values(continents),
			},
		],
	};

	return (
		<Paper className={classes.paper}>
			<Line data-cy="continents" data={data} />
		</Paper>
	);
};

export default Continent;
