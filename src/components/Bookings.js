import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TablePagination,
	TableRow,
	TableHead,
	Chip,
	Paper,
	IconButton,
} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DoneIcon from '@material-ui/icons/Done';
import StarIcon from '@material-ui/icons/Star';
import FaceIcon from '@material-ui/icons/Face';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

function createData(
	_id,
	open_status,
	child_name,
	teeth,
	continent,
	rating,
	modified_date
) {
	return {
		_id,
		open_status,
		child_name,
		teeth,
		continent,
		rating,
		modified_date,
	};
}

const useStyles2 = makeStyles({
	table: {
		minWidth: '100%',
	},
	icon: {
		fill: 'gold',
	},
});

export default function Bookings({ bookings }) {
	const history = useHistory();
	const classes = useStyles2();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	if (!bookings) return null;

	const rows = bookings
		.sort((a, b) => b.open_status - a.open_status)
		.map((booking) =>
			createData(
				booking._id,
				booking.open_status,
				booking.child_name,
				booking.teeth,
				booking.continent,
				booking.rating || '-',
				booking.modified_date
			)
		);

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function checkPending(booking) {
		let date = new Date();
		let day = date.getUTCDate();
		const isPending = new Date(booking).getUTCDate() < day;
		return isPending;
	}

	function renderStars(rating) {
		let stars = [];
		for (let i = 0; i < rating.rating; i++) {
			stars.push(
				<StarIcon
					fontSize="small"
					className={classes.icon}
					key={`${rating._id} - ${i}`}
				/>
			);
		}
		return stars;
	}

	return (
		<Paper data-cy="bookings" className={classes.paper}>
			<TableContainer>
				<Table className={classes.table} aria-label="custom pagination table">
					<TableHead>
						<TableRow>
							<TableCell>Details</TableCell>
							<TableCell align="left">Name</TableCell>
							<TableCell align="center">Teeth</TableCell>
							<TableCell align="right">Continent</TableCell>
							<TableCell align="right">Rating</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row, index) => (
							<TableRow data-cy="booking" key={`${index} - ${row.child_name}`}>
								<TableCell style={{ width: '25%' }} align="left">
									{row.open_status && checkPending(row.modified_date) && (
										<Chip
											color="secondary"
											label="Pending"
											size="small"
											icon={<ErrorOutlineIcon />}
											onClick={(event) => history.push(`/bookings/${row._id}`)}
										/>
									)}
									{row.open_status && !checkPending(row.modified_date) && (
										<Chip
											color="secondary"
											label="Open"
											size="small"
											variant="outlined"
											icon={<FaceIcon />}
											onClick={(event) => history.push(`/bookings/${row._id}`)}
										/>
									)}
									{!row.open_status && (
										<Chip
											label="Closed"
											size="small"
											icon={<DoneIcon />}
											onClick={(event) => history.push(`/bookings/${row._id}`)}
										/>
									)}
								</TableCell>
								<TableCell style={{ width: '15%' }} component="th" scope="row">
									{row.child_name}
								</TableCell>
								<TableCell style={{ width: '10%' }} align="center">
									{row.teeth}
								</TableCell>
								<TableCell style={{ width: '20%' }} align="right">
									{row.continent}
								</TableCell>
								<TableCell
									style={{ width: '30%' }}
									align="right"
									key={`${row._id} - ${row.rating}`}
								>
									{renderStars(row)}
								</TableCell>
							</TableRow>
						))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
								colSpan={12}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: { 'aria-label': 'rows per page' },
									native: true,
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Paper>
	);
}
