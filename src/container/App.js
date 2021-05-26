// import classes from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import {useContext} from 'react'
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
// import UserContext from '../store/firebase-authUser';
import PrivateRoute from '../utils/PrivateRoute';


function App() {
  // const {currentUser} = useContext(UserContext);
  return (
    <Router>
      <Switch>
      {/* {!currentUser&&<Route path="/login" exact component={Login} />}
      {currentUser&&<Route path="/" exact component={Dashboard} />}
      <Route path="*"><Redirect to={currentUser?"/":"/login"}/></Route> */}
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/" component={Dashboard} />
      
      {/* <Route path="*">
        <Redirect to="/" />
      </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
