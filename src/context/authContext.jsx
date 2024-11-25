import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged, 
    sendPasswordResetEmail,
    fetchSignInMethodsForEmail, 
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if(!context){
        console.log("error creating auth context");
    }
    return context;
};

export function AuthProvider ({children}) {
    // usuario
    const [loading, setLoading] = useState(true); 
    const[user, setUser] = useState(null);
    useEffect(()=>{
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser){
                console.log("no hay usuario suscrito");
                setUser(null);
            }else{
                setUser(currentUser);
            }
            setLoading(false);
        })
        return () => suscribed()
    }, []);

    const checkEmailExists = async (email) => {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return methods.length > 0; // Devuelve true si el correo ya está registrado
    };
    const register = async (email, password) => {
        const response = await createUserWithEmailAndPassword (auth, email, password);
        console.log(response);
        return response;
    };
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword (auth, email, password);
        console.log(response);
        return response;
    };
    const loginWithGoogle = async () => {
        const responseGoogle =  new GoogleAuthProvider();
        return await signInWithPopup(auth, responseGoogle);
    };
    const logout = async () => {
        const response = await signOut(auth);
        console.log(response);
    };

    const resetPassword = async (email) => sendPasswordResetEmail(auth, email);
    return (
        <authContext.Provider 
            value={{
                register,
                login,
                loginWithGoogle,
                logout,
                user,
                resetPassword,
                checkEmailExists,
            }}
        >
            {!loading ? children : <div>Cargando...</div>} 
        </authContext.Provider>
    );
}
// Validación de las props
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};