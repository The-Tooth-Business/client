import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import currencies from '../supported-currencies.json';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
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

const Form = ({ buttonLabel, handleSubmit, errorMessage, booking }) => {
	const classes = useStyles();
	console.log(booking);
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

	useEffect(() => {
		booking &&
			setFormState({
				child_name: booking.child_name,
				teeth: booking.teeth,
				address: booking.address,
				city: booking.city,
				postcode: booking.postcode,
				country: booking.country,
				continent: booking.continent,
				currency: booking.currency,
			});
	}, [booking]);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFormState({ ...formState, [name]: value });
		console.log(formState);
	}

	function handleFormSubmit(event) {
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
		if (booking) {
			newBooking._id = booking._id;
		}

		handleSubmit(newBooking);
	}

	return (
		<React.Fragment>
			<main className={classes.content}>
				<Paper className={classes.paper}>
					<Typography variant="h6" gutterBottom>
						{buttonLabel}
						{errorMessage && <p>{errorMessage}</p>}
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								required={true}
								id="child_name"
								name="child_name"
								value={formState.child_name}
								label="name"
								fullWidth
								autoComplete="given-name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="teeth"
								name="teeth"
								value={formState.teeth}
								label="number of teeth"
								fullWidth
								autoComplete="number of teeth"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address"
								name="address"
								label="Address"
								value={formState.address}
								fullWidth
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="city"
								name="city"
								label="city"
								value={formState.city}
								fullWidth
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="postcode"
								name="postcode"
								label="postcode"
								value={formState.postcode}
								fullWidth
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="country"
								name="country"
								label="Country"
								value={formState.country}
								fullWidth
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="continent"
								name="continent"
								label="continent"
								value={formState.continent}
								fullWidth
								autoComplete="continent"
								onChange={handleChange}
							/>
						</Grid>

						<FormControl required className={classes.formControl}>
							<InputLabel htmlFor="uncontrolled-native">Currency</InputLabel>
							<NativeSelect
								onChange={handleChange}
								value={formState.currency}
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
							{/* <FormHelperText>Required</FormHelperText> */}
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
						data-cy="booking-new-submit"
						variant="contained"
						color="primary"
						onClick={handleFormSubmit}
						className={classes.button}
					>
						Submit
					</Button>
				</Paper>
			</main>
		</React.Fragment>
	);
};

export default withRouter(Form);