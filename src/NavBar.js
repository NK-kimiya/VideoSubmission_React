import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FaYoutube } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <FaYoutube />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Youtube App
        </Typography>
        <IconButton color="inherit" aria-label="logout">
          <FiLogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;