import React, { useState, useEffect } from 'react'
import firebase from '../utils/firebase'


const UserContext = React.createContext({
    currentUser: {
        uid:''
    },
    logout: ()=>{},
    isLoggedIn: false,
    login:()=>{}
})


export const UserContextProvider = (props) => {

    const [currentUser, setCurrentUser] = useState({uid:''});
    // console.log(localStorage.getItem('isLoggedIn'))
    let initial = false

    if(localStorage.getItem('isLoggedIn')) {
        initial = localStorage.getItem('isLoggedIn')
        // console.log(initial)
    }

    const [isLoggedIn, setLoggedIn] = useState(initial)
    
    useEffect( ()=> {
        
        const un = firebase.auth().onAuthStateChanged((user)=>{
            setCurrentUser(JSON.parse(JSON.stringify(user)))
        })

        return un;
    }, [])


    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', true)
        setLoggedIn(true)
    }

    const logoutHandler = () =>{
        console.log('logot')
        setLoggedIn(false)
           
        localStorage.removeItem('isLoggedIn')
        firebase.auth().signOut();
        
    }

    const contextValue = {
        currentUser: currentUser,
        logout: logoutHandler,
        isLoggedIn:isLoggedIn,
        login:loginHandler
    }

    return <UserContext.Provider value={contextValue}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext;



