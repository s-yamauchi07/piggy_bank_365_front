import * as React from 'react';
import { ShowDate } from './ShowDate'
import { useState} from "react";
import { useContext} from 'react'
import { AuthContext } from '../App'
import { EditModal } from './EditModal'
import { DeleteModal } from './DeleteModal'

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

  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);
  
  return(
    <>
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 'calc(100vh - 138px)',
    }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'F7F1E5',boxShadow: 3 }}>
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
        
        <Button size="small" onClick={handleEditOpen}>Edit</Button>
        { editOpen && <EditModal handleClose={handleEditClose} open={editOpen} userInfo={currentUser}/> }

        <Button size="small" onClick={handleDeleteOpen}>Delete</Button>
        { deleteOpen && <DeleteModal handleClose={handleDeleteClose} open={deleteOpen} userInfo={currentUser}/> }
      </List>
      <ShowDate />
    </div>
    </>
  )
}


