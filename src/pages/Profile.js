import { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc } from "firebase/firestore";
import { Redirect } from 'react-router'
import { Person } from '@material-ui/icons'
import globalPrimaryColor from '../assets/colors'

const Profile = () => {

    const { currentUser, setCurrentUser } = useContext(FirebaseContext)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        fireStoreRead()
    })

    const fireStoreRead = async () => {
        const docRef = doc(db, 'users', `${currentUser.uid}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log("Fetched Document data:", docSnap.data())
            setUserName(`${docSnap.data().userFirstName} ${docSnap.data().userLastName}`)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document found!")
        }
    }

    const firebaseSignOut = () => {
        signOut(auth).then(() => {
            setCurrentUser(null)
            console.log('Sign Out Successful.')
        }).catch((error) => {
            console.log(error)
        });
        return <Redirect to={{
            pathname: '/',
        }} />
    }

    return (
        <div className='eightyperc-container'>
            <div className='card-type1'>
                <div className='ninetyfiveperc-container'>
                    <div className='circle-avatar'>
                        <Person style={{ color: globalPrimaryColor, height: '70px', width: '70px' }} />
                    </div>
                    <form onSubmit={firebaseSignOut} className='eightyperc-container'>
                        <h2 className='heading-type3'>{`Current user: ${userName}`}</h2>
                        {/* <p>Enter Email:</p> */}
                        <input type='submit' className='button' value='Log Out' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile