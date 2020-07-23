import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default function SimpleCard({ background, color, number, text }) {
	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
		},
		title: {
			fontSize: 14,
			fontWeight: 400,
			marginTop: 10,
			color: 'white',
		},
		number: {
			fontSize: 60,
			fontWeight: 700,
			color: 'white',
		},
		pos: {
			marginBottom: 12,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: 'white',
			background: background,
		},
	}));
	const classes = useStyles();

	return (
		<div data-cy="card" className={classes.root}>
			<Paper className={classes.paper}>
				<CardContent>
					<Typography
						className={classes.number}
						color="textSecondary"
						gutterBottom
					>
						{number}
					</Typography>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						{text}
					</Typography>
				</CardContent>
			</Paper>
		</div>
	);
}
