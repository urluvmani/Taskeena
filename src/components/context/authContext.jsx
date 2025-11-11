import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext()

export const AuthProvider = ({children})=>{
  const [auth, setAuth] = useState({
    user:null,
    token:""
  })
  useEffect(() => {
   const oldData = localStorage.getItem("auth")
   if (oldData) {
    setAuth(JSON.parse(oldData))
   }
  }, [])
  useEffect(() => {
   if(auth.token){
    localStorage.setItem("auth",JSON.stringify(auth))
   }
   else{
    localStorage.removeItem("auth")
   }
  }, [auth])
  return(
    <AuthContext.Provider value={{auth,setAuth}}>
      {children}
    </AuthContext.Provider>
  )
  
}

export const useAuth =()=> useContext(AuthContext)