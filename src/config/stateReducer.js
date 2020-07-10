function stateReducer(state, action) {
    switch(action.type) {
        case 'setBookings':
            return {
                ...state,
                Bookings: action.data
            }
        case 'addBooking':
            return {
                ...state,
                Bookings: [action.data, ...state.Bookings]
                //setBookings([...bookings, booking]);
            }
        case 'updateBooking':
            const otherBooking = state.Bookings.filter((booking) => booking._id !== action.data._id)
            return {
                ...state,
                Bookings: [...otherBooking, action.data]
            }
        case 'deleteBooking':
            const otherBookings = state.Bookings.filter((booking) => booking._id !== parseInt(action.data))
            return {
                ...state,
                Bookings: otherBookings
            }

        // case 'getBookingsFromId':
        //     const booking = bookings.find((booking) => booking._id === action.data)
        //     return {
        //         ...state,
        //         Bookings: booking
        //     }
       
            default:
                return state
    }
}

export default stateReducer