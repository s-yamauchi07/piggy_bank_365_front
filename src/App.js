import { useState, useEffect, createContext} from 'react'
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import { Top } from './components/Top';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Header } from './components/Header';
import { ShowDate } from './components/ShowDate';
import { Footer } from './components/Footer';

import { getCurrentUser} from './api/auth';

export const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // 認証済み(登録)のユーザーがどうかをチェック。確認できた場合は、そのユーザー情報を取得。
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      // resオブジェクトがundefinedまたはnullでないこと
      // res.data.isLoginプロパティがtrueであることを満たせばif文が実行される。
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  //初回とsetCurrentUserの値に変化があったときにhandleGetCurrentUserを実行。
  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  //ユーザーが認証済みかどうかでルーティングを決定する。
  //未承認だった場合は、signinページへ遷移させる。
  const Private = ({children}) => {
    if(!loading) {
      if(isSignedIn) {
        return children;
      } else {
      return <Redirect to="signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
      <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
      >
        {/* ログイン時にはHomeコンポーネント、非ログイン時にはsignup,signinのページを表示させる。 */}
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Private>
            <Route path="/amounts">
              <Top />
            </Route>
            <Route path="/calendars">
              <ShowDate />
            </Route>
          </Private>
        </Switch>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
