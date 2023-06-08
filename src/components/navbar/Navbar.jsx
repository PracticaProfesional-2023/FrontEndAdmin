import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import NavListDrawer from './NavListDrawer';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar({ navArrayLinks }) {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            edge="start"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon color="secondary" />
          </IconButton>

          <Typography
            to="/home"
            component={NavLink}
            onClick={handleClose}
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            HireJob
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                color="inherit"
              >
                <AccountCircle color="secondary" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  to="/infoUser"
                  component={NavLink}
                  onClick={handleClose}
                >
                  Perfil
                </MenuItem>
                <MenuItem to="/" component={NavLink} onClick={handleClose}>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: {
            xs: 'block',
            sm: 'block',
          },
        }}
      >
        <NavListDrawer
          setOpen={setOpen}
          navArrayLinks={navArrayLinks}
          NavLink={NavLink}
        />
      </Drawer>
    </>
  );
}

export default Navbar;
