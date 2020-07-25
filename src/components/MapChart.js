import React, { memo } from 'react';
import {
	ZoomableGroup,
	ComposableMap,
	Geographies,
	Geography,
} from 'react-simple-maps';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
	},
	title: {
		color: 'gray',
	},
}));

const geoUrl =
	'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({ setTooltipContent, bookings }) => {
	let countryBookings = {};

	bookings.forEach((booking) => {
		countryBookings[booking.country]
			? countryBookings[booking.country]++
			: (countryBookings[booking.country] = 1);
	});

	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
				<ZoomableGroup>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={() => {
										const { NAME } = geo.properties;
										setTooltipContent(
											`${NAME} — ${countryBookings[NAME] || 0}`
										);
									}}
									onMouseLeave={() => {
										setTooltipContent('');
									}}
									style={{
										default: {
											fill: '#D6D6DA',
											outline: 'none',
										},
										hover: {
											fill: '#ff3675',
											outline: 'none',
										},
										pressed: {
											fill: '#E42',
											outline: 'none',
										},
									}}
								/>
							))
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
		</Paper>
	);
};

export default memo(MapChart);
