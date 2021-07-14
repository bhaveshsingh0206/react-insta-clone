import classes from './Feed.module.css';
import Card from './Card';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../store/firebase-authUser';
import firebase from '../../../utils/firebase';
import Post from '../Posts/Post';
const Feed = (props) => {
    const [posts, setPost] = useState([]);
    const [postData, setPostData] = useState([]);
    const userCtx = useContext(UserContext);
    const uid = userCtx.currentUser.uid
    const [showModal, setModal] = useState(false)
    const [postsDetails, setPostDetails] = useState(null)

    const dismissHandler = () => {
        setModal(false)
    }
    
    // useEffect(()=>{
    //     console.log("I'm Changing acche se ", postData)
    // }, [postData])

    async function expandPosthandler(_, p){
        let postsDetail = p
        console.log(postsDetail)
        // console.log(postData)
        // console.log(" okokoko ", id)
        // console.log(postData)
        try{
        // let postsDetail = postData.filter((post)=>{
        //     return post.id===id
        // })
        // postsDetail = postsDetail[0]
        // console.log(postsDetail)
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
            
            setModal(true)
        }, 500)
        
        } catch(e){
            console.log(e)
        }
        
    }

    useEffect(async ()=>{
        const db = firebase.firestore()
        if(uid) {
            console.log("kokoko")
            let ref = db.collection('users').doc(uid)
        try{
            let data = await ref.get()
            data = data.data()
            let followings = data.followings
            console.log(followings)
            
            if(followings.length>0) {
                let temp = await db.collection('posts').where('userid','in', followings).orderBy('time', 'desc').get()
            // let dat = await ref.get()
            let post = temp.docs.map((d)=>{
                return d.data()
            })
            
            let t =[]
            for(const p of post) {
                let user =  await p.userid.get()
                user = user.data()
                t.push(<Card key={p.id} post={p} postId={p.id} click={expandPosthandler} email={p.email} img={p.imageUrl} userid={user.uid} profileImg={user.profileImg} name={user.name} date={p.time} caption={p.caption}/>)
            }
            setPostData(post)
            setPost(t)
            
            } 
            

            
            // const t = post.map((p)=>{
                
                // return "He"
            // })
            
        } catch(e) {
            console.log(e)
        }
        }

    }, [uid, showModal])

    return (<>
    {showModal&&<Post data={postsDetails} dismiss={dismissHandler} />}
    <div className={classes.container}>
        {posts.length==0&&<p className={classes.no}>No post available</p>}
        {posts.length>0&&posts}

    </div></>)
}


export default Feed;