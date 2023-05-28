import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';
import ListIcon from "@mui/icons-material/List";
import { AddCircleOutline, PeopleOutline } from "@mui/icons-material";
import { LinearProgress } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import { connect } from 'react-redux';
import SimpleSnackbar from '../library/SnackBar';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AvatarMenu from '../library/AvatarMenu';
import ListDropdown from '../library/ListDropdown';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const drodownsList = [
  {
    title: 'Categories',
    icon: <CategoryIcon />,
    items: [{ to: '/admin/categories/add', text: 'Add Category', icon: <AddCircleOutline /> }, { to: '/admin/categories/', text: 'Categories', icon: <Inventory2Icon /> }]
  },
  {
    title: 'Brands',
    icon: <CategoryIcon />,
    items: [{ to: '/admin/brands/add', text: 'Add Brand', icon: <AddCircleOutline /> }, { to: '/admin/brands/', text: 'Brands', icon: <Inventory2Icon /> }]
  },
  {
    title: 'Products',
    icon: <ListIcon />,
    items: [{ to: '/admin/products/add', text: 'Add Product', icon: <AddCircleOutline /> }, { to: '/admin/products', text: 'Products', icon: <Inventory2Icon /> }]
  },
  {
    title: 'Users',
    icon: <ListIcon />,
    items: [{ to: '/admin/users/add', text: 'Add user', icon: <AddCircleOutline /> }, { to: '/admin/users', text: 'Users', icon: <GroupIcon /> }]
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.12)",
    color: "#606060"
  },
  logo: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: 'space-between',
    color: '#606060'
  },
  progressContainer: {
    height: '4px',
    width: '100%'
  }
}));

function Sidebar({ progressBar, configuration }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: "var(--purple)", fontFamily: "var(--josefin)" }} open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5, color: "var(--pure-white)"
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {configuration.siteName}
            </Typography>
          </Box>
          <AvatarMenu />
        </Toolbar>
      </AppBar>


      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: 'center' }}>
          <Link to="/" target='_blank'>
          {theme.direction === 'rtl' ? <img style={{ maxWidth: '100%', height: 'auto'}} src={ process.env.REACT_APP_URL + `content/configuration/${configuration.logo}`} alt={configuration.siteName} /> : <img style={{ maxWidth: '100%', height: 'auto'}} src={ process.env.REACT_APP_URL + `content/configuration/${configuration.logo}`} alt={configuration.siteName} />}
          </Link>
        </DrawerHeader>
        <Divider />
        <List>
          <Link
            to="/admin/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={"dashboard"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="/admin/settings"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={"configuration"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuration" />
              </ListItemButton>
            </ListItem>
          </Link>
          {
            drodownsList.map((dropdown, index) => (
              <ListDropdown icon={dropdown.icon} title={dropdown.title} key={index} items={dropdown.items} />
            ))
          }

        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box className={classes.progressContainer}>
          {progressBar.loading && <LinearProgress />}
        </Box>
        <Outlet />
      </Box>
      <SimpleSnackbar />
    </Box>
  );
}


const mapStateToProps = state => {
  return {
    progressBar: state.progressBar,
    configuration: state.auth.configuration
  }
}

export default connect(mapStateToProps)(Sidebar);