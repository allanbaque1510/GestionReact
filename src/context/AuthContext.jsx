import { createContext, useState, useContext, useEffect } from "react";
import {registerRequest, loginRequest,verifyToken} from '../api/auth'
import Cookies from 'js-cookie'
export const AuthContext = createContext()

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("UseAuth Deberia estar dentro de un provider")
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [errors,setErrors] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const singup = async(user) =>{
        try {
            const res = await registerRequest(user);
            Cookies.set('token', res.data.token); 
            setUser(res.data)
            setIsAuthenticated(true);
            
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }

    const signin = async(user) =>{
        try {
            const res = await loginRequest(user);
            Cookies.set('token', res.data.token); 
            setUser(res.data)
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            if(error.response.data){
                return setErrors(error.response.data)
            }
            if(error.message){
                return setErrors([error.message])
            }
        }
    }
    const logOut= () =>{
        Cookies.remove("token");
        setUser(null)
        setIsAuthenticated(false)
    }
    useEffect(() => {
      if(errors.length >0){
        const timer = setTimeout(() => {
            setErrors([])
        }, 5000);
        return clearTimeout(timer)
      }
    }, [errors])
    
    useEffect(() => {
        const checkToken = async()=>{    
            const cookie=Cookies.get();

            if(cookie.token){
                try {
                    const res = await verifyToken(cookie.token)
                    if(!res.data){
                        setIsAuthenticated(false)
                        setLoading(false)
                        return 
                    } 
                        
                    
                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false)
                     
                } catch (error) {
                    console.log(error)
                    setIsAuthenticated(false)
                    setUser(null)
                    setLoading(false)
                }
            }else{
                setLoading(false)
                setIsAuthenticated(false) 
                setUser(null)
                return
            }
        }
        checkToken()
      }, [])
    

    return(
        <AuthContext.Provider value={{
            singup,
            signin,
            logOut,
            loading,
            user,
            isAuthenticated,
            errors,
            }}>
            {children}
        </AuthContext.Provider>
        )
}