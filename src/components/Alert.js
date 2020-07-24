import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../config/globalState';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}))(Badge);

export default function Alert() {
	const { store } = useGlobalState();
	const { bookings } = store;
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [pendingReview, setPendingReview] = useState([]);

	useEffect(() => {
		const pendingReviews = bookings.filter(
			(booking) => !booking.review_status && !booking.open_status
		);
		setPendingReview(pendingReviews);
		return () => {};
	}, [bookings]);
	return (
		<div>
			<IconButton onClick={handleClickOpen}>
				<StyledBadge
					badgeContent={pendingReview.length || null}
					color="primary"
				>
					<NotificationsIcon />
				</StyledBadge>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{pendingReview.length > 0 && (
						<p>
							You have {pendingReview.length} bookings waiting to be reviewed
						</p>
					)}
					{pendingReview.length === 0 && <p>You're all caught up!</p>}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{pendingReview.map((booking) => (
							<Link to={`/bookings/${booking._id}`} onClick={handleClose}>
								<p>{booking.child_name}</p>
							</Link>
						))}
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}
