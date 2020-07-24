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

export function totalTeeth(bookings) {
	let teeth = 0;

	bookings.map((booking) => (teeth += booking.teeth));
	return teeth;
}

export function getFairyDollars() {
	return Math.floor(Math.random() * Math.floor(100));
}

export function getWishes() {
	return Math.floor(Math.random() * Math.floor(10000));
}
