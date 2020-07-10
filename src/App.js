import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import parentData from './data/parent_data';
import Nav from './components/Nav';
import Bookings from './components/Bookings';
import Booking from './components/Booking';
import NewBooking from './components/NewBooking';
import EditBooking from './components/EditBooking';
import Login from './components/Login';
import Logout from './components/Logout';
import Success from './components/Success';
import NotFound from './components/NotFound';
import stateReducer from './config/stateReducer'

const App = () => {
  // const [bookings, setBookings] = useState([]);
  
const initialState = {
  bookings: [],
}

const [store, dispatch] = useReducer(stateReducer,initialState)
 const {bookings} = store

	useEffect(() => {
    // setBookings(parentData);
    dispatch({
      type: 'setBookings',
      data: parentData
    })
	}, []);

	function getBookingFromId(id) {
		const booking = bookings.find((booking) => booking._id === parseInt(id));
    return booking; 
    // dispatch({
    //   type: 'getBookingFromId',
    //   data: id
    // })
	}

	function addBooking(booking) {
    dispatch({
      type: 'addBooking',
      data: booking
    })
	}

	function getNextId() {
		const ids = bookings.map((booking) => booking._id);
		return ids.sort()[ids.length - 1] + 1;
	}

	function deleteBooking(id) {
		dispatch({
      type: 'deleteBooking',
      data: id
    })
	}

	function updateBooking(updatedBooking) {
		dispatch({
      type: 'updateBooking',
      data: updatedBooking
    })
  }
  
	return (
		<div>
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route exact path="/" render={Login} />
					<Route exact path="/logout" render={Logout} />
					<Route exact path="/success" render={Success} />
					<Route
						exact
						path="/bookings"
						render={(props) => <Bookings {...props} parentData={bookings} />}
					/>
					<Route
						exact
						path="/bookings/:id"
						render={(props) => (
							<Booking
								{...props}
								booking={getBookingFromId(props.match.params.id)}
								showControls
								deleteBooking={deleteBooking}
							/>
						)}
					/>
					<Route
						exact
						path="/booking/new"
						render={(props) => (
							<NewBooking
								{...props}
								addBooking={addBooking}
								nextId={getNextId()}
							/>
						)}
					/>
					<Route
						exact
						path="/booking/edit/:id"
						render={(props) => (
							<EditBooking
								{...props}
								updateBooking={updateBooking}
								booking={getBookingFromId(props.match.params.id)}
							/>
						)}
					/>
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
