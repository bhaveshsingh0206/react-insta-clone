import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../store/firebase-authUser';
import classes from './Navbar.module.css';


const Navbar = (props) => {



const userCtx = useContext(UserContext);
    // console.log("navbar ", userCtx.currentUser)
    let uid = ''
    if(userCtx.currentUser) {
        uid=userCtx.currentUser.uid
    }
    return(
        <nav className={classes.navbar}>
            <div className={classes.logo}>Instagram</div>
            <div className={classes.search}><input className={classes.input} placeholder="&#xF002; Search"/></div>

            <ul className={classes['navbar-iconlist']}>
                <li className={classes['navbar-icon']}>
                    <NavLink activeClassName={classes.active} to='/feed' className={classes['navbar-icon-link']}><i className="fas fa-home"></i></NavLink>
                </li>

                <li className={classes['navbar-icon']}>
                    <NavLink activeClassName={classes.active}  to='/notifs' className={classes['navbar-icon-link']}><i className="fas fa-heart"></i></NavLink>
                </li>

                <li className={classes['navbar-icon']}>
                    <NavLink activeClassName={classes.active} to='/messages' className={classes['navbar-icon-link']}><i className="fab fa-facebook-messenger"></i></NavLink>
                </li>

                <li className={classes['navbar-icon']}>
                    <NavLink activeClassName={classes.active} to={`/${uid}`} className={classes['navbar-icon-link']}><i className="fas fa-user"></i></NavLink>
                </li>
            </ul>
        </nav>
    );
}


export default Navbar;