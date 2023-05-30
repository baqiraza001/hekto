import React, { useCallback, useMemo, useState } from 'react';
import { Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton, Paper, Pagination, Chip, Rating, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { deleteProduct, loadProducts, productActionTypes } from '../../store/actions/productActions';
import DeletePopUp from '../library/DeletePopup';
import { reviewActionTypes } from '../../store/actions/reviewActions';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { id: 'productName', label: 'Name', },
  {
    id: 'sale-price',
    label: 'Sale Price',
    align: 'left',

  },
  { id: 'productEmail', label: 'Discount Price' },
  { id: 'productRating', label: 'Rating' },
  {
    id: 'category',
    label: 'Category',
    align: 'center',
  },
  {
    id: 'productStatus',
    label: 'Status',
    align: 'center',
  },
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


function Products({ products, totalRecords, paginationArray, stateRowsPerPage, dispatch }) {
  const { recordsPerPage, pageNumber } = useParams(); // while coming back from Edit item

  const [page, setPage] = useState(pageNumber ? parseInt(pageNumber) : 0);
  const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage ? parseInt(recordsPerPage) : parseInt(stateRowsPerPage));
  const classes = useStyles();

  const totalPages = useMemo(() => Math.ceil(totalRecords / rowsPerPage), [products, rowsPerPage]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!paginationArray[page]) {
      dispatch(loadProducts(page, rowsPerPage))
    }

  }, [page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch({ type: productActionTypes.RESET_PRODUCT })
    dispatch({ type: productActionTypes.UPDATE_ROWS_PERPAGE, payload: event.target.value })
  };


  const visibleRows = React.useMemo(() => {
    if (paginationArray[page]) {
      return products.slice(paginationArray[page].startIndex, paginationArray[page].endIndex);
    }
    else {
      return [];
    }
  }, [products, page, rowsPerPage]);

  const handleReviewsPage = (url) => {
    dispatch({ type: reviewActionTypes.RESET_REVIEW })
    navigate(url)
  }

  const refreshList = () => {
    dispatch({ type: productActionTypes.RESET_PRODUCT })
    if (page === 0)
      dispatch(loadProducts(page, rowsPerPage))
    else
      setPage(0);
  }

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Box display="flex" justifyContent='space-between' m={3}>
            <Typography variant="h5">Products</Typography>
            <Box>
              <Button component={Link} to="/admin/products/add" variant="outlined" startIcon={<AddIcon />}>Add</Button>
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
                  <TableCell>{row.sale_price}</TableCell>
                  <TableCell>{row.discountPrice}</TableCell>
                  <TableCell><Rating value={row.averageRating} precision={0.5} readOnly /></TableCell>
                  <TableCell><Chip size='small' label={row.categoryName} color="info" /></TableCell>
                  <TableCell>
                    {
                      row.active == process.env.REACT_APP_STATUS_ACTIVE ?
                        <Chip size='small' label="Active" color="success" /> :
                        <Chip size='small' label="Not Active" color="primary" />
                    }
                  </TableCell>
                  <TableCell>
                    {
                      format(new Date(row.created_on), 'dd MMMM, yyyy')
                    }
                  </TableCell>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Link to={"/admin/products/edit/" + row._id + "/" + rowsPerPage + "/" + page}>
                      <IconButton sx={{ color: "blue" }}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: "1rem" }} />
                      </IconButton>
                    </Link>
                    <DeletePopUp id={row._id} page={page} actionToDispatch={deleteProduct} />
                    <IconButton sx={{ color: "#FF9529" }} onClick={() => handleReviewsPage("/admin/products/reviews/" + row._id)}>
                      <FontAwesomeIcon icon={faStar} style={{ fontSize: "1rem" }} />
                    </IconButton>
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
              page={products.length ? page : 0}
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
    products: state.products.products,
    totalRecords: state.products.totalRecords,
    loadingRecords: state.progressBar.loading,
    paginationArray: state.products.paginationArray,
    stateRowsPerPage: state.brands.rowsPerPage
  }
}

export default connect(mapStateToProps)(Products);