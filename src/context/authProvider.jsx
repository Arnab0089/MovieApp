import { createContext,useEffect,useState } from "react";
import { auth } from "../Component/Services/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";


export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    function SignInWithGoogle(){
        const provider=new GoogleAuthProvider()
        return signInWithPopup(provider)
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setuser(currentUser)
            }else{
                setuser(null)
            }
            setloading(false)
        })
    }, [])
    
    return <AuthContext.Provider value={{user,loading,SignInWithGoogle,logOut}}>
        {children}
    </AuthContext.Provider>
}

