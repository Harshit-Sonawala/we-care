import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { signOut, deleteUser } from 'firebase/auth'
import { auth, db } from '../firebaseInit'
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { Redirect } from 'react-router'
import Loading from '../components/Loading'
import UserAccount from '../components/UserAccount'
import ProviderAccount from '../components/ProviderAccount'

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
        var getWhich = 'users'
        if (isProvider) {
            getWhich = 'providers'
        }
        const docRef = doc(db, getWhich, currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log(`Fetched ${getWhich} data:`, docSnap.data())
            if (!isProvider) {
                setUserData({
                    ...userData,
                    userDataFirstName: `${docSnap.data().userFirstName}`,
                    userDataLastName: `${docSnap.data().userLastName}`,
                    userDataEmail: `${docSnap.data().userEmail}`
                })
            } else {
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
            }
        } else {
            console.log(`No such ${getWhich} found.`)
        }
        setLoading(false)
    }

    const onSignOutSubmit = (e) => {
        e.preventDefault()
        signOut(auth).then(() => {
            setCurrentUser(null)
            setIsProvider(false)
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
                {/* <div class="card-type1 flex-column">
                    <div class="section1">
                        <h3>Padding, Margin, Borders in CSS</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, aspernatur.</p>
                        <div class="circle1">Test</div>
                    </div>

                    <div class="section2">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum aspernatur exercitationem cupiditate nobis nisi quo nam, provident harum similique sunt. Deleniti quidem aliquam excepturi, temporibus voluptatibus sed quaerat repellat ut?</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum aspernatur exercitationem cupiditate nobis nisi quo nam, provident harum similique sunt. Deleniti quidem aliquam excepturi, temporibus voluptatibus sed quaerat repellat ut?</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum aspernatur exercitationem cupiditate nobis nisi quo nam, provident harum similique sunt. Deleniti quidem aliquam excepturi, temporibus voluptatibus sed quaerat repellat ut?</p>
                    </div>
                </div> */}
                <div className='card-type1 account-card'>
                    {loading ? <Loading /> :
                        <div className='eightyperc-container flex-column-stretch'>
                            {!isProvider ? <UserAccount userData={userData} /> : <ProviderAccount providerData={providerData} />}
                            <div className="flex-row">
                                <button className='button-type1' onClick={onSignOutSubmit}>Log Out</button>
                                <button className='button-type2' onClick={onDeleteUser}>Delete Account</button>
                            </div>
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