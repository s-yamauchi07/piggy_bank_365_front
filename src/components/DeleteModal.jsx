import * as React from 'react';
import Cookies from "js-cookie";
import { useContext,useState } from "react";
import { AuthContext } from "../App";
import { deleteUser } from "../api/auth";
import { useHistory} from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMediaQuery } from 'react-responsive';
import { Block } from '@material-ui/icons';

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

export const DeleteModal = ({handleClose,open}) => {
  const { setIsSignedIn, setCurrentUser }= useContext(AuthContext);
  // ユーザー編集用のparamsを作る
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });


  const history = useHistory();

  if (isMobile) {
    style.width = '70%';
  }

  const handleDeleteUser = async(e) => {
    e.preventDefault();

    try {
      //api/auth内のdeleteUser関数を呼び出す。
      const res = await deleteUser();
      if (res.status === 200) {
        //ユーザー削除して、トップページへ遷移させる
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"])
        
        setIsSignedIn(false);
        
        history.push('/')
      }
    } catch (e) {
      console.log(e.response.data.errors.fullMessages)
      if (e.response.data.errors) {
        setErrors(e.response.data.errors.fullMessages);
      } else {
        console.log(e);
      }
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Profile
          </Typography>
          <p>本当に退会しますか？<br></br>
             退会する場合は、passwordを入力してください。
          </p>
          <TextField
          id="standard-helperText"
          label="password"
          type="password"
          helperText="*required"
          variant="standard"
          margin="dense"
          style={{width: '80%'}}
          onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
          id="standard-helperText"
          label="password confirmation"
          type="password"
          helperText="*required"
          variant="standard"
          margin="dense"
          style={{width: '80%'}}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button variant="outlined" color="error"  style={{display: 'block'}} onClick={handleDeleteUser}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
}