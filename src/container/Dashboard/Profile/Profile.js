import classes from './Profile.module.css';
import UserContext from '../../../store/firebase-authUser';
import {useContext, useEffect, useState} from 'react'
import firebase from '../../../utils/firebase'
import {useParams} from 'react-router-dom';
import PostsThumbnail from './PostsThumbnail';
import placeholder from '../../../assets/placeholder.jpeg'
import Post from '../Posts/Post';

const Profile = (props) => {

    const userCtx = useContext(UserContext);
    
    const [image, setImage] = useState('')

    const { id } = useParams();
    const uid = userCtx.currentUser.uid
    const [error, setError] = useState(false)
    

    const [userData, setUserData] = useState(null);
    const [showModal, setModal] = useState(false)
    const [postsDetails, setPostDetails] = useState(null)
    const logouthandler = () => {
        userCtx.logout()
    }

    useEffect(()=>{
        console.log("userData ", userData)
    }, [userData])


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

                    setImage(data.profileImg)
                    data.posts = posts
                    setUserData(data)
                    setError(false)
                }
                

            } catch(error) {
                setError(true)
                console.log(error)
            }
        }   

        getData()
    }, [showModal, id])

    const changeProfileHandler = (event) => {
        
        setImage(URL.createObjectURL(event.target.files[0]))
        let storageRef = firebase.storage().ref();

        storageRef = storageRef.child(`users/${new Date().getTime()}/profileImg.jpg`)
        try{
            storageRef.put(event.target.files[0]).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    let userRef = firebase.firestore().collection('users').doc(uid)

                    await userRef.update({profileImg: downloadURL})
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    async function expandPosthandler(id){

        console.log("idddd===== ", id)

        try{
        let postsDetail = userData.posts.filter((post)=>{
            return post.id===id
        })

        postsDetail = postsDetail[0]
        console.log(postsDetail)
        let obj = {
            postid: postsDetail.id,
            postImage: postsDetail.imageUrl,
            likes:postsDetail.likes,
            time:postsDetail.time,
            caption:postsDetail.caption,
            userid:postsDetail.userid
        }
        
        let userDetails = await postsDetail.userid.get()
        userDetails = userDetails.data()
        // console.log("userDetails ", userDetails)
        obj.name=userDetails.name
        obj.profileImg=userDetails.profileImg

        let comments = [];
        const isLiked = postsDetail.likes.find((id)=>{
            return uid === id
        })
        obj.isLiked = isLiked?true:false            
        for (const comment of postsDetail.comments) {
            let o = {}
            let details = await comment.user.get()
            details = details.data()

            o.comment = comment.comment
            o.uid=  details.uid
            o.name=  details.name
            o.profileImg=  details.profileImg

            comments.push(o);
        }
        
        obj.comments = comments
        setPostDetails(obj)
        
        setTimeout(()=>{
            console.log("--------------")
            console.log(postsDetail)
            setModal(true)
        }, 500)
        
        } catch(e){
            console.log(e)
        }
        
    }

    const dismissHandler = () => {
        setModal(false)
    }

    return(
        <>
         {showModal&&<Post data={postsDetails} dismiss={dismissHandler} />}
        <div className={classes.container}>
            {!error&&userData&&<>
            <div className={classes.basic}>
                <div className={classes.img}>
                    <img src={image.length===0?placeholder:image} alt='Profile pic' />
                    {id===uid&&<><label htmlFor="profile" className={classes.label}></label>
                    <input onChange={changeProfileHandler} id="profile" type="file" /></>}
                </div>

                <div className={classes['info']}>
                    <p className={classes.name}>{userData.name}</p>
                    <p className={classes.email}>{userData.email}</p>
                    <p className={classes.details}><span>{userData.posts.length}</span> posts <span>{userData.followings.length}</span> followings <span>{userData.followers.length}</span> followers</p>
                    {id===uid&&<button className={classes.btn} onClick={logouthandler}>Logout</button>}
                    
                </div>
            </div>

            <PostsThumbnail expand={expandPosthandler} posts={userData.posts} />
            
            </>}
            {error&&<h2>No such Page Found</h2>}
        </div>
       
        </>
    );
}


export default Profile;