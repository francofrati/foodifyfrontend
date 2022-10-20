import { auth } from "./firebase";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export const loginWithGoogle = async() => {

    try {
        
        const googleProvider = new GoogleAuthProvider()
        const signIn = await signInWithPopup(auth, googleProvider)
        const {email,displayName} = signIn.user
        
        return {
            email: email,
            name: displayName
        }
    } catch (error) {
        return error
    }

}
