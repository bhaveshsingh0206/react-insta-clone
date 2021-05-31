// import { useState } from 'react';
// import { useHistory } from 'react-router';
import classes from './PostsThumbnail.module.css';

const PostsThumbnail = (props) => {
    
    const postHandler = (event,id) => {
        console.log(id)
        console.log("idddd===== in thumb", id)

        props.expand(id)
    }

    const posts = props.posts.map((post)=>{
        return (
            <div onClick={(event)=>{postHandler(event, post.id)}} id={post.id} key={post.id} className={classes.grid}>
            <img src={post.imageUrl} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> {post.likes.length}</span>
                    <span><i className="fas fa-comment" /> {post.comments.length}</span>
                </div>
            </div>
        </div>
        )
    });

    return(
    <div className={classes.posts}>
        {posts.length>0&&posts}
        {posts.length===0&&<h1 className={classes.nodata}>No posts</h1>}
    </div>);
}


export default PostsThumbnail;