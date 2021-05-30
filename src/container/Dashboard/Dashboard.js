// import classes from './Dashboard.module.css';
// import { useEffect} from 'react'
// import UserContext from '../../store/firebase-authUser';
// import firebase from '../../utils/firebase';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Dashboard.module.css';
import Profile from './Profile/Profile'
import Message from './Message/Message'
import Feed from './Feed/Feed'
import Notif from './Notif/Notif'
import AddPost from './Posts/AddPost/Addpost'
import {  Switch, Route, Redirect, useHistory } from 'react-router-dom';
// import Post from './Posts/Post';




const Dashboard = (props) => {
const history = useHistory()
const addPostHandler = () => {
    history.push('/addpost')
}


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
            <Route path="/addpost" exact component={AddPost}/>
            {/* <Route path="/p/d" exact component={Post}/> */}
            <Route path="/:id" component={Profile}/>
            
            
        </Switch>
        <div onClick={addPostHandler} className={classes.addPost}>
            <i className="fas fa-plus"></i>
        </div>
    </main>
    
    </>
)
}


export default Dashboard;