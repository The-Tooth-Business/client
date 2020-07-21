import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function SimpleCard({ color, number, text }) {
	const useStyles = makeStyles({
		root: {
			width: '100%',
		},
		title: {
			fontSize: 14,
			fontWeight: 400,
			marginTop: 10,
		},
		number: {
			fontSize: 70,
			fontWeight: 700,
			color: color,
		},
		pos: {
			marginBottom: 12,
		},
	});
	const classes = useStyles();

	return (
		<div className={classes.root} backgroundColor={color}>
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
		</div>
	);
}
