import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { addWish } from '../services/wishServices';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
				wish: wishState
			}
			addWish(newWish).then((response) => {
				console.log('Wish recieved from server', response)
				setWishState('')
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
			<CircularIntegration 
			booking={wishState} handleSubmit={handleWishSubmit}/> 
		</Paper>
	);
}

	
export default withRouter(MakeAWish)