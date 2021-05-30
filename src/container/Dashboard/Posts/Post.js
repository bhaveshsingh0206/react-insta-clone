import classes from './Post.module.css';
import ReactDOM from 'react-dom';
import Image from '../../../assets/profile.jpg'
import { useState } from 'react';
const Modal = (props) => {
    const postDetails = props.data
    console.log("postDetails ", postDetails)
    // const [dataLoaded, setDataLoaded] = useState(true)
    let comments = [<li><span className={classes.commentUser}><img src={postDetails.profileImg} /></span><span className={classes.bold}>{postDetails.name}</span> <span> {postDetails.caption}</span></li>]
    const data = postDetails.comments.map((comment)=>{
        return <li><span className={classes.commentUser}><img src={comment.profileImg} /></span><span id={comment.uid} className={classes.bold}>{comment.name}</span> <span>{comment.comment}</span></li>

    })

    let date = new Date(postDetails.time)
    var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    date = date.getDate() + ' '+months_arr[date.getMonth()]+', ' + date.getFullYear()
        comments.push(...data);
    let c = 'fas fa-heart ';
    if(postDetails.isLiked) {
        c += classes.red
    }
             
    return(
    <>
        <div onClick={props.dismissHandler} className={classes.backdrop}></div>
        <div className={classes.post}>
            <div className={classes.left}>
                <img src={postDetails.postImage} />
            </div>
            <div className={classes.right}>
                <div className={classes.user}>
                    <div className={classes.img}><img src={postDetails.profileImg} /></div>
                    <h3>{postDetails.name}</h3>
                </div>
                <div className={classes.comments}>
                    <ul>
                        {comments}
                    </ul>
                    
                </div>
                <div className={classes.likes}>
                    <h4>{postDetails.likes.length} likes</h4>
                    <h6>{date}</h6>
                    <span className={classes.icon}><i className={c}></i></span>
                </div>
                <div className={classes.add}>
                    <input placeholder="Add a Comment.." />
                    <button>POST</button>
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