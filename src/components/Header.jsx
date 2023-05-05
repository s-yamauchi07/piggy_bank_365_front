import { NavLink} from "react-router-dom";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <MenuIcon />
          </IconButton>
            <NavLink to="/signin">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/">Name</NavLink>
            <NavLink to="/">LogOut</NavLink>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}