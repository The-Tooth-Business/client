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
	const { bookings, adminUser, pendingWishes } = store;
	const [open, setOpen] = React.useState(false);
	const [wishes, setWishes] = React.useState(0);
	const [pendingReview, setPendingReview] = useState([]);

	useEffect(() => {
		const pendingReviews = bookings.filter(
			(booking) => !booking.review_status && !booking.open_status
		);
		adminUser && setWishes(pendingWishes);
		setPendingReview(pendingReviews);
		return () => {};
	}, [bookings, pendingWishes, adminUser]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton onClick={handleClickOpen}>
				<StyledBadge
					badgeContent={adminUser ? wishes || null : pendingReview.length || null}
					color="secondary"
					data-cy="alerts"
				>
					<NotificationsIcon />
				</StyledBadge>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				data-cy="alert-box"
			>
				{adminUser && (
					<DialogTitle id="alert-dialog-title">
						{wishes > 0 && <p>You have {wishes} wishes waiting to be reviewed</p>}
						{!wishes && <p>You're all caught up!</p>}
					</DialogTitle>
				)}
				{!adminUser && (
					<DialogTitle id="alert-dialog-title">
						{pendingReview.length > 0 && (
							<p>You have {pendingReview.length} bookings waiting to be reviewed</p>
						)}
						{pendingReview.length === 0 && <p>You're all caught up!</p>}
					</DialogTitle>
				)}
				{!adminUser && (
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
				)}
			</Dialog>
		</div>
	);
}
