import classes from './Profile.module.css';
import UserContext from '../../../store/firebase-authUser';
import {useContext, useEffect, useState} from 'react'
import firebase from '../../../utils/firebase'
import {useParams} from 'react-router-dom';
import image from '../../../assets/profile.jpg'
import PostsThumbnail from './PostsThumbnail';


const Profile = (props) => {

    const userCtx = useContext(UserContext);

    const { id } = useParams();
    // console.log("uid ", id)
    const [userData, setUserData] = useState({name:'', posts:[], email:'', followers:[], followings:[]});


    const logouthandler = () => {
        userCtx.logout()
    }

    useEffect(()=>{
        console.log(userData)
    }, [userData])

    useEffect(()=>{
        async function getData() {
            const db = firebase.firestore()
            const ref = db.collection('users').doc(id)
            let data = await ref.get()
            data = data.data()
            setUserData(data)
            // console.log(data)

            // let followingData = await data.followings[0].get()
            // console.log(followingData.data())
        }   

        getData()
    }, [id])

    return(
        <div className={classes.container}>
            <div className={classes.basic}>
                <div className={classes.img}>
                    <img src={image} alt='Profile pic' />
                </div>

                <div className={classes['info']}>
                    <p className={classes.name}>{userData.name}</p>
                    <p className={classes.email}>{userData.email}</p>
                    <p className={classes.details}><span>{userData.posts.length}</span> posts <span>{userData.followings.length}</span> followings <span>{userData.followers.length}</span> followers</p>
                    <button className={classes.btn} onClick={logouthandler}>Logout</button>
                    
                </div>
            </div>

            <PostsThumbnail />
        </div>
    
    );
}


export default Profile;