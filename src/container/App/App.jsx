import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Components
import HomseScreen from "../HomeScreen/HomeScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
//CSS
import "./App.css";
//Firebase
import { auth } from "../../firebase";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../store/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( userAuth =>  {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
      } else {
        dispatch(logout());
      }    
    });
    return unsubscribe;
  }, [dispatch])

    return (
        <div className="app">
        <Router>
          {!user ? (
            <LoginScreen/>
          ) : (
          <Switch>
            <Route path="/profile"><ProfileScreen/></Route>
            <Route exact path="/"><HomseScreen/></Route>
          </Switch>
          )}
          </Router>
        </div>
    );
}

export default App;
