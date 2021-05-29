import classes from './PostsThumbnail.module.css';
import image from '../../../assets/profile.jpg'

const PostsThumbnail = (props) => {
    return(
    <div className={classes.posts}>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
        <div className={classes.grid}>
            <img src={image} alt="post"/>
            <div className={classes.backdrop}>
                <div className={classes.info}>
                    <span><i className="fas fa-heart" /> 28</span>
                    <span><i className="fas fa-comment" /> 28</span>
                </div>
            </div>
        </div>
    </div>);
}


export default PostsThumbnail;