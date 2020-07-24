import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

export default function MakeAWish() {
	const classes = useStyles();
	return (
		<Paper className={classes.paper}>
			<h3 className={classes.title}>Make a wish BETA</h3>
			<TextField></TextField>
			<p className={classes.disc}>
				Granted wishes subject to availability. The Tooth Fairy in Charge makes
				no guarantee that your wish will be granted. Wishes will not be granted
				to those on Santa's naughty list.
			</p>
		</Paper>
	);
}
