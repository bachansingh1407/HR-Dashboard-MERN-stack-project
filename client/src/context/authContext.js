import { createContext, useEffect, useState } from "react"
import {jwtDecode } from 'jwt-decode'
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken ] = useState(localStorage.getItem("token"))

    useEffect(() => {
        if(token){
            try{
                const decoded = jwtDecode(token)
                setUser({ id: decoded.id, name: decoded.name, email: decoded.email });

            } catch(err){
                console.error('Invalid Token', err)
                logout()
            }
        }else{
            setUser(null)
        }
    }, [token])

    const login = async (email, password) => {
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login", {email, password})
            const newToken = res.data.token;
            localStorage.setItem("token",newToken)
            setToken(newToken)
            const decoded = jwtDecode(newToken);
            setUser({ id: decoded.id, name: decoded.name, email: decoded.email });

        } catch(err){
            console.error(err.response?.data?.error || "Login failed");
        }
    }


    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{user, token, login, logout}} >
            {children}
        </AuthContext.Provider>
      )
    
}