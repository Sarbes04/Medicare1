import {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

//this route is needed so that user and doctor profile route 
//cannot be accessed without logging in
function ProtectedRoute({children, allowedRoles}) {
    const {token, role} = useContext(authContext);
    
    const isAllowed = allowedRoles.includes(role);
    //console.log(token, role, isAllowed);
    const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true}/>
    //replace={true} replaces the current url in the history stack
  return accessibleRoute;
}

export default ProtectedRoute