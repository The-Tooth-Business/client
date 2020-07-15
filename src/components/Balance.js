import React from 'react';
import { useGlobalState } from '../config/globalState';

export default function Balance() {
	const { store } = useGlobalState();
	const { bookings } = store;

	const getBalance = () => {
		let balance = 0;
		bookings.map((booking) => (balance += parseInt(booking.teeth)));
		return balance;
	};

	return (
		<div>
			<h3>Current outgoing: ${getBalance()}</h3>
		</div>
	);
}
