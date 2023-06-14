import { useContext} from 'react'
import { AuthContext } from '../App'
import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton  from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';

export const User = () => {
  const { currentUser } = useContext(AuthContext)

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
        <Button size="small">Edit</Button>
      </List>
    </div>
    </>
  )
}