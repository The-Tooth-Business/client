import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AppsIcon from '@material-ui/icons/Apps';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import { Link } from 'react-router-dom';
import { logoutUser, setLoggedInUser } from '../services/authServices';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function SideNav(props) {
	const { store, dispatch } = useGlobalState();
	const { loggedInUser } = store;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	function handleLogout() {
		setLoggedInUser(null);
		logoutUser()
			.then((response) => {
				console.log('Got back response on logout', response.status);
			})
			.catch((error) => {
				console.log(
					'The server may be down - caught an exception on logout:',
					error
				);
			});
		dispatch({
			type: 'setLoggedInUser',
			data: null,
		});
		dispatch({
			type: 'setAdminUser',
			data: false,
		});
	}

	const drawer = (
		<div data-cy="side-navbar">
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<Link to="/dashboard">
					<ListItem>
						<ListItemIcon>
							<AppsIcon />
						</ListItemIcon>
						<ListItemText>Dashboard</ListItemText>
					</ListItem>
				</Link>
				<Link to="/bookings">
					<ListItem>
						<ListItemIcon>
							<AssignmentTurnedInIcon />
						</ListItemIcon>
						<ListItemText>Bookings</ListItemText>
					</ListItem>
				</Link>
				<Link to="/booking/new">
					<ListItem>
						<ListItemIcon >
							<AddCircleIcon />
						</ListItemIcon>
						<ListItemText data-cy="booking-new">Make a booking</ListItemText>
					</ListItem>
				</Link>
			</List>
			<Divider />
			<List>
				<Link to="/auth/login" onClick={handleLogout}>
					<ListItem>
						<ListItemIcon>
							<AppsIcon />
						</ListItemIcon>
						<ListItemText data-cy="logout">Logout</ListItemText>
					</ListItem>
				</Link>
			</List>
		</div>
	);

	return (
		<div>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar data-cy="toolbar">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography data-cy="user" variant="h6" noWrap>
						Hello, {loggedInUser}
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}
