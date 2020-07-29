import React, { useEffect, useState } from 'react';
import { getWishes, updateWish } from '../services/wishServices';
import { Paper, Chip } from '@material-ui/core/';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';

export default function IncomingWish() {
	const { dispatch, store } = useGlobalState();
	const { pendingWishes } = store;
	const useStyles = makeStyles((theme) => ({
		paper: {
			padding: theme.spacing(2),
			height: '100%',
			width: '100%',
			textAlign: 'center',
		},
		group: {
			marginTop: theme.spacing(2),
		},
		button: {
			margin: theme.spacing(2),
		},
	}));
	const classes = useStyles();
	const [incomingWish, setIncomingWish] = useState({});

	useEffect(() => {
		getWishes().then((response) => {
			dispatch({
				type: 'setPendingWishes',
				data: response.length,
			});
			setIncomingWish(response.pop() || {});
		});

		return () => {};
	}, [dispatch]);

	function handleSubmit(event) {
		const updatedWish = incomingWish;
		if (event.target.name === 'approve') {
			updatedWish.granted = true;
		} else {
			updatedWish.granted = false;
		}
		updateWish(updatedWish).then(() => {
			dispatch({ type: 'setPendingWishes', data: pendingWishes - 1 });
		});
	}

	return (
		<Paper data-cy="incoming-wish" className={classes.paper}>
			{pendingWishes > 0
				? `Incoming wish from ${incomingWish.username} - ${incomingWish.wish}`
				: 'No incoming wishes'}
			<div className={classes.group}>
				<Chip
					className={classes.button}
					disabled={!pendingWishes > 0}
					onClick={handleSubmit}
					color="success"
					label="Approve"
					size="small"
					name="approve"
					variant="outlined"
					icon={<DoneIcon />}
				/>
				<Chip
					className={classes.button}
					disabled={!pendingWishes > 0}
					onClick={handleSubmit}
					color="secondary"
					label="Deny"
					size="small"
					name="deny"
					variant="outlined"
					icon={<ClearIcon />}
				/>
			</div>
		</Paper>
	);
}
