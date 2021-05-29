import classes from './Profile.module.css';
import UserContext from '../../../store/firebase-authUser';
import {useContext, useEffect, useState} from 'react'
import firebase from '../../../utils/firebase'
import {useParams} from 'react-router-dom';
import PostsThumbnail from './PostsThumbnail';
import placeholder from '../../../assets/placeholder.jpeg'

const Profile = (props) => {

    const userCtx = useContext(UserContext);

    const { id } = useParams();
    const uid = userCtx.currentUser.uid
    const [error, setError] = useState(false)
    

    const [userData, setUserData] = useState({name:'', posts:[], email:'', followers:[], followings:[], posts:[]});


    const logouthandler = () => {
        userCtx.logout()
    }



    useEffect(()=>{
        async function getData() {
            const db = firebase.firestore()
            const ref = db.collection('users').doc(id)
            try{
                let data = await ref.get()
                data = data.data()
                console.log(data)
                if(!data) {
                    setError(true)
                } else {
                    let posts = [];
                   
                    for (const post of data.posts) {
                        let postData = await post.get()
                        
                        postData = postData.data()
                        posts.push(postData)
                      }


                    data.posts = posts
                    setUserData(data)
                    setError(false)
                }
                

            } catch(error) {
                setError(true)
                console.log(error)
            }
            
            // console.log(data)

            // let followingData = await data.followings[0].get()
            // console.log(followingData.data())
        }   

        getData()
    }, [id])

    return(
        <div className={classes.container}>
            {!error&&<>
            <div className={classes.basic}>
                <div className={classes.img}>
                    <img src={placeholder} alt='Profile pic' />
                </div>

                <div className={classes['info']}>
                    <p className={classes.name}>{userData.name}</p>
                    <p className={classes.email}>{userData.email}</p>
                    <p className={classes.details}><span>{userData.posts.length}</span> posts <span>{userData.followings.length}</span> followings <span>{userData.followers.length}</span> followers</p>
                    {id===uid&&<button className={classes.btn} onClick={logouthandler}>Logout</button>}
                    
                </div>
            </div>

            <PostsThumbnail posts={userData.posts} />
            </>}
            {error&&<h2>No such Page Found</h2>}
        </div>
    
    );
}


export default Profile;