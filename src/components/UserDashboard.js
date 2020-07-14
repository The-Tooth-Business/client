// import React from 'react';

// import Continent from './Continent';
// import continentData from '../data/continents';
// import SideNav from './SideNav';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	paper: {
// 		padding: theme.spacing(2),
// 		textAlign: 'center',
// 		color: theme.palette.text.secondary,
// 	},
// }));

// const UserDashboard = () => {

// 	const classes = useStyles();

// 	return (
// 		<Grid
// 			container
// 			direction="row"
// 			justify="flex-start"
// 			alignItems="flex-start"
// 		>
// 			<SideNav />
// 			<div className={classes.root}>
// 				<Grid container spacing={3}>
// 					{bookings.map((booking) => (
// 						<Grid key={booking._id} item xs={12}>
// 							<Paper className={classes.paper}>{booking.name}</Paper>
// 						</Grid>
// 					))}
// 					{adminUser && (
// 						<Grid item xs={6}>
// 							<Paper className={classes.paper}>
// 								<Balance />
// 							</Paper>
// 						</Grid>
// 					)}
// 					<Grid item xs={6}>
// 						<Paper className={classes.paper}>xs=6</Paper>
// 					</Grid>

// 					<Grid item xs={3}>
// 						<Paper className={classes.paper}>xs=3</Paper>
// 					</Grid>
// 					<Grid item xs={3}>
// 						<Paper className={classes.paper}>xs=3</Paper>
// 					</Grid>
// 					<Grid item xs={3}>
// 						<Paper className={classes.paper}>xs=3</Paper>
// 					</Grid>
// 					{bookings.length === 0 && (
// 						<Grid item xs={3}>
// 							<Paper className={classes.paper}>
// 								Looks like you haven't made any bookings yet. Click on add a
// 								booking to get started
// 							</Paper>
// 						</Grid>
// 					)}
// 				</Grid>
// 			</div>
// 		</Grid>
// 	);
// };

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Bookings from './Bookings';
import Balance from './Balance';
import { useGlobalState } from '../config/globalState';

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

function UserDashboard(props) {
	const { store } = useGlobalState();
	const { adminUser, bookings, loggedInUser } = store;
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Hello, {loggedInUser}
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
							keepMounted: true, // Better open performance on mobile.
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
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Balance />
				<Bookings />
			</main>
		</div>
	);
}

export default UserDashboard;
