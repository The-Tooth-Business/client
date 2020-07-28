import React, { useEffect, useState } from 'react';
import { getWishes, updateWish } from '../services/wishServices';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export default function IncomingWish() {
	const useStyles = makeStyles((theme) => ({
		paper: {
			padding: theme.spacing(2),
			height: '100%',
			width: '100%',
			textAlign: 'center',
		},
	}));
	const classes = useStyles();
	const [incomingWish, setIncomingWish] = useState({})
	const [ wishes, setWishes ] = useState(incomingWish);
	useEffect(() => {
		getWishes().then((response) => {
			setIncomingWish(response.pop() || {})
		})
		return () => {};
	}, [wishes]);

	function handleSubmit(event) {
		const updatedWish = incomingWish
		if (event.target.name === 'approve') {
			updatedWish.granted = true;
		} else {
			updatedWish.granted = false;
		} 
		updateWish(updatedWish).then((response) => {
			setWishes([]);
		})
	}

	return (
		<Paper className={classes.paper}>
			{incomingWish.hasOwnProperty('wish') ? `Incoming wish from ${incomingWish.username} - ${incomingWish.wish}`: 'No incoming wishes'}
			<Button disabled={!incomingWish.hasOwnProperty('wish')} onClick={handleSubmit} name='approve' >approve</Button>
			<Button disabled={!incomingWish.hasOwnProperty('wish')} onClick={handleSubmit} name='deny' >deny</Button>
		</Paper>
	);
}
