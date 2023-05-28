import React, { useCallback, useMemo, useState } from 'react';
import { Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton, Paper, Pagination, Chip, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { deleteReview, loadReviews, reviewActionTypes } from '../../store/actions/reviewActions';
import DeletePopUp from '../library/DeletePopup';

const columns = [
    { id: 'reviewRating', label: 'Rating', },
    { id: 'reviewText', label: 'Review Text' },
    {
        id: 'created_on',
        label: 'Created On',
        align: 'center',
    },
    {
        id: 'actions',
        label: 'Actions',
        width: 170,
        align: 'right'
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: "block",
        flex: 1
    },
    table: {
        height: "100%",
        width: "100%"
    },
    list: {},
    thead: {},
    tbody: {
        width: "100%"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        boxSizing: "border-box",
        minWidth: "100%",
        width: "100%"
    },
    headerRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    },
    cell: {
        display: "inline-flex",
        alignItems: "center",
        overflow: "hidden",
        flexGrow: 0,
        flexShrink: 0
    },
    justifyCenter: {
        justifyContent: "center"
    },
    expandingCell: {
        flex: 1
    },
    column: {},
    tableContainer: {
        "maxWidth": "100vw",
        overFlow: "scroll",
        WebkitOverflowScrolling: 'touch',
        '-ms-overflow-style': '-ms-autohiding-scrollbar'
    }
}));


function Reviews({ reviews, totalRecords, paginationArray, categories, dispatch }) {
    const { recordsPerPage, pageNumber, productId } = useParams(); // while coming back from Edit item

    const [page, setPage] = useState(pageNumber ? parseInt(pageNumber) : 0);
    const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage ? parseInt(recordsPerPage) : parseInt(process.env.REACT_APP_RECORDS_PER_PAGE));
    const classes = useStyles();

    const totalPages = useMemo(() => Math.ceil(totalRecords / rowsPerPage), [reviews, rowsPerPage]);

    useEffect(() => {
        if (!paginationArray[page]) {
            dispatch(loadReviews(page, rowsPerPage, productId))
        }

    }, [page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
        dispatch({ type: reviewActionTypes.RESET_REVIEW })
        dispatch({ type: reviewActionTypes.UPDATE_ROWS_PERPAGE, payload: event.target.value })
    };


    const visibleRows = React.useMemo(() => {
        if (paginationArray[page]) {
            return reviews.slice(paginationArray[page].startIndex, paginationArray[page].endIndex);
        }
        else {
            return [];
        }
    }, [reviews, page, rowsPerPage]);

    return (
        <Grid container>
            <Grid item md={12} xs={12}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((column, index) => (
                                        <TableCell key={index}>{column.label}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((row) => {
                                if (row.is_deleted) return;
                                return <TableRow key={row._id} className={classes.headerRow}>
                                    <TableCell><Rating value={row.rating} precision={0.5} readOnly /></TableCell>
                                    <TableCell>{row.reviewText}</TableCell>
                                    <TableCell>
                                        {
                                            format(new Date(row.created_on), 'dd MMMM, yyyy')
                                        }
                                    </TableCell>
                                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                                        {/* <Link to={"/admin/reviews/edit/" + row._id + "/" + rowsPerPage + "/" + page}>
                                            <IconButton sx={{ color: "blue" }}>
                                                <FontAwesomeIcon icon={faEdit} style={{ fontSize: "1rem" }} />
                                            </IconButton>
                                        </Link> */}
                                        <DeletePopUp id={row._id} page={page} actionToDispatch={deleteReview} />
                                    </TableCell>
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100, 250, 500]}
                            component="div"
                            count={totalRecords}
                            rowsPerPage={rowsPerPage}
                            page={reviews.length ? page : 0}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            backIconButtonProps={{
                                style: { display: "none" }
                            }}
                            nextIconButtonProps={{
                                style: { display: "none" }
                            }}

                            style={{ height: "45px", overflow: "hidden" }}
                        />
                        <Box>
                            <Pagination count={totalPages} page={page + 1} onChange={handleChangePage} variant="outlined" color="primary" shape="rounded" />
                        </Box>
                    </Box>
                </TableContainer>
            </Grid>
        </Grid>

    )
}


const mapStateToProps = state => {
    return {
        reviews: state.reviews.reviews,
        totalRecords: state.reviews.totalRecords,
        loadingRecords: state.progressBar.loading,
        paginationArray: state.reviews.paginationArray,
    }
}

export default connect(mapStateToProps)(Reviews);