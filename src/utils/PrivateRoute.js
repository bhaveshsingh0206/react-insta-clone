import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../store/firebase-authUser';


const PrivateRoute = ({component: Component, ...rest}) => {

    const userCtx = useContext(UserContext);
    // console.log(userCtx.isLoggedIn)
    return(
        <Route {...rest} render={(props)=>{
            return userCtx.isLoggedIn? <Component {...props}/>:<Redirect
            to='/login'
         />
        }}>
            
        </Route>
    )
}

export default PrivateRoute;