import * as React from 'react';
import { ShowDate } from './ShowDate'
import { useState} from "react";
import { useContext} from 'react'
import { AuthContext } from '../App'
import { EditModal } from './EditModal'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const User = () => {
  const { currentUser } = useContext(AuthContext)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return(
    <>
    <div className="wrapper">
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nickname" secondary={currentUser.nickname} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={currentUser.uid} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HttpsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Password" secondary="*****" />
        </ListItem>
        <Button size="small" onClick={handleOpen}>Edit</Button>
        { open && <EditModal handleClose={handleClose} open={open} userInfo={currentUser}/> }
      </List>
      <ShowDate />
    </div>
    </>
  )
}


