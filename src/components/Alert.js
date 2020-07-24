import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../config/globalState';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';

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

	const [pendingReview, setPendingReview] = useState('');

	useEffect(() => {
		const pendingReviews = bookings.filter(
			(booking) => !booking.review_status && !booking.open_status
		);
		setPendingReview(pendingReviews);
		return () => {};
	}, [bookings]);
	return (
		<IconButton aria-label="cart">
			<StyledBadge badgeContent={pendingReview.length || null} color="primary">
				<NotificationsIcon />
			</StyledBadge>
		</IconButton>
	);
}
