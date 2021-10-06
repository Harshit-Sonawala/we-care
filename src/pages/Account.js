import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { signOut, deleteUser } from 'firebase/auth'
import { auth, db } from '../firebaseInit'
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { Redirect } from 'react-router'
import { Person } from '@material-ui/icons'
import Loading from '../components/Loading'
import { globalIconStyle } from '../assets/GlobalStyles'

const Account = () => {

    const history = useHistory()
    const { currentUser, setCurrentUser } = useContext(AuthContext)
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
    })

    // Run Read function on app mount:
    useEffect(() => {
        fireStoreRead()
        // eslint-disable-next-line
    }, [])

    // Read Firestore for account info:
    const fireStoreRead = async () => {
        setLoading(true)
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Fetched User data:", docSnap.data())
            setUserData({
                ...userData,
                userDataFirstName: `${docSnap.data().userFirstName}`,
                userDataLastName: `${docSnap.data().userLastName}`,
                userDataEmail: `${docSnap.data().userEmail}`
            })
        } else {
            console.log("No such user found, searching providers...")
            const docRef = doc(db, 'providers', currentUser.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log("Fetched Provider data:", docSnap.data())
                setProviderData({
                    ...providerData,
                    providerDataFirstName: `${docSnap.data().providerFirstName}`,
                    providerDataLastName: `${docSnap.data().providerLastName}`,
                    providerDataCompanyName: `${docSnap.data().providerCompanyName}`,
                    providerDataEmail: `${docSnap.data().providerEmail}`,
                    providerDataNumber: `${docSnap.data().providerNumber}`,
                    providerDataDescription: `${docSnap.data().providerDescription}`
                })
            }
        }
        setLoading(false)
    }

    const onSignOutSubmit = (e) => {
        e.preventDefault()
        signOut(auth).then(() => {
            setCurrentUser(null)
            console.log('Sign Out Successful.')
        }).catch((error) => {
            console.log(error)
        });
    }

    const onDeleteUser = async (e) => {
        e.preventDefault()
        const user = auth.currentUser
        await deleteDoc(doc(db, 'users', currentUser.uid))
        deleteUser(user).then(() => {
            alert('Successfully Deleted!')
            history.push('/login')
        }).catch((error) => {
            console.log(error)
        })
    }

    if (currentUser !== null) {
        return (
            <div className='eightyperc-container'>
                <div className='card-type1 login-card'>
                    {loading ? <Loading /> :
                        <div className='ninetyfiveperc-container flex-container'>
                            <div className='circle-avatar'>
                                <Person style={globalIconStyle} />
                            </div>
                            <form onSubmit={onSignOutSubmit} className='eightyperc-container'>
                                <h3 className='heading-type3'>Your Account</h3>
                                {userData.userDataEmail ? <>
                                    <p>{`Current user: ${userData.userDataFirstName} ${userData.userDataLastName}`}</p>
                                    <p>{`Email: ${userData.userDataEmail}`}</p>
                                </> : <>
                                    <p>{`Company Account Manager: ${providerData.providerDataFirstName} ${providerData.providerDataLastName}`}</p>
                                    <p>{`Company Name: ${providerData.providerDataCompanyName}`}</p>
                                    <p>{`Email: ${providerData.providerDataEmail}`}</p>
                                    <p>{`Contact No: ${providerData.providerDataNumber}`}</p>
                                    <p>{`About: ${providerData.providerDataDescription}`}</p>
                                </>}
                                <input type='submit' className='button' value='Log Out' />
                            </form>
                            <button onClick={onDeleteUser}>Delete Account</button>
                        </div>
                    }
                </div>
            </div>
        )
    } else {
        return <Redirect to='/' />
    }
}

export default Account