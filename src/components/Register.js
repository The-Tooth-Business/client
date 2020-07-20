import React, { useState } from 'react';
import { useGlobalState } from '../config/globalState';
import { registerUser, setLoggedInUser } from '../services/authServices';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			Tooth Inc.
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Register = ({ history }) => {
	const classes = useStyles();
	const { dispatch } = useGlobalState();
	const initialFormState = {
		username: '',
		email: '',
		password: '',
	};
	const [userDetails, setUserDetails] = useState(initialFormState);
	const [errorMessage, setErrorMessage] = useState(null);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	}
	function handleSubmit(event) {
		event.preventDefault();
		registerUser(userDetails)
			.then((response) => {
				setLoggedInUser(response.username);
				dispatch({
					type: 'setLoggedInUser',
					data: response.username,
				});
				dispatch({
					type: 'setAdminUser',
					data: response.admin,
				});
				history.push('/dashboard');
			})
			.catch((error) => {
				setErrorMessage('Please try again');
				console.log('Error registering user', error);
			});
	}

	return (
		<Grid
			container
			component="main"
			className={classes.root}
			onSubmit={handleSubmit}
		>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
						{errorMessage && <p>{errorMessage}</p>}
					</Typography>
					<form data-cy="login-form" className={classes.form} noValidate>
						<TextField
							data-cy="username"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							onChange={handleChange}
							autoFocus
						/>
						<TextField
							data-cy="email"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="email"
							label="email"
							type="email"
							id="email"
							autoComplete="email"
							onChange={handleChange}
						/>
						<TextField
							data-cy="password"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handleChange}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							data-cy="login-button"
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Register
						</Button>
						<Grid container>
							<Grid item>
								<Link to="/auth/login" variant="body2">
									{'Already have an account? Login here'}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default Register;
