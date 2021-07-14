import { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import UserContext from '../../store/firebase-authUser';
import classes from './Navbar.module.css';
import img from '../../assets/profile.jpg'
import firebase from '../../utils/firebase'
const Navbar = (props) => {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState(false);

    const onSearchUser = async (event) => {
    
    if(event.target.value.length>0) {
        console.log("ncdnck")
        if(!search) {
            console.log("ok")
            setSearch(true)

            
        }
        
        let users = firebase.firestore().collection('users').orderBy("name")
        try{
            let queryText = event.target.value.toLowerCase()
            const snapshot = await users.where('name', '>=', queryText).where('name', '<=', queryText+ '\uf8ff').get();
            if(snapshot.empty) {
                console.log("EMplty")
            }
            let temp = []
            snapshot.forEach(doc => {
                let t = doc.data()
                temp.push(<li key={t.uid}><span className={classes.searchUser}><img src={t.profileImg} alt="profile"/></span><p><span onClick={goToProfileHandler} id={t.uid} className={classes.bold}>{t.name}</span></p></li>
                )
              });
              setUsers(temp)
        } catch(er) {
            console.log(er)
        }
        
    } else {
        setSearch(false)
    }
    
}
const goToProfileHandler = (event) => {
    setSearch(false)
    history.push(`/${event.target.id}`)
}

const userCtx = useContext(UserContext);
    // console.log("navbar ", userCtx.currentUser)
    let uid = ''
    if(userCtx.currentUser) {
        uid=userCtx.currentUser.uid
    }

    return(
        <nav className={classes.navbar}>
            <div className={classes.logo}>Instagram</div>
            <div className={classes.search}><input onChange={onSearchUser} className={classes.input} placeholder="&#xf002; Search"/>
                {search&&<div className={classes.results}>
                    <ul>
                    {users.length>0&&users}
                    {users.length===0&&<h6 className={classes.noUsers}>No search users</h6>}
                        
                    </ul>
                </div>}
            </div>

            <ul className={classes['navbar-iconlist']}>
                <li className={classes['navbar-icon']}>
                    <NavLink activeClassName={classes.active} to='/feed' className={classes['navbar-icon-link']}><i className="fas fa-home"></i></NavLink>
                </li>

                {/* <li className={classes['navbar-icon']}>
                    <NavLink activeClassName={classes.active}  to='/notifs' className={classes['navbar-icon-link']}><i className="fas fa-heart"></i></NavLink>
                </li> */}

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