// import { createContext, useContext, useState, useEffect } from "react"
// import { auth } from '../firebase'
// import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

// const AuthContext = createContext()

// export function useAuth() {
//     return useContext(AuthContext)
// }

// export function AuthProvider({ children }) {

//     const [currentUser, setCurrentUser] = useState()

//     function firebaseSignUp(passedEmail, passedPassword) {
//         return createUserWithEmailAndPassword(passedEmail, passedPassword)
//     }

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, user => {
//             setCurrentUser(user)
//         })
//         return unsubscribe
//     }, [])

//     // const value = {
//     //     currentUser,
//     //     signup
//     // }

//     return (
//         <AuthContext.Provider value={{ currentUser, firebaseSignUp }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
