// import classes from './Dashboard.module.css';
import {useContext} from 'react'
import AuthContext from '../../store/authCtx';

const Dashboard = (props) => {
const authCtx = useContext(AuthContext);
const logouthandler = () => {
    authCtx.logout()
}
return(
    <p>Log out Boi <button onClick={logouthandler}>Logout</button></p>
)
}


export default Dashboard;