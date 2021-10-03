import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
//import { AuthContext } from '../contexts/AuthContext'
import { PersonAdd } from '@material-ui/icons'
import globalPrimaryColor from '../assets/colors'

const SignUp = () => {

    const history = useHistory()
    const [loading, setLoading] = useState(false)
    //const { currentUser } = useContext(AuthContext)
    const [showProviderForm, setShowProviderForm] = useState(false)

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

    const onUserSignUpSubmit = async (e) => {
        var finalUser = null
        e.preventDefault()
        console.log(userSignUpState)
        if (userSignUpState.userFirstName && userSignUpState.userLastName && userSignUpState.userEmail && userSignUpState.userPassword && userSignUpState.userConfirmPassword) {
            if (userSignUpState.userPassword === userSignUpState.userConfirmPassword) {
                setLoading(true)
                // Firebase Auth create new user:
                await createUserWithEmailAndPassword(auth, userSignUpState.userEmail, userSignUpState.userPassword).then((userResponse) => {
                    finalUser = userResponse.user
                    alert(`Successfully created user with userId: ${finalUser.uid}`)
                    history.push('/')
                }).catch((error) => {
                    alert(`in signup/firebaseCreateUserEmail: Error! Code ${error.code}: ${error.message}`)
                    return
                })
                // Cloud Firestore add user data:
                await setDoc(doc(db, 'users', finalUser.uid), {
                    userFirstName: userSignUpState.userFirstName,
                    userLastName: userSignUpState.userLastName,
                    userEmail: userSignUpState.userEmail
                }).catch((error) => {
                    alert(`in signup/fireStore_setDoc: Error Code ${error.code}: ${error.message}`)
                    setUserSignUpState({
                        userFirstName: '',
                        userLastName: '',
                        userEmail: '',
                        userPassword: '',
                        userConfirmPassword: ''
                    })
                    setLoading(false)
                    return
                })
            } else {
                alert('Entered passwords do not match.')
                return
            }
        } else {
            alert('Please fill in all the fields.')
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
                    setLoading(true)
                } catch {
                    return
                }
            } else {
                alert('Entered passwords do not match.')
                return
            }
        } else {
            alert('Please fill in all the fields.')
            return
        }
        setProviderSignUpState({
            providerFirstName: '',
            providerLastName: '',
            providerEmail: '',
            providerPassword: '',
            providerConfirmPassword: ''
        })
        setLoading(false)
    }

    const onAddPhotoClick = () => {
        console.log('Add photo clicked')
    }

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
                                <input
                                    type='text'
                                    name='userEmail'
                                    placeholder='johndoe@example.com'
                                    value={userSignUpState.userEmail}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Choose a Password: </p>
                                <input
                                    type='password'
                                    name='userPassword'
                                    value={userSignUpState.userPassword}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Confirm Password: </p>
                                <input
                                    type='password'
                                    name='userConfirmPassword'
                                    value={userSignUpState.userConfirmPassword}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <div className='circle-avatar'>
                                    <PersonAdd style={{ color: globalPrimaryColor, height: '70px', width: '70px' }} />
                                </div>
                                <button value='Add a Photo' onClick={onAddPhotoClick}>Add a Photo</button>
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
                                <input
                                    type='text'
                                    name='providerLastName'
                                    placeholder='Doe'
                                    value={providerSignUpState.providerLastName}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Company Name: </p>
                                <input
                                    type='text'
                                    name='providerCompanyName'
                                    placeholder='Company/Self-Employed'
                                    value={providerSignUpState.providerCompanyName}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Email: </p>
                                <input
                                    type='text'
                                    name='providerEmail'
                                    placeholder='abc@company.com'
                                    value={providerSignUpState.providerEmail}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-column'>
                                <p>Enter Description: </p>
                                <textarea
                                    name='providerCompanyName'
                                    placeholder='Company/Self-Employed, About..., Services...'
                                    value={providerSignUpState.providerDescription}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Choose a Password: </p>
                                <input
                                    type='password'
                                    name='providerPassword'
                                    value={providerSignUpState.providerPassword}
                                    onChange={handleProviderChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Confirm Password: </p>
                                <input
                                    type='password'
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

