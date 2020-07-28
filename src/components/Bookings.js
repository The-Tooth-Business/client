import React from 'react';
import PropTypes from 'prop-types';
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

import FaceIcon from '@material-ui/icons/Face';
import StyledLink from './StyledLink';

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

function createData(_id, open_status, child_name, teeth, continent, rating) {
	return { _id, open_status, child_name, teeth, continent, rating };
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
		.sort((a, b) => b.open_status - a.open_status)
		.map((booking) =>
			createData(
				booking._id,
				booking.open_status,
				booking.child_name,
				booking.teeth,
				booking.continent,
				booking.rating || '-'
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
		<Paper className={classes.paper}>
			<TableContainer>
				<Table className={classes.table} aria-label="custom pagination table">
					<TableHead>
						<TableRow>
							<TableCell>Status</TableCell>
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">Teeth</TableCell>
							<TableCell align="left">Continent</TableCell>
							<TableCell align="left">Rating</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row, index) => (
							<TableRow key={`${index} - ${row.child_name}`}>
								<TableCell style={{ width: '10%' }} align="left">
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
								<TableCell style={{ width: '20%' }} component="th" scope="row">
									{row.child_name}
								</TableCell>
								<TableCell style={{ width: '10%' }} align="left">
									{row.teeth}
								</TableCell>
								<TableCell style={{ width: '20%' }} align="left">
									{row.continent}
								</TableCell>
								<TableCell style={{ width: '10%' }} align="left">
									{row.rating}
								</TableCell>
								<TableCell style={{ width: '10%' }} align="left">
									<StyledLink
										link={`/bookings/${row._id}`}
										text={'View'}
										color={'hotpink'}
									/>
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
		</Paper>
	);
}
