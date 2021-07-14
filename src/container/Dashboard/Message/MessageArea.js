import classes from './Message.module.css'
import {  useContext, useEffect, useState } from 'react';
import firebase from '../../../utils/firebase';
import UserContext from '../../../store/firebase-authUser';

const MessageArea = (props) => {
    const [message, setMessage] = useState([])
    const userCtx = useContext(UserContext);
    const uid = userCtx.currentUser.uid
    

    useEffect(()=>{
        console.log(props.secretKey)
        const sub = firebase.firestore().collection('messages').where('secretKey','==',props.secretKey).orderBy('timesnap').limit(50).onSnapshot(snapshot => {
            const t = snapshot.docs.map(doc => doc.data())
            console.log("Messages")
            console.log(t)
            setMessage(t.map((obj)=> <div  key={obj.timesnap}  className={obj.sender===uid?`${classes.user}`:`${classes.sender}`}><p>{obj.message}</p></div>))
        })
        // props.r.current.scrollIntoView({ behavior: 'smooth' })
        return () => {
            sub();
        }
    },[props.secretKey, uid])
    
    return(<>{message}</>);
}


export default MessageArea;