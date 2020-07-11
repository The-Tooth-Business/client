import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import parentData from './data/parent_data';
import Nav from './components/Nav';
import Bookings from './components/Bookings';
import Booking from './components/Booking';
import NewBooking from './components/NewBooking';
import EditBooking from './components/EditBooking';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Success from './components/Success';
import NotFound from './components/NotFound';

const App = () => {
	const [bookings, setBookings] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState(null);
	useEffect(() => {
		setBookings(parentData);
	}, []);

	function getBookingFromId(id) {
		const booking = bookings.find((booking) => booking._id === parseInt(id));
		return booking;
		// return bookings.find((booking) => booking._id === parseInt(id))
	}

	function addBooking(booking) {
		setBookings([...bookings, booking]);
	}

	function getNextId() {
		const ids = bookings.map((booking) => booking._id);
		return ids.sort()[ids.length - 1] + 1;
	}

	function deleteBooking(id) {
		const otherBookings = bookings.filter(
			(booking) => booking._id !== parseInt(id)
		);
		setBookings(otherBookings);
	}

	function updateBooking(updatedBooking) {
		const otherBookings = bookings.filter(
			(booking) => booking._id !== updatedBooking._id
		);
		setBookings([...otherBookings, updatedBooking]);
	}

	function loginUser(user) {
		setLoggedInUser(user.username);
	}

	return (
		<div>
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <Login {...props} loginUser={loginUser} />}
					/>
					<Route exact path="/logout" render={Logout} />
					<Route exact path="/success" render={Success} />
					<Route exact path="/register" render={Register} />
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
