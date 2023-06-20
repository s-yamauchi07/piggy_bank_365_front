import * as React from 'react';
import Cookies from "js-cookie";
import { useContext,useState } from "react";
import { AuthContext } from "../App";
import { updateUser } from "../api/auth";
import { useHistory } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

export const EditModal = ({handleClose,open,userInfo}) => {
  const { setIsSignedIn, setCurrentUser }= useContext(AuthContext);
  // ユーザー編集用のparamsを作る
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [email, setEmail] = useState(userInfo.uid);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);


  const history = useHistory();

  const generateEditParams = () => {
    const UserEditParams = {
        nickname: nickname,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
    };
    return UserEditParams;
  };

  const handleEditUser = async(e) => {
    e.preventDefault();

    const params = generateEditParams();
    try {
      //api/auth内のupdateUser関数を呼び出す。
      const res = await updateUser(params);
      console.log(res)
      if (res.status === 200) {
        //ログインユーザーを更新して、/amountページへ遷移させる
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"])
        
        setIsSignedIn(true);
        const currentUser = setCurrentUser(res.data.data);
        

        history.push(`/users/${currentUser.id}`)
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
            Edit Profile
          </Typography>
          <TextField
          id="standard-helperText"
          label="Nickname"
          defaultValue={userInfo.nickname}
          helperText="*required"
          variant="standard"
          margin="dense"
          style={{width: '80%'}}
          onChange={(e) => setNickname(e.target.value)}
        />
          <TextField
          id="standard-helperText"
          label="Email"
          defaultValue={userInfo.uid}
          helperText="*required"
          variant="standard"
          margin="dense"
          style={{width: '80%'}}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          label="password_confirmation"
          type="password"
          helperText="*required"
          variant="standard"
          margin="dense"
          style={{width: '80%'}}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button style={{display: 'block'}} onClick={handleEditUser}>update</Button>
        </Box>
      </Modal>
    </div>
  );
}
