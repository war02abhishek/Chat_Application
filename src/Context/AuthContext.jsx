import React, { useEffect, useState, createContext, useContext, useRef } from 'react'
import { auth } from '../Pages/firebase'
import { onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    // const currentUser = useRef({user:null});
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser({user});
            console.log(currentUser);
        })
        
        return () => {
            unsub();
        }
        //clean up fnn otherwse it will cause memory leak
    }, []);
    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    )
}
const useGlobalContext = () => {
    return useContext(AuthContext);
};
export { AuthContextProvider as default, useGlobalContext,AuthContext };
