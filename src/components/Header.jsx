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
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

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
        <Toolbar style={{display:'flex', justifyContent: 'space-between'}}>
          <Link
            style={{
              display: 'flex',
              alignItems:'center',
              color:'#fff',
              textDecoration:'none'
            }}
            to="/"
          >
            <SavingsOutlinedIcon fontSize="large"/>
            <h2>PIGGY BANK 365</h2>
          </Link>

          {isSignedIn ? (
            <>
            <div>
              <Button sx={{color: '#fff'}} size="large">{currentUser.nickname}</Button>
              <Button sx={{color: '#fff'}} size="large" onClick={handleSignOut}>LogOut</Button>
              <Button sx={{color: '#fff'}} size="large" component={Link} to="/calendars">Calendar</Button>
            </div>
            </>
          ) : (
            <>
            <div>
              <Button sx={{color: '#fff'}} size="large" component={Link} to="/signin">Login</Button>
              <Button sx={{color: '#fff'}} size="large" component={Link} to="/signup">Signup</Button>
            </div>
            </>
            )}
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}