import React, {  useMemo, useState } from 'react';
import { Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton, Paper, Pagination, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import DeletePopUp from '../library/DeletePopup';
import { categoryActionTypes, deleteCategory, loadCategories } from '../../store/actions/categoryActions';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { id: 'categoryName', label: 'Name', },
  { id: 'categoryDescription', label: 'Description' },
  { id: 'categoryCreatedOn', label: 'Created On' },
  { id: 'categoryActions', label: 'Actions' },
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


function Categories({ categories, totalRecords, paginationArray, stateRowsPerPage, dispatch }) {
  const { recordsPerPage, pageNumber } = useParams(); // while coming back from Edit item

  const [page, setPage] = useState(pageNumber ? parseInt(pageNumber) : 0);
  const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage ? parseInt(recordsPerPage) : parseInt(stateRowsPerPage));
  const classes = useStyles();

  const totalPages = useMemo(() => Math.ceil(totalRecords / rowsPerPage), [categories, rowsPerPage]);

  useEffect(() => {
    if (!paginationArray[page]) {
      dispatch(loadCategories(page, rowsPerPage))
    }

  }, [page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch({ type: categoryActionTypes.RESET_CATEGORY })
    dispatch({ type: categoryActionTypes.UPDATE_ROWS_PERPAGE, payload: event.target.value })
  };


  const visibleRows = React.useMemo(() => {
    if (paginationArray[page]) {
      return categories.slice(paginationArray[page].startIndex, paginationArray[page].endIndex);
    }
    else {
      return [];
    }
  }, [categories, page, rowsPerPage]);

  const refreshList = () => {
    dispatch({ type: categoryActionTypes.RESET_CATEGORY })
    if(page === 0)
      dispatch(loadCategories(page, rowsPerPage))
    else
      setPage(0);
  }

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Box display="flex" justifyContent='space-between' m={3}>
            <Typography variant="h5">Categories</Typography>
            <Box>
              <Button component={Link} to="/admin/categories/add" variant="outlined" startIcon={<AddIcon />}>Add</Button>
              <Button sx={{ ml: 1 }} onClick={refreshList} variant="outlined" endIcon={<RefreshIcon />}>Refresh</Button>
            </Box>
          </Box>
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
                if (!row) return;
                if (row.is_deleted) return;
                return <TableRow key={row._id} className={classes.headerRow}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {
                      format(new Date(row.created_on), 'dd MMMM, yyyy')
                    }
                  </TableCell>
                  <TableCell sx={{ display: "flex" }}>
                    <Link to={"/admin/categories/edit/" + row._id + "/" + rowsPerPage + "/" + page}>
                      <IconButton sx={{ color: "blue" }}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: "1rem" }} />
                      </IconButton>
                    </Link>
                    <DeletePopUp id={row._id} page={page} actionToDispatch={deleteCategory} />
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
              page={categories.length ? page : 0}
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
    categories: state.categories.categories,
    totalRecords: state.categories.totalRecords,
    loadingRecords: state.progressBar.loading,
    paginationArray: state.categories.paginationArray,
    stateRowsPerPage: state.categories.rowsPerPage
  }
}

export default connect(mapStateToProps)(Categories);