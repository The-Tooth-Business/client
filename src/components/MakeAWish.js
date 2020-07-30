import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { addWish } from '../services/wishServices';
import { TextField, Paper, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularIntegration from './CircularIntegration';

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		height: '100%',
		width: '100%',
	},
	title: {
		color: 'gray',
	},
	disc: {
		fontSize: '10px',
		fontStyle: 'italic',
	},
}));

const MakeAWish = ({ history }) => {
	const classes = useStyles();
	const [wishState, setWishState] = useState('');

	function handleChange(event) {
		const value = event.target.value;
		setWishState(value);
	}

	function handleWishSubmit() {
		const newWish = {
			wish: wishState,
		};
		addWish(newWish)
			.then((response) => {
				setWishState('');
			})
			.catch((error) => {
				console.log('error', error);
			});
		history.push('/dashboard');
	}

	return (
		<Paper className={classes.paper}>
			<div>
				<Chip
					className={classes.button}
					label="BETA"
					size="medium"
					color="secondary"
					variant="outlined"
				/>
				<h1 className={classes.title}>Need a quick fix? Make a wish.</h1>
			</div>

			<TextField
				fullWidth
				onChange={handleChange}
				name="wish"
				value={wishState}
			></TextField>
			<p className={classes.disc}>
				Granted wishes subject to availability. The Tooth Fairy in Charge makes no
				guarantee that your wish will be granted. Wishes will not be granted to
				those on Santa's naughty list.
			</p>
			<CircularIntegration booking={wishState} handleSubmit={handleWishSubmit} />
		</Paper>
	);
};

export default withRouter(MakeAWish);
