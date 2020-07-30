import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button, Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: 'rgba(41,223,189,1)',
		'&:hover': {
			backgroundColor: 'rgba(41,223,189,1)',
		},
	},
	fabProgress: {
		color: '#dc004e',
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1,
	},
	buttonProgress: {
		color: '#dc004e',
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

export default function CircularIntegration({ handleSubmit, booking }) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const timer = React.useRef();

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
	});

	React.useEffect(() => {
		return () => {
			clearTimeout(timer.current);
		};
	}, []);

	const handleButtonClick = () => {
		if (!loading) {
			setSuccess(false);
			setLoading(true);
			timer.current = setTimeout(() => {
				setSuccess(true);
				setLoading(false);
				setTimeout(function () {
					handleSubmit(booking);
					setSuccess(false);
				}, 2000);
			}, 2000);
		}
	};

	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<Fab
					aria-label="save"
					color="secondary"
					className={buttonClassname}
					onClick={handleButtonClick}
				>
					{success ? <CheckIcon /> : <ArrowUpwardOutlinedIcon />}
				</Fab>
				{loading && <CircularProgress size={68} className={classes.fabProgress} />}
			</div>
			<div className={classes.wrapper}>
				<Button
					variant="contained"
					color="secondary"
					className={buttonClassname}
					disabled={loading}
					onClick={handleButtonClick}
				>
					{success ? 'Success' : 'Submit'}
				</Button>
				{loading && (
					<CircularProgress size={24} className={classes.buttonProgress} />
				)}
			</div>
		</div>
	);
}
