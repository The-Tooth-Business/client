export function getTeeth(bookings) {
	let balance = 0;
	bookings.map((booking) => (balance += parseInt(booking.teeth)));
	return balance;
}

export function getFairyDollars() {
	return Math.floor(Math.random() * Math.floor(100));
}
