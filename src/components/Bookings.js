// import React from 'react';
// import Booking from './Booking';
// import { useGlobalState } from '../config/globalState';

// const Bookings = () => {
// 	const { store } = useGlobalState();
// 	const { bookings } = store;
// 	if (!bookings) return null;

// 	return (
// 		<div>
// 			{bookings
// 				.sort((a, b) => b.modified_date - a.modified_date)
// 				.map((booking) => (
// 					<Booking key={booking._id} booking={booking} />
// 				))}
// 		</div>
// 	);
// };

// export default Bookings;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import TableHead from '@material-ui/core/TableHead';
import { Link } from 'react-router-dom';

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
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
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
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

function createData(_id, open_status, child_name, teeth, continent) {
	return { _id, open_status, child_name, teeth, continent };
}

const useStyles2 = makeStyles({
	table: {
		minWidth: '100%',
	},
});

export default function Bookings({ bookings }) {
	const classes = useStyles2();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	if (!bookings) return null;

	const rows = bookings
		.sort((a, b) => b.modified_date - a.modified_date)
		.map((booking) =>
			createData(
				booking._id,
				booking.open_status,
				booking.child_name,
				booking.teeth,
				booking.continent
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

	return (
		<TableContainer>
			<Table className={classes.table} aria-label="custom pagination table">
				<TableHead>
					<TableRow>
						<TableCell>View</TableCell>
						<TableCell>Status</TableCell>
						<TableCell align="left">Name</TableCell>
						<TableCell align="right">Teeth</TableCell>
						<TableCell align="right">Continent</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
					).map((row) => (
						<TableRow key={row.child_name}>
							<TableCell style={{ width: '10%' }} align="left">
								<Link to={`/bookings/${row._id}`}>Edit</Link>
							</TableCell>
							<TableCell style={{ width: '10%' }} align="right">
								{row.open_status && (
									<Chip
										color="secondary"
										label="Open"
										size="small"
										icon={<FaceIcon />}
									/>
								)}
								{!row.open_status && (
									<Chip label="Closed" size="small" icon={<FaceIcon />} />
								)}
							</TableCell>
							<TableCell component="th" scope="row">
								{row.child_name}
							</TableCell>
							<TableCell style={{ width: '10%' }} align="right">
								{row.teeth}
							</TableCell>
							<TableCell style={{ width: '20%' }} align="right">
								{row.continent}
							</TableCell>
						</TableRow>
					))}

					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
							colSpan={3}
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
	);
}
