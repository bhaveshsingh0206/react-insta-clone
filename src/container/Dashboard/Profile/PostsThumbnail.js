import classes from './PostsThumbnail.module.css';
import image from '../../../assets/profile.jpg'

const PostsThumbnail = (props) => {

    const posts = props.posts.map((post)=>{
        return (
            <div className={classes.grid}>
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
        {posts}
    </div>);
}


export default PostsThumbnail;