import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import logo from '../../../static/images/logo.png';
import MenuLink from '../menus/MenuLink';

import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField } from '@mui/material';
import { themeStyles } from '../../../styles';
import { Link } from 'react-router-dom';


const pages = [
  {
    id: 'home',
    label: 'Home',
    // options: [{ to: '/home1', option: 'Home1' }, { to: '/home2', option: 'Home 2' }, { to: '/home3', option: 'Home 3' }],
    anchorEl: null,
    to: '/',
    open: false
  },
  {
    id: 'products',
    label: 'Products',
    to: '/products',
    options: null,
    anchorEl: null,
    open: false
  },
  {
    id: 'cart',
    to: '/cart',
    label: 'Cart',
    options: null,
    anchorEl: null,
    open: false
  },
  {
    id: 'product-details',
    to: '/products/details',
    label: 'Details',
    options: null,
    anchorEl: null,
    open: false
  },
  {
    id: 'order-completed',
    to: '/products/orders/completed',
    label: 'Completed',
    options: null,
    anchorEl: null,
    open: false
  },
  {
    id: 'checkout-page',
    to: '/products/orders/checkout',
    label: 'Checkout',
    options: null,
    anchorEl: null,
    open: false
  }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" sx={{ "backgroundColor": "var(--bgcolor)" }}>
      <Grid container sx={{ "alignItems": 'center', 'justiyContent': 'space-evenly' }}>

        <Grid item md={1}></Grid>
        <Grid item md={2}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link to="/"> <img src={logo} /></Link>
            </Typography>
          </Toolbar>
        </Grid>

        <Grid item md={5}>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuLink data={pages} styleObject={{ color: 'black' }} />
          </Box>
        </Grid>


        {/* for mobile */}
        <Typography
          variant="h5"
          noWrap
          sx={{
            ml: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <Link to="/"> <img src={logo} /></Link>
        </Typography>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="black"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuLink data={pages} styleObject={{ "color": 'black' }} />
          </Menu>
        </Box>
        {/* for mobile */}


        <Grid item md={3} xs={12} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box sx={{ flexGrow: 0 }}>
            <TextField size="small" label="" type='search' variant="outlined"
              sx={{
                "& fieldset": {
                  borderColor: "#e7e6e8 !important",
                  borderRadius: 0,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: '1px solid #e7e6e8 !important'
                },
              }}
            />
            <Button variant="contained" size="large" sx={{ ...themeStyles.headerSearchInputBtn }}> <SearchIcon /></Button>
          </Box>
        </Grid>

      </Grid>
    </AppBar>
  );
}
export default Navbar;