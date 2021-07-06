import classes from './Message.module.css';
import pic from '../../../assets/profile.jpg'
import { useEffect, useRef, useState } from 'react';

const Message = (props) => {

    const [showSendButton, setShowSendButton] = useState(false)
    const messageRef = useRef()
    const [message, setMessage] = useState(null)

    useEffect(()=>{
        setMessage([
            <div  key="rc"  className={classes.user}><p>HI! There my name is Anthony Gonsalvis</p></div>,
                <div key="rf" className={classes.sender}><p>HI! There my name is Bhavesh Singh</p></div>,
                <div key="de" className={classes.sender}><p>HI! There my name is Bhavesh Singh</p></div>,
                <div  key="def" className={classes.sender}><p>HI! There my name is Bhavesh Singh</p></div>,
        <div key="decxwf" className={classes.user}><p>HI! There my name is Anthony Gonsalvis</p></div>,

                <div  key="edef" className={classes.sender}><p>HI! There my name is Bhavesh Singh</p></div>,
        <div key="edf" className={classes.user}><p>HI! There my name is Anthony Gonsalvis</p></div>,
        <div key="edfef" className={classes.user}><p>HI! There my name is Anthony Gonsalvis</p></div>,
        <div key="eccee" className={classes.user}><p>HI! There my name is Anthony Gonsalvis</p></div>
        ])
    }, [])

    const messageHandler = (event) => {
        if(event.target.value.length>0) {
            setShowSendButton(true)
        } else {
            setShowSendButton(false)
        }
    }

    const sendMessage = () => {
        let me = messageRef.current.value
        let obj = <div key={`${Math.random}`} className={classes.user}><p>{me}</p></div>
        setMessage((prev)=>{
            return [...prev, obj]
        })
        messageRef.current.value = ""
        setShowSendButton(false)

    }

    return (<div className={classes.container}>
        <div className={classes.left}>
            <ul>
                <li><span className={classes.imgContainer}><img  lt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                <li><span className={classes.imgContainer}><img alt="okokokok" src={pic}/></span>Bhavesh</li>
                
            </ul>
        </div>
        <div className={classes.right}>
            <div className={classes.header}><span className={classes.imgContainer}><img alt="c" src={pic}/></span>Himanshu</div>
                {message}


            <div className={classes.sendMessage}>
                
                
                <input onChange={messageHandler} ref={messageRef} placeholder="Enter Message" type="text" />
                {showSendButton&&<button onClick={sendMessage} className={classes.btn}>SEND</button>}
            </div>
        </div>
    </div>)
}


export default Message;