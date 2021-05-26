import classes from './Profile.module.css';
import UserContext from '../../../store/firebase-authUser';
import {useContext} from 'react'

const Profile = (props) => {

const userCtx = useContext(UserContext);
// console.log(userCtx.currentUser)
const logouthandler = () => {
    userCtx.logout()
}

return(
    <div className={classes.container}>
         <p>Log out Boi <button onClick={logouthandler}>Logout</button></p>
    </div>
   
);
}


export default Profile;