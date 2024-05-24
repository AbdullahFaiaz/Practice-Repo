import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { PropTypes } from 'prop-types';
import { AuthContext } from "../../Context/ContextComponent";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    //location to tract where user wanted to go before log in. 
    //so that after login user can be redirected there
    const location = useLocation()
    // console.log(location.pathname)
    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>

    }
    if(user){
        return children
    }
    else{
        return <Navigate state={location.pathname} to={"/two/login"}></Navigate>
    }
};

export default PrivateRoute;
PrivateRoute.propTypes = {
    children: PropTypes.node,
}