import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideNav from './components/SideNav';
import { getBookings } from './services/bookingsServices';

const App = () => {
	const initialState = {
		bookings: [],
		loggedInUser: null,
	};

	const [store, dispatch] = useReducer(stateReducer, initialState);
	const { bookings, loggedInUser, adminUser } = store;

	console.log('user: ', loggedInUser);
	console.log('admin: ', adminUser);

	function fetchBookings() {
		getBookings(loggedInUser, adminUser)
			.then((bookings) => {
				dispatch({
					type: 'setBookings',
					data: bookings,
				});
			})
			.catch((error) => {
				console.log(
					'An error occurred fetching bookings from the server:',
					error
				);
			});
	}

	useEffect(() => {
		fetchBookings();
	}, [loggedInUser, adminUser]);

	function getBookingFromId(id) {
		const booking = bookings.find((booking) => booking._id === parseInt(id));
		return booking;
	}

	function getNextId() {
		const ids = bookings.map((booking) => booking._id);
		return ids.sort()[ids.length - 1] + 1;
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
					{!loggedInUser && <Nav />}
					<Switch>
						<Route exact path="/auth/register" component={Register} />
						<PrivateRoute exact path="/dashboard" component={UserDashboard} />
						<Route exact path="/auth/login" component={Login} />
						<Route exact path="/auth/logout" render={Login} />
						<PrivateRoute exact path="/success" component={Success} />
						<PrivateRoute exact path="/bookings" component={Bookings} />
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
						<PrivateRoute
							exact
							path="/booking/new"
							component={NewBooking}
							options={{ nextId: getNextId() }}
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
