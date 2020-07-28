import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { addWish } from '../services/wishServices';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
			// const name = event.target.name;
			const value = event.target.value;
			console.log(wishState);
			setWishState(value);
		}

		function handleWishSubmit(event) {
			event.preventDefault();
			const newWish = {
				wish: wishState
			}
			addWish(newWish).then((response) => {
				console.log('Wish recieved from server', response)
			}).catch((error) => {
				console.log('error', error)
			})
			history.push('/dashboard')
		}
		
	return (
		<Paper className={classes.paper}>
			<h3 className={classes.title}>Make a wish BETA</h3>
			<TextField onChange={handleChange} name='wish' value={wishState}>
				
			</TextField>
			<p className={classes.disc}>
				Granted wishes subject to availability. The Tooth Fairy in Charge makes
				no guarantee that your wish will be granted. Wishes will not be granted
				to those on Santa's naughty list.
			</p>
			<Button variant="contained" size="large" color="secondary" className={classes.margin}
				onClick={handleWishSubmit}> Submit
			</Button>
			
		</Paper>
	);
}

	
export default withRouter(MakeAWish)