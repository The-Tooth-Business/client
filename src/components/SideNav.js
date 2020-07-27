import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useGlobalState } from '../config/globalState';
import { logoutUser, setLoggedInUser } from '../services/authServices';
import continents from '../data/continents.json';
//Styled components
import Alert from './Alert';
import StyledLink from './StyledLink';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import AppsIcon from '@material-ui/icons/Apps';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import background from '../images/bokeh.jpg';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
	alert: {
		position: 'fixed',
		right: '5%',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	text: {
		color: 'white',
		textDecoration: 'none',
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		backgroundImage: `url(${background})`,
		backgroundRepeat: 'no-repeat',
		opacity: 0.9,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function SideNav(props) {
	const { store, dispatch } = useGlobalState();
	const { loggedInUser, adminUser } = store;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();

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

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const drawer = (
		<div data-cy="side-navbar">
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<StyledLink icon={AppsIcon} text={'Dashboard'} link="/dashboard" />
				<StyledLink
					icon={AddCircleIcon}
					text={'Make a booking'}
					link="/booking/new"
				/>
			</List>
			<Divider />

			{adminUser &&
				continents.map((obj, index) => (
					<StyledLink
						key={`${index}-${obj.name}`}
						link={`/fairy/${obj.name}`}
						icon={FaceIcon}
						text={obj.name}
					/>
				))}

			<Divider />
			<List>
				<StyledLink
					link="/auth/login"
					icon={ExitToAppIcon}
					text={'Logout'}
					onClick={handleLogout}
				/>
			</List>
		</div>
	);

	return (
		<div>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar
					data-cy="toolbar"
					style={{
						background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
					}}
				>
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
					<div className={classes.alert}>
						<Alert />
					</div>
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
