// import classes from './Dashboard.module.css';
import { useEffect} from 'react'
// import UserContext from '../../store/firebase-authUser';
import firebase from '../../utils/firebase';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Dashboard.module.css';
import Profile from './Profile/Profile'
import Message from './Message/Message'
import Feed from './Feed/Feed'
import Notif from './Notif/Notif'
import {  Switch, Route, Redirect } from 'react-router-dom';




const Dashboard = (props) => {
// const userCtx = useContext(UserContext);

// const logouthandler = () => {
//     userCtx.logout()
// }



return(
    <>
    <Navbar />
    <main className={classes.container}>
        <Switch>
            <Route path="/" exact>
                <Redirect to="/feed"/>
            </Route>
        <Route path="/feed" exact component={Feed}/>
            <Route path="/messages" exact component={Message}/>
            <Route path="/notifs" exact component={Notif}/>
            
            <Route path="/:id" component={Profile}/>
            
            
        </Switch>
        
    </main>
    
    </>
)
}


export default Dashboard;