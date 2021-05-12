import classes from './Login.module.css';
import loginImage from '../../assets/login-page.png'
import googleIcon from '../../assets/search.png'
import {useState, useRef, useContext} from 'react';
import Input from '../../components/UI/Input'
import {AUTH, DATABASE} from '../../utils/API'
import {AUTH_KEY} from '../../utils/Constants';
import AuthContext from '../../store/authCtx';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const authCtx = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const nameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const history = useHistory();
    const switchLoginHandler = () => {
        setIsLogin(!isLogin);
    }

    async function onSubmitRequest(event) {
        event.preventDefault();
        if(!isLogin) {
            let email = emailRef.current.value
            let password = passwordRef.current.value
            let name = nameRef.current.value
            let data = {email:email, password:password, returnSecureToken: true}
            if(email!==""||password!==""||name!=="") {
                try{
                    let res = await AUTH.post(`accounts:signUp?key=${AUTH_KEY}`,data ,{
                        method: 'POST'
                        
                    })
                    console.log("res ",res)
                    const response = res.data
                    if(res.data&&response.localId) {
                        console.log(response.idToken)
                        let obj = {name:name, email:email, uid: response.localId}
                        res = await DATABASE.post(`/users.json?auth=${response.idToken}`,obj,{
                            method:'POST'
                        })
                        authCtx.login(response.idToken)
                        history.replace('/');
                    }

                } catch(error){
                    console.log(error.response)
                    if(error&&error.response&&error.response.data&&error.response.data.error&&error.response.data.error.message)
                        console.log(error.response.data.error.message)
                }
            }
        } else {
            let email = emailRef.current.value
            let password = passwordRef.current.value
            let data = {email:email, password:password, returnSecureToken: true}
            if(email!==""||password!=="") {
                try{
                    let res = await AUTH.post(`accounts:signInWithPassword?key=${AUTH_KEY}`,data ,{
                        method: 'POST'
                        
                    })
                    console.log("res ",res)
                    const response = res.data
                    if(res.data&&response.localId) {
                        authCtx.login(response.idToken)
                        history.replace('/');
                    }
                } catch(error){
                    console.log(error.response)
                    if(error&&error.response&&error.response.data&&error.response.data.error&&error.response.data.error.message)
                        console.log(error.response.data.error.message)
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