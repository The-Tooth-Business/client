import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	text: {
		color: 'white',
		textDecoration: 'none',
	},
	icon: {
		fill: 'white',
	},
	link: {
		textDecoration: 'none',
	},
}));

export default function StyledLink({ icon: Icon, text, link, ...options }) {
	const classes = useStyles();
	return (
		<Link to={link} className={classes.link} {...options}>
			<ListItem>
				<ListItemIcon>
					<Icon className={classes.icon} />
				</ListItemIcon>
				<ListItemText className={classes.text}>{text}</ListItemText>
			</ListItem>
		</Link>
	);
}
