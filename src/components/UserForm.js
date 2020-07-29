import React, { useState } from 'react';
import { useGlobalState } from '../config/globalState';
import {
	Avatar,
	Button,
	TextField,
	Snackbar,
	Paper,
	Box,
	Grid,
	Typography,
	CssBaseline,
} from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Captcha from './Captcha';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			Tooth Inc. {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// Styling for the form
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

const UserForm = ({ label, handleSubmit, errorMessage }) => {
	const { store, dispatch } = useGlobalState();
	const { captchaValue, captchaAnswer } = store;
	const classes = useStyles();
	const initialFormState = {
		username: '',
		email: '',
		password: '',
	};
	const [userDetails, setUserDetails] = useState(initialFormState);
	const [showAlert, setAlert] = useState(false);

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		const user = {
			username: userDetails.username,
			email: userDetails.email,
			password: userDetails.password,
		};
		captchaAnswer === captchaValue ? handleSubmit(user) : setAlert(true);
		if (!captchaAnswer === !captchaValue) {
			dispatch({
				type: 'setCaptchaAttempt',
				data: 1,
			});
		}
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlert(false);
	};

	return (
		<Grid
			container
			component="main"
			className={classes.root}
			onSubmit={handleFormSubmit}
		>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					{/* render error message  */}
					<Typography component="h1" variant="h5">
						{label}
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
						{/* only render if on registration  */}
						{label === 'Register' && (
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
						)}
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
						<div className={classes.form}>
							<Typography>Prove you are an adult</Typography>
							<Captcha />
						</div>
						<Button
							data-cy="login-button"
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{label}
						</Button>
						<Grid container>
							{/* conditionally render login or register */}
							<Grid item>
								{label === 'Register' && (
									<Link to="/auth/login" variant="body2">
										{'Already have an account? Login here'}
									</Link>
								)}
								{label === 'Login' && (
									<Link to="/auth/register" variant="body2">
										{'No account? Register here'}
									</Link>
								)}
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
						<Snackbar open={showAlert} autoHideDuration={6000}>
							<Alert onClose={handleClose} severity="error">
								You are not a parent! Leave now or you will be on Santa's naughty list
							</Alert>
						</Snackbar>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default UserForm;
