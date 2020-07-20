import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import currencies from '../supported-currencies.json';
import { addBooking } from '../services/bookingsServices';
import { useGlobalState } from '../config/globalState';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		formControl: {
			margin: theme.spacing(8),
			marginLeft: theme.spacing(2),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(8),
			marginLeft: theme.spacing(2),
			minWidth: 120,
		},
	},
	paper: {
		marginTop: 40,
		marginBottom: theme.spacing(3),
		padding: 8,
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(20),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

const NewBooking = ({ history }) => {
	const { dispatch } = useGlobalState();
	const classes = useStyles();

	const initialFormState = {
		child_name: '',
		surname: '',
		teeth: '',
		address: '',
		city: '',
		postcode: '',
		country: '',
		continent: '',
		currency: '',
	};
	const [formState, setFormState] = useState(initialFormState);
	const [errorMessage, setErrorMessage] = useState(null);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFormState({ ...formState, [name]: value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		const newBooking = {
			child_name: formState.child_name,
			teeth: formState.teeth,
			address: formState.address,
			city: formState.city,
			postcode: formState.postcode,
			country: formState.country,
			continent: formState.continent,
			currency: formState.currency,
		};
		addBooking(newBooking)
			.then((response) => {
				dispatch({
					type: 'addBooking',
					data: response,
				});

				// history.push('/dashboard');
			})
			.catch((error) => {
				const status = error.response ? error.response.status : 500;
				console.log('caught error on edit', error);
				if (status === 403)
					setErrorMessage(
						'Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.'
					);
				else
					setErrorMessage(
						'Well, this is embarrassing... There was a problem on the server.'
					);
			});
	}

	return (
		<React.Fragment>
			<main className={classes.content}>
				<Paper className={classes.paper}>
					<Typography variant="h6" gutterBottom>
						Booking
						{errorMessage && <p>{errorMessage}</p>}
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="child_name"
								name="child_name"
								label="child_name"
								fullWidth
								autoComplete="given-name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="surname"
								name="surname"
								label="surname"
								fullWidth
								autoComplete="surname"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="teeth"
								name="teeth"
								label="number of teeth"
								fullWidth
								autoComplete="number of teeth"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="address"
								name="address"
								label="Address"
								fullWidth
								autoComplete="address"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="city"
								name="city"
								label="city"
								fullWidth
								autoComplete="shipping address-level2"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="postcode"
								name="postcode"
								label="postcode"
								fullWidth
								autoComplete="shipping postal-code"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="country"
								name="country"
								label="Country"
								fullWidth
								autoComplete="shipping country"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="continent"
								name="continent"
								label="continent"
								fullWidth
								autoComplete="continent"
								onChange={handleChange}
							/>
						</Grid>

						<FormControl required className={classes.formControl}>
							<InputLabel htmlFor="uncontrolled-native">Currency</InputLabel>
							<NativeSelect
								onChange={handleChange}
								inputProps={{
									name: 'currency',
									id: 'uncontrolled-native',
								}}
							>
								{currencies.map((obj, index) => (
									<option key={`${index}-${obj.country}`} value={obj.currency}>
										{' '}
										{obj.country}{' '}
									</option>
								))}
							</NativeSelect>
							<FormHelperText>Required</FormHelperText>
						</FormControl>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox color="secondary" name="saveAddress" value="yes" />
								}
								label="Save this address?"
							/>
						</Grid>
					</Grid>
					<Button
<<<<<<< HEAD
						// disabled={enableSubmitButton}
=======
						data-cy="booking-new-submit"
>>>>>>> development
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						className={classes.button}
					>
						Book now
					</Button>
				</Paper>
			</main>
		</React.Fragment>
	);
};

export default withRouter(NewBooking);
