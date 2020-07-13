import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import parentData from './data/parent_data';
import Nav from './components/Nav';
import UserDashboard from './components/UserDashboard';
import Bookings from './components/Bookings';
import Booking from './components/Booking';
import NewBooking from './components/NewBooking';
import EditBooking from './components/EditBooking';
import Login from './components/Login';
import Register from './components/Register';
import Success from './components/Success';
import NotFound from './components/NotFound';
import stateReducer from './config/stateReducer';
import { StateContext } from './config/globalState';

const App = () => {
	const initialState = {
		bookings: [],
		loggedInUser: null,
	};

	const [store, dispatch] = useReducer(stateReducer, initialState);
	const { bookings, adminUser } = store;

	useEffect(() => {
		dispatch({
			type: 'setBookings',
			data: parentData,
		});
	}, []);

	function getBookingFromId(id) {
		const booking = bookings.find((booking) => booking._id === parseInt(id));
		return booking;
	}

	function getNextId() {
		const ids = bookings.map((booking) => booking._id);
		return ids.sort()[ids.length - 1] + 1;
	}

	return (
		<div>
			<StateContext.Provider value={{ store, dispatch }}>
				<BrowserRouter>
					<Nav />
					<Switch>
						<Route exact path="/auth/register" component={Register} />
						<Route
							exact
							path="/dashboard"
							render={(props) => (
								<UserDashboard {...props} adminUser={adminUser} />
							)}
						/>
						<Route
							exact
							path="/auth/login"
							render={(props) => <Login {...props} />}
						/>
						<Route exact path="/auth/logout" render={Login} />
						<Route exact path="/success" render={Success} />
						<Route exact path="/bookings" component={Bookings} />
						<Route
							exact
							path="/bookings/:id"
							render={(props) => (
								<Booking
									{...props}
									booking={getBookingFromId(props.match.params.id)}
									showControls
								/>
							)}
						/>
						<Route
							exact
							path="/booking/new"
							render={(props) => <NewBooking {...props} nextId={getNextId()} />}
						/>
						<Route exact path="/booking/edit/:id" component={EditBooking} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</StateContext.Provider>
		</div>
	);
};

export default App;
