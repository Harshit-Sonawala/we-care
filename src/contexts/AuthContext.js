import { createContext, useState, useEffect } from "react"
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                console.log(`Signed in with: ${user.uid}`)
                setCurrentUser(user)
            } else {
                console.log('Signed out')
                setCurrentUser(null)
            }
        })
    })

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

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

//     
// }
