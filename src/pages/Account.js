import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { signOut, deleteUser } from 'firebase/auth'
import { auth, db } from '../firebaseInit'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Redirect } from 'react-router'
import Loading from '../components/Loading'
import UserAccount from './UserAccount'
import ProviderAccount from './ProviderAccount'

const Account = () => {

    const history = useHistory()
    const { currentUser, setCurrentUser, isProvider, setIsProvider } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        userDataFirstName: '',
        userDataLastName: '',
        userDataEmail: '',
    })

    const [providerData, setProviderData] = useState({
        providerDataFirstName: '',
        providerDataLastName: '',
        providerDataCompanyName: '',
        providerDataEmail: '',
        providerDataNumber: '',
        providerDataDescription: '',
        providerDataServices: [],
    })

    // Run Read function on app mount:
    useEffect(() => {
        fireStoreRead()
        // eslint-disable-next-line
    }, [])

    // Read Firestore for account info:
    const fireStoreRead = async () => {
        setLoading(true)
        // var getWhich = 'users'
        // if (isProvider) {
        //     getWhich = 'providers'
        // }
        var docSnap = await getDoc(doc(db, 'users', currentUser.uid))
        if (docSnap.exists()) {
            console.log(`Fetched user data:`, docSnap.data())
            setUserData({
                ...userData,
                userDataFirstName: docSnap.data().userFirstName,
                userDataLastName: docSnap.data().userLastName,
                userDataEmail: docSnap.data().userEmail
            })
            setIsProvider(false)
        } else {
            docSnap = await getDoc(doc(db, 'providers', currentUser.uid))
            if (docSnap.exists()) {
                setProviderData({
                    ...providerData,
                    providerDataFirstName: docSnap.data().providerFirstName,
                    providerDataLastName: docSnap.data().providerLastName,
                    providerDataCompanyName: docSnap.data().providerCompanyName,
                    providerDataEmail: docSnap.data().providerEmail,
                    providerDataNumber: docSnap.data().providerNumber,
                    providerDataDescription: docSnap.data().providerDescription,
                    providerDataServices: docSnap.data().providerServices
                })
                setIsProvider(true)
            } else {
                console.log(`No such users/providers found.`)
            }
        }
        setLoading(false)
    }

    const onSignOutSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        signOut(auth).then(() => {
            setCurrentUser(null)
            setIsProvider(false)
        }).catch((error) => {
            console.log(error)
        });
        setLoading(false)
    }

    const onDeleteUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        var getWhich = 'users'
        if (isProvider) {
            getWhich = 'providers'
        }
        const user = auth.currentUser
        await deleteDoc(doc(db, getWhich, currentUser.uid))
        deleteUser(user).then(() => {
            alert('Successfully Deleted!')
            history.push('/login')
        }).catch((error) => {
            console.log(error)
        })
        setLoading(false)
    }

    if (currentUser !== null) {
        return (
            <div className='ninetyfiveperc-container'>
                {loading ? <Loading /> : <>
                    {!isProvider ?
                        <UserAccount userData={userData} onSignOutSubmit={onSignOutSubmit} onDeleteUser={onDeleteUser} />
                        : <ProviderAccount providerData={providerData} setProviderData={setProviderData} onSignOutSubmit={onSignOutSubmit} onDeleteUser={onDeleteUser} />
                    }
                </>}
            </div>
        )
    } else {
        return <Redirect to='/' />
    }
}

export default Account