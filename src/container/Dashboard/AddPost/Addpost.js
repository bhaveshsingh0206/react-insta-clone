import { useContext, useState } from 'react';
import classes from './AddPost.module.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../utils/firebase';
import UserContext from '../../../store/firebase-authUser';

const AddPost = (props) => {
    const [image, setImage] = useState('');
    const [actualImage, setActualImage] = useState('');
    const [caption, setCaption] = useState('');
    const userCtx = useContext(UserContext)
    
    async function addPost() {
        console.log('Adding post......')
        let storageRef = firebase.storage().ref();

        storageRef = storageRef.child(`posts/${new Date().getTime()}/post.jpg`)
        try{
            storageRef.put(actualImage).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // console.log(userCtx.currentUser.uid)
                    let postId = uuidv4()
                    let userRef = firebase.firestore().collection('users').doc(userCtx.currentUser.uid)
                    let obj = {
                        imageUrl:downloadURL,
                        caption:caption,
                        likes:[],
                        userid: userRef,
                        comments:[],
                        time: new Date().getTime(),
                        }
    
                    const db = firebase.firestore().collection('posts').doc(postId)
                    
                    // console.log(obj)
                    db.set(obj).then(()=>{
                        let postRef = db
                        console.log("Post succesful")
                        userRef.update({
                            
                            posts: firebase.firestore().FieldValue.arrayUnion(postRef)
                        }).then(()=>{
                            console.log("Done")
                        }).catch(()=>{
                            console.log('Error')
                        })
                        
                    }).catch((e)=>{
                        console.log("errro")
                        console.log(e)
                    })
                })
              }).catch((eerror)=>{
                console.log(eerror)
              })
        } catch(error) {
            console.log(error)
        }   
        
        // console.log(res)
    }

    const addPostHandler = () => {
        // console.log('Add Posdedt')
        if(image===''||caption==='') {
            console.log("Enter Details");
            return
        }
        addPost()
        
    }

    const onCaptionHandler = (event) => {
        setCaption(event.target.value)
    }

    const onImageHandler = (event) => {
        console.log(event.target.files)
        setImage(URL.createObjectURL(event.target.files[0]))
        setActualImage(event.target.files[0])

   
    }
    return(
        <div className={classes.container}>
            <h4>Create post</h4>
            <div className={classes.card}>
                <textarea onChange={onCaptionHandler} value={caption} className={classes.postText} placeholder="What's on you mind?"/>
                {image.length>0&&<img className={classes.image} src={image} alt="images to post" />}
                <div className={classes.photoControls}>
                    <span>Add Photo</span>
                    <input accept="image/png, image/jpeg" onChange={onImageHandler} type="file" id="myfile" name="myfile" />
                    <label className={classes.photoPicker} htmlFor="myfile">
                        <span><i className="fas fa-photo-video" /></span>
                    </label>
                </div>
                
                <button onClick={addPostHandler} disabled={image.length===0?true:false} className={classes.btn} >POST</button>
            </div>
            
        </div>
    );
}


export default AddPost;