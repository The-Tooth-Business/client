import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import Bookings from './components/Bookings';
import Booking from './components/Booking';
import NewBooking from './components/NewBooking';
import EditBooking from './components/EditBooking';
import Login from './components/Login';
import Register from './components/Register';
import FairyProfile from './components/FairyProfile';
import NotFound from './components/NotFound';
import stateReducer from './config/stateReducer';
import { StateContext } from './config/globalState';
import PrivateRoute from './components/PrivateRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideNav from './components/SideNav';
import { getBookings } from './services/bookingsServices';
import {
	setLoggedInUser,
	getLoggedInUser,
	getAdminUser,
} from './services/authServices';

const App = () => {
	const initialState = {
		bookings: [],
		loggedInUser: null,
		reviews: [],
	};

	const [store, dispatch] = useReducer(stateReducer, initialState);
	const { bookings, loggedInUser, adminUser } = store;
	useEffect(() => {
		dispatch({
			type: 'setLoggedInUser',
			data: getLoggedInUser(),
		});
		dispatch({
			type: 'setAdminUser',
			data: getAdminUser(),
		});
		loggedInUser &&
			getBookings(loggedInUser, adminUser)
				.then((bookings) => {
					dispatch({
						type: 'setBookings',
						data: bookings,
					});

					dispatch({
						type: 'setReviews',
						data: bookings,
					});
				})
				.catch((error) => {
					setLoggedInUser(null);
					console.log('An error occurred fetching bookings from the server:', error);
				});
	}, [loggedInUser, adminUser]);

	function getBookingFromId(id) {
		const booking = bookings.find((booking) => booking._id === id);
		return booking;
	}

	const flexDiv = {
		display: 'flex',
	};

	return (
		<div style={flexDiv}>
			<StateContext.Provider value={{ store, dispatch }}>
				<BrowserRouter>
					<CssBaseline />
					{loggedInUser && <SideNav />}

					<Switch>
						<Route
							exact
							path="/"
							render={() =>
								loggedInUser ? (
									<Redirect to="/dashboard" />
								) : (
									<Redirect to="/auth/login" />
								)
							}
						/>
						<Route exact path="/auth/register" component={Register} />
						<PrivateRoute exact path="/dashboard" component={UserDashboard} />
						<Route exact path="/auth/login" component={Login} />
						<Route exact path="/auth/logout" render={Login} />
						<PrivateRoute exact path="/bookings" component={Bookings} />
						<PrivateRoute
							exact
							path="/bookings/:id"
							component={(props) => (
								<Booking
									{...props}
									booking={getBookingFromId(props.match.params.id)}
									showControls
								/>
							)}
						/>
						<PrivateRoute
							exact
							path="/fairy/:id"
							component={(props) => (
								<FairyProfile {...props} continent={props.match.params.id} />
							)}
						/>
						<PrivateRoute exact path="/booking/new" component={NewBooking} />
						<PrivateRoute exact path="/booking/edit/:id" component={EditBooking} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</StateContext.Provider>
		</div>
	);
};

export default App;
