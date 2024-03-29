import Cookies from "js-cookie";
import { useState, useContext} from "react";
import { useHistory, NavLink } from "react-router-dom";
import { signIn } from "../api/auth";
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

import '../user_registration.css';

export const SignIn = () => {
  const  {setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    
    try {
      const res = await signIn(params);
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
      if (e.response.data.errors) {
        setErrors(e.response.data.errors);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Card variant="outlined" className="card-wrapper">
        <CardHeader title="Sign In" />
        <CardContent>
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
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="default"
            disabled={!email || !password ? true: false}
            onClick={handleSignInSubmit}
          >
            submit
          </Button>
          <NavLink to="/signup">To signup</NavLink>
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
      
    </>
  )
} 