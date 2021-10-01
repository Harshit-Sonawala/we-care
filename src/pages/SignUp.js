import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { PersonAdd } from '@material-ui/icons'
import globalPrimaryColor from '../assets/colors'

const SignUp = () => {

    const { currentUser, setCurrentUser } = useContext(FirebaseContext)

    //const [showProviderForm, setShowProviderForm] = useState(false)

    const [userSignUpState, setUserSignUpState] = useState({
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: ''
    })

    const [providerSignUpState, setProviderSignUpState] = useState({
        providerFirstName: '',
        providerLastName: '',
        providerCompanyName: '',
        providerDescription: '',
        providerEmail: '',
        providerPassword: '',
        providerConfirmPassword: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUserChange = (e) => {
        setUserSignUpState({
            ...userSignUpState,
            [e.target.name]: e.target.value
        })
    }

    const handleProviderChange = (e) => {
        setProviderSignUpState({
            ...providerSignUpState,
            [e.target.name]: e.target.value
        })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
            console.log(`signed in with: ${user.uid}`)
        } else {
            console.log('signed out')
        }
    })

    const firebaseSignOut = () => {
        signOut(auth).then(() => {
            setCurrentUser()
        }).catch((error) => {
            console.log(error)
        });
    }

    const firebaseCreateUserEmail = async () => {
        await createUserWithEmailAndPassword(auth, userSignUpState.userEmail, userSignUpState.userPassword).then(async (userCredential) => {
            const user = userCredential.user
            alert(`Successfully created user with userId: ${user.uid}`)
            await firebaseSignInEmail(userSignUpState.userEmail, userSignUpState.userPassword)
            console.log(`in firebaseCreateUserEmail: userId = ${currentUser.uid}, uid = ${user.uid}`)
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            alert(`Error Code ${errorCode}: ${errorMessage}`)
            return
        })
        //const { user: { uid } } = userCredentials
    }

    const firebaseSignInEmail = async (passedEmail, passedPassword) => {
        await signInWithEmailAndPassword(auth, passedEmail, passedPassword).then((userCredential) => {
            const user = userCredential.user
            setCurrentUser(user)
            if (currentUser) { firebaseSubmitUserData() }
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            alert(`Error Code ${errorCode}: ${errorMessage}`)
            return
        })
    }

    const firebaseSubmitUserData = async () => {
        console.log(`in firebaseSubmitUserData: userId = ${currentUser.uid}`)
        await setDoc(doc(db, 'users', `${currentUser.uid}`), {
            userFirstName: userSignUpState.userFirstName,
            userLastName: userSignUpState.userLastName,
            userEmail: userSignUpState.userEmail
        })
    }


    // const firebaseSubmitProviderData = async (passedFirstName, passedLastName, passedCompanyName, passedDescription, passedEmail, passedPassword) => {
    //     await setDoc(doc(db, 'providers', userId), {
    //         providerFirstName: passedFirstName,
    //         providerLastName: passedLastName,
    //         providerCompanyName: passedCompanyName,
    //         providerDescription: passedDescription,
    //         providerEmail: passedEmail,
    //         providerPassword: passedPassword
    //     })
    // }

    const onUserSignUpSubmit = async (e) => {
        e.preventDefault()
        console.log(userSignUpState)
        if (userSignUpState.userFirstName && userSignUpState.userLastName && userSignUpState.userEmail && userSignUpState.userPassword && userSignUpState.userConfirmPassword) {
            if (userSignUpState.userPassword === userSignUpState.userConfirmPassword) {
                // try {
                setError('')
                setLoading(true)
                firebaseSignOut()
                firebaseCreateUserEmail().then(() => {
                    // if (currentUser) { firebaseSubmitUserData() }
                })
            } else {
                alert('Entered passwords do not match.')
                setError('User password mismatch.')
                return
            }
        } else {
            alert('Please fill in all the fields.')
            setError('Incomplete fields.')
            return
        }
        setUserSignUpState({
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPassword: '',
            userConfirmPassword: ''
        })
        setLoading(false)
    }

    const onProviderSignUpSubmit = (e) => {
        e.preventDefault()
        console.log(providerSignUpState)
        if (providerSignUpState.providerFirstName && providerSignUpState.providerLastName && providerSignUpState.providerEmail && providerSignUpState.providerPassword && providerSignUpState.providerConfirmPassword) {
            if (providerSignUpState.providerPassword === providerSignUpState.providerConfirmPassword) {
                try {
                    setError('')
                    setLoading(true)
                    //const finalProviderEmail = providerSignUpState.providerEmail
                    //const finalProviderPassword = providerSignUpState.providerPassword
                    //firebaseCreateUserEmail(finalProviderEmail, finalProviderPassword)
                } catch {
                    setError('Failed to create Provider account.')
                    console.log(error)
                    return
                }
            } else {
                alert('Entered passwords do not match.')
                setError('provider password mismatch.')
                return
            }
        } else {
            alert('Please fill in all the fields.')
            setError('Incomplete fields.')
            return
        }
        setUserSignUpState({
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPassword: '',
            userConfirmPassword: ''
        })
        setLoading(false)
    }

    // const firebaseSubmitUserData = async (passedFirstName, passedLastName, passedEmail) => {

    // }

    return (
        <div className='eightyperc-container'>
            <div className='card-type1 signup-card'>
                <div className='ninetyfiveperc-container flex-container'>
                    <form onSubmit={onUserSignUpSubmit} className='eightyperc-container'>
                        <h2 className='heading-type3'>User Sign Up</h2>
                        <div className='signup-flex-column'>
                            <div className='signup-flex-row'>
                                <p>Enter Firstname: </p>
                                <input type='text'
                                    name='userFirstName'
                                    placeholder='John'
                                    value={userSignUpState.userFirstName}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Lastname: </p>
                                <input type='text'
                                    name='userLastName'
                                    placeholder='Doe'
                                    value={userSignUpState.userLastName}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Email: </p>
                                <input type='text'
                                    name='userEmail'
                                    placeholder='abc@example.com'
                                    value={userSignUpState.userEmail}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Choose a Password: </p>
                                <input type='password'
                                    name='userPassword'
                                    value={userSignUpState.userPassword}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Confirm Password: </p>
                                <input type='password'
                                    name='userConfirmPassword'
                                    value={userSignUpState.userConfirmPassword}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <div className='circle-avatar'>
                                    <PersonAdd style={{ color: globalPrimaryColor, height: '70px', width: '70px' }} />
                                </div>
                                <button value='Add a Photo'>Add a Photo</button>
                            </div>
                            <div className='signup-flex-row'>
                                <input type='submit' className='button' value='Submit' disabled={loading} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='card-type1 signup-card'>
                <div className='ninetyfiveperc-container flex-container'>
                    <form onSubmit={onProviderSignUpSubmit} className='eightyperc-container'>
                        <h2 className='heading-type3'>Provider Sign Up</h2>
                        <div className='signup-flex-column'>
                            <div className='signup-flex-row'>
                                <p>Enter Firstname: </p>
                                <input type='text'
                                    name='providerFirstName'
                                    placeholder='John'
                                    value={providerSignUpState.providerFirstName}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Lastname: </p>
                                <input type='text'
                                    name='providerLastName'
                                    placeholder='Doe'
                                    value={providerSignUpState.providerLastName}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Company Name: </p>
                                <input type='text'
                                    name='providerCompanyName'
                                    placeholder='Company/Self-Employed'
                                    value={providerSignUpState.providerCompanyName}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Email: </p>
                                <input type='text'
                                    name='providerEmail'
                                    placeholder='abc@company.com'
                                    value={providerSignUpState.providerEmail}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Choose a Password: </p>
                                <input type='password'
                                    name='providerPassword'
                                    value={providerSignUpState.providerPassword}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Confirm Password: </p>
                                <input type='password'
                                    name='providerConfirmPassword'
                                    value={providerSignUpState.providerConfirmPassword}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <div className='circle-avatar'>
                                    <PersonAdd style={{ color: globalPrimaryColor, height: '70px', width: '70px' }} />
                                </div>
                                <button value='Add a Photo'>Add a Photo</button>
                            </div>
                            <div className='signup-flex-row'>
                                <input type='submit' className='button' value='Submit' disabled={loading} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='card-type1 signup-card signup-card2'>
                <p>Existing user? <Link to='/login'>Log in</Link> instead.</p>
            </div>
        </div >
    )
}

export default SignUp

