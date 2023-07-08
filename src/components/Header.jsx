import * as React from 'react';

import { useHistory, Link } from "react-router-dom";
import { useContext} from 'react'
import { AuthContext } from '../App'
import { signOut } from "../api/auth";
import Cookies from "js-cookie";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { useMediaQuery } from 'react-responsive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';


export const Header = () => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
        <Toolbar style={{display:'flex', justifyContent: 'space-between', backgroundColor: '#1976d2', color:''}}>
          <Link
            style={{
              display: 'flex',
              alignItems:'center',
              color:'#fff',
              textDecoration:'none',
              fontFamily:"Moirai One, cursive"
            }}
            to="/"
          >
            <SavingsOutlinedIcon fontSize="large" />
            <h2 className="app-title">PIGGY BANK 365</h2>
          </Link>

          {isSignedIn ? (
            <>
            <div className="header-menu">
              {isMobile ? (
                <>
                  <IconButton sx={{ color: '#fff' }} size="large" component={Link} to={`/user/${currentUser.id}`}>
                    <AccountCircleIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#fff' }} size="large" component={Link} to="/amounts">
                    <HomeIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#fff' }} size="large" onClick={handleSignOut}>
                    <LogoutIcon />
                  </IconButton>
                </>
              ): (
                <>
                  <Button sx={{color: '#fff'}} size="large" component={Link} to={`/user/${currentUser.id}`}>{currentUser.nickname}</Button>
                  <Button sx={{color: '#fff'}} size="large" component={Link} to={"/amounts"}>Top</Button>
                  <Button sx={{color: '#fff'}} size="large" onClick={handleSignOut}>LogOut</Button>
                </>
              )}
            </div>
            </>
          ) : (
            <>
            <div className="header-menu">
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