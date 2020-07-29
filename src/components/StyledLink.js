import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

export default function StyledLink({ icon: Icon, text, link, ...options }) {
	const useStyles = makeStyles((theme) => ({
		text: {
			color: options.color ? options.color : 'white',
			textDecoration: 'none',
		},
		icon: {
			fill: 'white',
		},
		link: {
			textDecoration: 'none',
			height: 'auto',
		},
	}));
	const classes = useStyles();
	return (
		<Link to={link} className={classes.link} {...options}>
			<ListItem>
				<ListItemIcon>{Icon && <Icon className={classes.icon} />}</ListItemIcon>
				<ListItemText className={classes.text}>{text}</ListItemText>
			</ListItem>
		</Link>
	);
}
