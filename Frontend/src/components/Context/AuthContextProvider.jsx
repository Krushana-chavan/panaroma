import React, { createContext, useState } from "react";

export const AuthContext = createContext()
const token=localStorage.getItem("token");
const refreshtoken=localStorage.getItem("refreshtoken");
function AuthContextProvider({ children }) {
    const [create, setCreate] = useState(false);
    const [auth,setAuth]=useState(token?true:false)
    return (
        <AuthContext.Provider value={{ setCreate, create,setAuth ,auth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;