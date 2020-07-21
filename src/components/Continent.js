import React from 'react';
import { Line } from 'react-chartjs-2';

const Continent = () => {
	const data = {
		labels: [
			'Oceania',
			'Asia',
			'Europe',
			'Africa',
			'North America',
			'South America',
			'Antarctica',
		],
		datasets: [
			{
				label: 'Bookings by Continent',
				fill: false,
				lineTension: 0.1,
				backgroundColor: '#ed0f51',
				borderColor: '#ed0f51',
				borderCapStyle: 'round',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#ed0f51',
				pointBackgroundColor: '#ffffff',
				pointBorderWidth: 2,
				pointHoverRadius: 10,
				pointHoverBackgroundColor: '#ed0f51',
				pointHoverBorderColor: '#ed0f51',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		],
	};

	return (
		<div>
			<Line data={data} />
		</div>
	);
};

export default Continent;
