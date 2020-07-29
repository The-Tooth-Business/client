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
			};
		case 'updateBooking':
			const otherBooking = state.bookings.filter(
				(booking) => booking._id !== action.data._id
			);
			return {
				...state,
				bookings: [action.data, ...otherBooking],
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
		case 'setReviews':
			const reviews = state.bookings.filter(
				(booking) => booking.review_status && booking.rating
			);
			return {
				...state,
				reviews: [...reviews],
			};
		case 'setPendingWishes':
			return {
				...state,
				pendingWishes: action.data,
			};
		case 'setAnswer':
			return {
				...state,
				captchaAnswer: action.data,
			};
		case 'setCaptchaValue':
			return {
				...state,
				captchaValue: action.data,
			};
		case 'setCaptchaAttempt':
			return {
				...state,
				captchaAttempt: [action.data, ...state.captchaValue],
			};
		default:
			return state;
	}
}

export default stateReducer;
