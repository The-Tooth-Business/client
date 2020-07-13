import React from 'react';
import Bookings from './Bookings';
import Balance from './Balance';
import { useGlobalState } from '../config/globalState';
import Continent from './Continent';
import continentData from '../data/continents';

const UserDashboard = () => {
	const { store } = useGlobalState();
	const { adminUser, bookings } = store;

	return (
		<div>
			{adminUser && (
				<div>
					<Balance />
					{continentData.map((continent) => (
						<Continent key={continent} name={continent} />
					))}
				</div>
			)}
			<Bookings />
			{bookings.length === 0 && (
				<p>
					Looks like you haven't made any bookings yet. Click on add a booking
					to get started
				</p>
			)}
		</div>
	);
};

export default UserDashboard;
