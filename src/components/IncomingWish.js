import React from 'react';
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
	return (
		<Paper className={classes.paper}>
			Incoming wish from user1: "please let me win the lottery"
			<Button>approve</Button>
			<Button>deny</Button>
		</Paper>
	);
}
