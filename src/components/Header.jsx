import * as React from 'react';

import { useHistory, Link } from "react-router-dom";
import { useContext} from 'react'
import { AuthContext } from '../App'
import { signOut } from "../api/auth";
import Cookies from "js-cookie";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const history = useHistory()

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const res = await signOut();
      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/")
        console.log("succeeded in signed out")
      } else {
        console.log("Failed tin sign out")
      }
    } catch(err) {
      console.log(err)
    }
  }

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

          {isSignedIn ? (
            <>
             <Button sx={{color: '#fff'}}>{currentUser.nickname}</Button>
             <Button sx={{color: '#fff'}} onClick={handleSignOut}>LogOut</Button>
             <Button sx={{color: '#fff'}} component={Link} to="/calendars">Calendar</Button>
            </>
          ) : (
            <>
            <Button component={Link} to="/signin">Login</Button>
            <Button component={Link} to="/signup">Signup</Button>
            </>
            )}
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}