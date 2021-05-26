import classes from './Login.module.css';
import loginImage from '../../assets/login-page.png'
import googleIcon from '../../assets/search.png'
import {useState, useRef, useContext} from 'react';
import Input from '../../components/UI/Input'
// import {AUTH} from '../../utils/API'
// import {AUTH_KEY} from '../../utils/Constants';
// import AuthContext from '../../store/authCtx';
import { useHistory } from 'react-router-dom';

import firebase from '../../utils/firebase';
import UserContext from '../../store/firebase-authUser';

const Login = (props) => {
    const userCtx = useContext(UserContext);
    const [isLogin, setIsLogin] = useState(true);
    const nameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const history = useHistory();
    const switchLoginHandler = () => {
        setIsLogin(!isLogin);
    }
    if(userCtx.isLoggedIn) {
        history.push('/')
    }
     async function onSubmitRequest(event) {
        event.preventDefault();
        
        if(!isLogin) {
            let email = emailRef.current.value
            let password = passwordRef.current.value
            let name = nameRef.current.value
            
            if(email!==""||password!==""||name!=="") {

                try{
                    let res = await firebase.auth().createUserWithEmailAndPassword(email, password)
                    res = await JSON.parse(JSON.stringify(res))
                    
                    if(res.user) {
                        const uid = res.user.uid
                        let obj = {email:email, name:name, followers:[], followings:[], posts:[], uid: uid}
                        try{
                            const db = firebase.firestore().collection('users').doc(uid)
                            await db.set(obj)
                            userCtx.login()
                            history.replace('/')
                        } catch(e) {
                            console.log(e)
                        }
                    }
                } catch(e){
                    console.log(e)
                }
                
            }
        } else {
            let email = emailRef.current.value
            let password = passwordRef.current.value
            // let data = {email:email, password:password, returnSecureToken: true}
            if(email!==""||password!=="") {
                try{
                    let res = await firebase.auth().signInWithEmailAndPassword(email, password)
                    res = await JSON.parse(JSON.stringify(res))
                    console.log(res)
                    if(res.user) {
                        console.log("pushed")
                        
                        userCtx.login()
                        history.replace('/')
                    }
                    // console.log(res)
                } catch(e){
                    console.log(e)
                }
            }
        }
    }

    return(
        <>
            <div className={classes['login-container']}>
                <div className={classes.left}>
                    <img alt="instagram-icon" className={classes['login-image']} src={loginImage} />
                </div>
                <div className={classes.right}>
                    <div className={classes.upper}>
                        <div className={classes.logo}>Instagram</div>
                        <form className={classes['input-container']} onSubmit={onSubmitRequest}> 
                            
                            <Input r={emailRef} id="1" type="email" label="Email" />
                            <Input r={passwordRef} id="2" type="password" label="Password"/>
                            {!isLogin&&<Input r={nameRef} id="3" type="text" label="Name"/>}
                            <button className={classes.login}>{!isLogin?`Sign Up`:`Login`}</button>
                            
                        </form>
                        
                            <div className={classes.OR}> 
                                <span className={classes.line}></span>
                                <span>OR</span>
                                <span className={classes.line}></span>
                            </div>
                            
                            <div className={classes.facebook}>
                            <button><span><img alt="google-icon" src={googleIcon} /></span>Login by Google</button>
                            </div>
                    </div>

                    <div className={classes.lower}>
                        <p>{isLogin?`Don't have a account?`:`Already have an account`} <button onClick={switchLoginHandler}>{isLogin?`Sign Up Now!!`:`Login now!!`}</button></p>
                    </div>
                </div>
            </div>
            <p className={classes.copyright}>Copyright notices are not required by law. However, having one helps protect your creative content so you should have one even though not required.</p>
        </>
    )
}


export default Login;