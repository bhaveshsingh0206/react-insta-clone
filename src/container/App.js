// import classes from "./App.module.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {useContext} from 'react'
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import AuthContext from '../store/authCtx';


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        {!authCtx.isLoggedIn&&<Route path="/login" component={Login} />}
        {authCtx.isLoggedIn&&<Route path="/" component={Dashboard} exact/>}
        <Route path="*"><Redirect to={authCtx.isLoggedIn?"/":"/login"}/></Route>
      </Switch>
    </Router>
  );
}

export default App;
