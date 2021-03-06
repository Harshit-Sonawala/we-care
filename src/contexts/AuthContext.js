import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebaseInit'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isProvider, setIsProvider] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                console.log(`Signed in with: ${user.uid}, provider: ${isProvider}`)
                setCurrentUser(currentUser => user)
            } else {
                console.log('Signed out')
                setCurrentUser(currentUser => null)
            }
        })
    })

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, isProvider, setIsProvider }}>
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
