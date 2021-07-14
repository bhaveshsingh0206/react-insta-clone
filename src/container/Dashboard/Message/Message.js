import classes from './Message.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import firebase from '../../../utils/firebase';
import UserContext from '../../../store/firebase-authUser';
import { v4 as uuidv4 } from 'uuid';
import MessageArea from './MessageArea';


const Message = (props) => {

    const [showSendButton, setShowSendButton] = useState(false)
    const messageRef = useRef()
    const userCtx = useContext(UserContext);
    const uid = userCtx.currentUser.uid
    // const [message, setMessage] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({name:"",img:"", uid:"", secretKey:""})
    const [update, setUpdate] = useState(false)
    const divRef = useRef();

    useEffect(() => {
        if (divRef.current) {
          divRef.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            // console.log(":okokok")
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      })
  
   useEffect(()=>{
       console.log("selectedUser.secretKey ", selectedUser.secretKey)
    // firebase.firestore().collection('messages').where('secretKey','==',selectedUser.secretKey).orderBy('timesnap').limit(50).onSnapshot(snapshot => {
    //     const t = snapshot.docs.map(doc => doc.data())
    //     console.log("Messages")
    //     console.log(t)
    //     setMessage(t.map((obj)=> <div  key={obj.timesnap}  className={obj.sender===uid?`${classes.user}`:`${classes.sender}`}><p>{obj.message}</p></div>))
    // })
   }, selectedUser)

    const loadMessagesHandler = (_, id, name, img, secretKey) => {
        let obj = {
            name: name,
            img: img,
            uid:id,
            secretKey:secretKey
        }

        setSelectedUser(obj)
        setUpdate(true)
    }   
    

    useEffect(async ()=>{
        try{
            let ref = firebase.firestore().collection('users').doc(uid)
            let data = await ref.get()
            data = await data.data()
            let conversations = []
            

            for (const t of data.chats) {
                let i=t.userId
                ref = firebase.firestore().collection('users').doc(i.trim())
                let dat = await ref.get()
                dat = await dat.data()
                let obj = <li key={dat.uid} onClick={(event)=>{loadMessagesHandler(event, dat.uid, dat.name, dat.profileImg, t.secretKey)}}><span className={classes.imgContainer}><img  lt="okokokok" src={dat.profileImg}/></span>{dat.name}</li>

                conversations.push(obj)
            }

            setUsers(conversations)


            
        } catch(er){
            console.log(er)
        }
    }, [uid])

    const messageHandler = (event) => {
        if(event.target.value.length>0) {
            setShowSendButton(true)
        } else {
            setShowSendButton(false)
        }
    }

    const onKeyHandler = (e) => {
        if(messageRef.current.value.length>0&&e.charCode === 13) {
            sendMessage()
        }
    }

    const sendMessage = async () => {
        let mess = messageRef.current.value
        let u = uuidv4();
        let obj = <div key={u} className={classes.user}><p>{mess}</p></div>

        
        // setMessage((prev)=>{
        //     return [...prev, obj]
        // })
        messageRef.current.value = ""
        setShowSendButton(false)
        let db = firebase.firestore().collection('messages').doc(u)

        obj = {
            timesnap: firebase.firestore.FieldValue.serverTimestamp(),
            sender: uid,
            receiver: selectedUser.uid,
            message: mess,
            secretKey: selectedUser.secretKey
        }
        try{
            await db.set(obj)
        } catch(e) {
            console.log(e)
        }


        

    }

    return (<div className={classes.container}>
        <div className={classes.left}>
            {users.length===0&&<h5 className={classes.nodata}>No conversations</h5>}

            {users.length>0&&<ul>{users}</ul>}
        </div>
        {update&&<div className={classes.right}>
            <div className={classes.header}><span className={classes.imgContainer}><img alt="profileImage" src={selectedUser.img}/></span>{selectedUser.name}</div>
                <div ref={divRef} className={classes.okok}><MessageArea r={divRef} secretKey={selectedUser.secretKey}/></div>
                


            <div className={classes.sendMessage}>
                
                
                <input onKeyPress={onKeyHandler} onChange={messageHandler} ref={messageRef} placeholder="Enter Message" type="text" />
                {showSendButton&&<button onClick={sendMessage} className={classes.btn}>SEND</button>}
            </div>
        </div>}
        {!update&&<h5 className={classes.nodata}>{users.length===0?"No Conversations":"Select a User"}</h5>}
    </div>)
}


export default Message;