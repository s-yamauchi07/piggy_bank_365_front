import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { signUp } from "../api/auth";
import { AuthContext } from "../App";

//レイアウトを決めるライブラリ
import TextField from "@material-ui/core/TextField"
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';



export const SignUp = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const generateParams = () => {
    const signUpParams = {
      nickname: nickname,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,

    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    //params内にgenarateParams関数の戻り値を代入。
    const params = generateParams();
    try {
      //api/auth内のsignUp関数を呼び出す。
      const res = await signUp(params);
      if (res.status === 200) {
        // ログインに成功した場合は、Cookieに各値を格納。
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/amounts")
      }
    } catch (e) {
      console.log(e.response.data.errors.fullMessages)
      if (e.response.data.errors) {
        setErrors(e.response.data.errors.fullMessages);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Card variant="outlined" className="card-wrapper">
        <CardHeader title="Sign Up" />
        <CardContent>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Nickname"
            value={nickname}
            margin="dense"
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email"
            value={email}
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password"
            value={password}
            margin="dense"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="PasswordConfirmation"
            value={passwordConfirmation}
            margin="dense"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="default"
            disabled={!nickname || !email || !password || !passwordConfirmation ? true: false}
            onClick={handleSignUpSubmit}
          >
            submit
          </Button>
          <div style={{height: '20px'}} /> 
        </CardContent>

          {errors.length > 0 ? (
          <Stack>
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li> 
            ))}
            </ul>
            </Alert>
          </Stack>  
        ) : null}
      </Card>
      {/* 情報が不足している場合はアラート表示する */}
    </>
  )
} 