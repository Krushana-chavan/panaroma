import React, { useContext } from 'react'
import {Navigate} from "react-router-dom"
import {AuthContext} from '../Context/AuthContextProvider'
const PrivateRoutes = ({children}) => {
  const {auth}  = useContext(AuthContext);
    
  if(!auth){
    return <Navigate to="/login" />
  }
  return children
  
}

export default PrivateRoutes