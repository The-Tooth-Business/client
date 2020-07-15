function stateReducer(state, action) {
	switch (action.type) {
		case 'setBookings':
			return {
				...state,
				bookings: action.data,
			};

		case 'addBooking':
			return {
				...state,
				bookings: [action.data, ...state.bookings],
				//setBookings([...bookings, booking]);
			};
		case 'updateBooking':
			const otherBooking = state.bookings.filter(
				(booking) => booking._id !== action.data._id
			);
			return {
				...state,
				bookings: [...otherBooking, action.data],
			};
		case 'deleteBooking':
			const otherBookings = state.bookings.filter(
				(booking) => booking._id !== parseInt(action.data)
			);
			return {
				...state,
				bookings: otherBookings,
			};

		case 'getBookingFromId':
			const booking = state.bookings.find(
				(booking) => booking._id === parseInt(action.data)
			);
			return {
				...state,
				bookings: booking,
			};
		case 'setLoggedInUser':
			return {
				...state,
				loggedInUser: action.data,
			};
		case 'setAdminUser':
			return {
				...state,
				adminUser: action.data,
			};

		default:
			return state;
	}
}

export default stateReducer;
