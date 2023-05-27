import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Tooltip, IconButton, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

function AvatarMenu() {

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector(state => state.auth.user);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const closeMenu = () => {
    setAnchorEl(null);
  }
  const logout = () => {
    dispatch( signOut() );
    closeMenu();
  }

  return (
    <Box>
      <Tooltip title="Open Settings">
        <IconButton onClick={openMenu}>
          <Avatar alt={user.name} src={process.env.REACT_APP_URL + `content/${user._id}/${user.profile_picture}`} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem component={Link} to="/admin/profile" onClick={closeMenu}>
          <Typography textAlign="center">Profile Settings</Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography textAlign="center">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default AvatarMenu