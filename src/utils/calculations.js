export function getTeeth(bookings) {
	let balance = 0;
	let date = new Date();
	let day = date.getUTCDate();
	bookings.map((booking) =>
		new Date(booking.create_date).getUTCDate() === day
			? (balance += parseInt(booking.teeth))
			: null
	);
	return balance;
}

export function getFairyDollars() {
	return Math.floor(Math.random() * Math.floor(100));
}

export function getWishes() {
	return Math.floor(Math.random() * Math.floor(10000));
}
