import classes from './Post.module.css';
import ReactDOM from 'react-dom';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import firebase from '../../../utils/firebase'
import UserContext from '../../../store/firebase-authUser';
const Modal = (props) => {
    const postDetails = props.data
    const history = useHistory();
    const userCtx = useContext(UserContext)
    const [comment, setComment] = useState('')
    const [isLiked, setIsLiked] = useState(postDetails.isLiked)
    const [likes, setLikes] = useState(postDetails.likes.length)
    // console.log("postDetails ", postDetails)


    const goToProfileHandler = (event) => {
        history.push(`/${event.target.id}`)
        props.dismissHandler()
    }

    const commentHandler = (event) => {
        setComment(event.target.value)
    }

    async function addCommentHandler() {
        if(comment==='') {
            console.log('add comment')
            return 
        }
        let db = firebase.firestore().collection('posts').doc(postDetails.postid)
        let userRef = firebase.firestore().collection('users').doc(userCtx.currentUser.uid)
        let obj = {
            comment:comment,
            user:userRef
        }
        try{
            const res = await db.update({         
                comments: firebase.firestore.FieldValue.arrayUnion(obj)
            })
            console.log(res)
            let user = await userRef.get()
            user = user.data()
            obj = <li key={Math.random()}><span className={classes.commentUser}><img src={user.profileImg} alt="profile"/></span><p><span onClick={goToProfileHandler} id={user.uid} className={classes.bold}>{user.name}</span> {comment}</p></li>
            setComments((prev)=>{
                return [...prev, obj]
            })
            setComment('')
        } catch(e) {
            console.log(e)
        }
    }

    async function likeHandler() {
        

        
        let db = firebase.firestore().collection('posts').doc(postDetails.postid)
        let uid = userCtx.currentUser.uid
        try{
            if(isLiked) {
                await db.update({
                    likes: firebase.firestore.FieldValue.arrayRemove(uid)
                })
            } else {
                await db.update({
                    likes: firebase.firestore.FieldValue.arrayUnion(uid)
                })
            }
            setLikes((prev)=>{
                return isLiked?prev-1:prev+1
            })
            
            await setIsLiked((prev)=>{
                return !prev
            })
        } catch(e){
            console.log(e)
        }
        
       
        

    }

    const [comments, setComments] = useState([<li key={Math.random()}><span className={classes.commentUser}><img alt="profile" src={postDetails.profileImg} /></span><p><span className={classes.bold}>{postDetails.name}</span>{postDetails.caption}</p></li>])
    // let comments = [<li><span className={classes.commentUser}><img alt="profile" src={postDetails.profileImg} /></span><p><span className={classes.bold}>{postDetails.name}</span>{postDetails.caption}</p></li>]
    
    useEffect(()=>{
        const data = postDetails.comments.map((comment, i)=>{
            return <li key={i}><span className={classes.commentUser}><img src={comment.profileImg} alt="profile"/></span><p><span onClick={goToProfileHandler} id={comment.uid} className={classes.bold}>{comment.name}</span> {comment.comment}</p></li>
    
        })

        setComments((prev)=>{
            return [...prev, ...data]
        })
    },[postDetails.comments])

    // const data = postDetails.comments.map((comment, i)=>{
    //     return <li key={i}><span className={classes.commentUser}><img src={comment.profileImg} alt="profile"/></span><p><span onClick={goToProfileHandler} id={comment.uid} className={classes.bold}>{comment.name}</span> {comment.comment}</p></li>

    // })
    // comments.push(...data);
    let date = new Date(postDetails.time)
    var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    date = date.getDate() + ' '+months_arr[date.getMonth()]+', ' + date.getFullYear()
    
    // let c = 'fas fa-heart ';

    // if(isLiked) {
    //     c += classes.red
    // }

             
    return(
    <>
        <div onClick={props.dismissHandler} className={classes.backdrop}></div>
        <div className={classes.post}>
            <div className={classes.left}>
                <img alt="profile" src={postDetails.postImage} />
            </div>
            <div className={classes.right}>
                <div className={classes.user}>
                    <div className={classes.img}><img alt="profile" src={postDetails.profileImg} /></div>
                    <h3>{postDetails.name}</h3>
                </div>
                <div className={classes.comments}>
                    <ul>
                        {comments}
                    </ul>
                    
                </div>
                <div className={classes.likes}>
                    <h4>{likes} likes</h4>
                    <h6>{date}</h6>
                    <span onClick={likeHandler} className={classes.icon}><i className={`fas fa-heart ${isLiked?classes.red:''}`}></i></span>
                </div>
                <div className={classes.add}>
                    <input value={comment} onChange={commentHandler} placeholder="Add a Comment.." />
                    <button onClick={addCommentHandler}>POST</button>
                </div>
            </div>
        </div>
        <div onClick={props.dismissHandler} className={classes.close}><i className="fas fa-times"></i></div>
    </>)
}

const Post = (props) => {
return(
    <>
    {ReactDOM.createPortal(<Modal data={props.data} dismissHandler={props.dismiss} />, document.getElementById("modal"))}
    </>
);
}


export default Post;