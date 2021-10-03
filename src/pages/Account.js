import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc } from "firebase/firestore";
import { Redirect } from 'react-router'
import { Person } from '@material-ui/icons'
import LoadingGif from '../assets/images/loading.gif'
import globalPrimaryColor from '../assets/colors'

const Account = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        userDataFirstName: '',
        userDataLastName: '',
        userDataEmail: '',
    })

    useEffect(() => {
        fireStoreRead()
    }, [])

    const fireStoreRead = async () => {
        setLoading(true)
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Fetched Document data:", docSnap.data())
            setUserData({
                ...userData,
                userDataFirstName: `${docSnap.data().userFirstName}`,
                userDataLastName: `${docSnap.data().userLastName}`,
                userDataEmail: `${docSnap.data().userEmail}`
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document found!")
        }
        setLoading(false)
    }

    const onSignOutSubmit = () => {
        signOut(auth).then(() => {
            setCurrentUser(null)
            console.log('Sign Out Successful.')
        }).catch((error) => {
            console.log(error)
        });
    }

    if (currentUser !== null) {
        return (
            <div className='eightyperc-container'>
                <div className='card-type1 login-card'>
                    {loading ? <img src={LoadingGif} className='loading-gif' alt='Loading...' style={{
                        width: '70px',
                        height: '70px',
                        margin: 'auto',
                        display: 'block'
                    }} /> :
                        <div className='ninetyfiveperc-container flex-container'>
                            <div className='circle-avatar'>
                                <Person style={{ color: globalPrimaryColor, height: '70px', width: '70px' }} />
                            </div>
                            <form onSubmit={onSignOutSubmit} className='eightyperc-container'>
                                <h3 className='heading-type3'>Your Account</h3>
                                <p>{`Current user: ${userData.userDataFirstName} ${userData.userDataLastName}`}</p>
                                <p>{`Email: ${userData.userDataEmail}`}</p>
                                {/* <p>Enter Email:</p> */}
                                <input type='submit' className='button' value='Log Out' />
                            </form>
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