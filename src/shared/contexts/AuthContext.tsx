import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData{
    isAuthenticated: boolean;
    logout: ()=>void;
    login:(email: string, password: string)=>Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY_TOKEN = 'APP_ACCESS_TOKEN'

interface IAuthProviderProps{
    children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children})=>{

    const [accessToken, setAccesToken] = useState<string>()

    useEffect(()=>{
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);

        if(accessToken){
            setAccesToken(JSON.parse(accessToken))

        }else{
            setAccesToken(undefined)
        }
    },[])

    const handleLogin = useCallback(async (email: string, password: string)=>{
        const result = await AuthService.auth(email, password);
        if(result instanceof Error){
            return result.message;

        }else{
            localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(result.accessToken))
            setAccesToken(result.accessToken);
        }
    },[]);

    const handleLogout = useCallback(()=>{

        localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN)
        setAccesToken(undefined);
        
    },[]);

    const isAuthenticated = useMemo(()=>!!accessToken,[accessToken])

    return(
        <AuthContext.Provider value={{login: handleLogin, logout: handleLogout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)