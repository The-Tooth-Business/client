import React, { memo } from 'react';
import {
	ZoomableGroup,
	ComposableMap,
	Geographies,
	Geography,
} from 'react-simple-maps';

const geoUrl =
	'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({ setTooltipContent, bookings }) => {
	let countryBookings = {};

	bookings.forEach((booking) => {
		countryBookings[booking.country]
			? countryBookings[booking.country]++
			: (countryBookings[booking.country] = 1);
	});

	console.log(countryBookings);

	return (
		<>
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
		</>
	);
};

export default memo(MapChart);
