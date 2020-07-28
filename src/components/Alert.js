import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../config/globalState';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
	Badge,
	IconButton,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from '@material-ui/core';

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
				<StyledBadge badgeContent={pendingReview.length || null} color="primary">
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
						<p>You have {pendingReview.length} bookings waiting to be reviewed</p>
					)}
					{pendingReview.length === 0 && <p>You're all caught up!</p>}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{pendingReview.map((booking, index) => (
							<Button key={`${index}-${booking._id}`}>
								{' '}
								<Link
									key={`${index}-${booking._id}`}
									to={`/bookings/${booking._id}`}
									onClick={handleClose}
								>
									{booking.child_name}
								</Link>
							</Button>
						))}
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}
