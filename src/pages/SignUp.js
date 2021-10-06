import { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseInit'
import { PersonAdd } from '@material-ui/icons'
import Loading from '../components/Loading'
import { globalIconStyle } from '../assets/GlobalStyles'
import { Switch as MaterialSwitch } from '@material-ui/core'

const SignUp = () => {

    const history = useHistory()
    const { isProvider, setIsProvider } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
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
        providerEmail: '',
        providerNumber: '',
        providerDescription: '',
        providerPassword: '',
        providerConfirmPassword: ''
    })

    useEffect(() => {
        console.log(`isProvider: ${isProvider}`)
        // eslint-disable-next-line
    }, [])

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

    const handleSwitchCheck = (e) => {
        setShowProviderForm(e.target.checked)
    }

    const onUserSignUpSubmit = async (e) => {
        e.preventDefault()
        var finalUser = null
        if (userSignUpState.userFirstName && userSignUpState.userLastName && userSignUpState.userEmail && userSignUpState.userPassword && userSignUpState.userConfirmPassword) {
            if (userSignUpState.userPassword === userSignUpState.userConfirmPassword) {
                // Firebase Auth create new user:
                setLoading(true)
                await createUserWithEmailAndPassword(auth, userSignUpState.userEmail, userSignUpState.userPassword).then((userResponse) => {
                    finalUser = userResponse.user
                    alert(`Successfully created user with userId: ${finalUser.uid}`)
                    setIsProvider(false)
                    history.push('/')
                }).catch((error) => {
                    alert(`in signup/firebaseCreateUserEmail: Error! Code ${error.code}: ${error.message}`)
                    setLoading(false)
                    return
                })
                // Cloud Firestore add user data:
                setLoading(true)
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

    const onProviderSignUpSubmit = async (e) => {
        e.preventDefault()
        var finalProvider = null
        if (providerSignUpState.providerFirstName && providerSignUpState.providerLastName && providerSignUpState.providerEmail && providerSignUpState.providerCompanyName && providerSignUpState.providerDescription && providerSignUpState.providerPassword && providerSignUpState.providerConfirmPassword) {
            if (providerSignUpState.providerPassword === providerSignUpState.providerConfirmPassword) {
                // Firebase Auth create new user:
                setLoading(true)
                await createUserWithEmailAndPassword(auth, providerSignUpState.providerEmail, providerSignUpState.providerPassword).then((providerResponse) => {
                    finalProvider = providerResponse.user
                    alert(`Successfully created provider with userId: ${finalProvider.uid}`)
                    setIsProvider(true)
                    history.push('/')
                }).catch((error) => {
                    alert(`in signup/firebaseCreateProviderEmail: Error! Code ${error.code}: ${error.message}`)
                    setLoading(false)
                    return
                })
                // Cloud Firestore add provider data:
                setLoading(true)
                await setDoc(doc(db, 'providers', finalProvider.uid), {
                    providerFirstName: providerSignUpState.providerFirstName,
                    providerLastName: providerSignUpState.providerLastName,
                    providerCompanyName: providerSignUpState.providerCompanyName,
                    providerEmail: providerSignUpState.providerEmail,
                    providerNumber: providerSignUpState.providerNumber,
                    providerDescription: providerSignUpState.providerDescription,
                }).catch((error) => {
                    alert(`in signup/fireStore_setDoc: Error Code ${error.code}: ${error.message}`)
                    setUserSignUpState({
                        providerFirstName: '',
                        providerLastName: '',
                        providerCompanyName: '',
                        providerEmail: '',
                        providerNumber: '',
                        providerDescription: '',
                        providerPassword: '',
                        providerConfirmPassword: ''
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
        setProviderSignUpState({
            providerFirstName: '',
            providerLastName: '',
            providerCompanyName: '',
            providerEmail: '',
            providerNumber: '',
            providerDescription: '',
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
            <div className='card-type1 signup-card signup-card2'>
                <div className='flex-row'>
                    <p>Sign up as a Service Provider?</p>
                    <MaterialSwitch onChange={handleSwitchCheck} color='primary' />
                </div>
            </div>
            {showProviderForm ?
                <div className='card-type2 signup-card'>
                    {loading ? <Loading /> :
                        <div className='ninetyfiveperc-container flex-column'>
                            <form onSubmit={onProviderSignUpSubmit} className='ninetyfiveperc-container'>
                                <h2 className='heading-type3'>Provider Sign Up</h2>
                                <div className='flex-column-stretch'>
                                    <div className='flex-row'>
                                        <p className='signup-instruction'>Please fill in the following details. All fields are compulsory.</p>
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Firstname: </p>
                                        <input type='text'
                                            name='providerFirstName'
                                            placeholder='John'
                                            value={providerSignUpState.providerFirstName}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Lastname: </p>
                                        <input
                                            type='text'
                                            name='providerLastName'
                                            placeholder='Doe'
                                            value={providerSignUpState.providerLastName}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Company Name: </p>
                                        <input
                                            type='text'
                                            name='providerCompanyName'
                                            placeholder='My Company'
                                            value={providerSignUpState.providerCompanyName}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Email: </p>
                                        <input
                                            type='text'
                                            name='providerEmail'
                                            placeholder='company@domain.com'
                                            value={providerSignUpState.providerEmail}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Contact No.: </p>
                                        <input
                                            type='text'
                                            name='providerNumber'
                                            placeholder='+91...'
                                            value={providerSignUpState.providerNumber}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-column-stretch signup-description'>
                                        <p>Enter a short description about your company: </p>
                                        <textarea
                                            name='providerDescription'
                                            placeholder='Company/Self-Employed, About..., Services...'
                                            value={providerSignUpState.providerDescription}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Choose a Password: </p>
                                        <input
                                            type='password'
                                            name='providerPassword'
                                            value={providerSignUpState.providerPassword}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Confirm Password: </p>
                                        <input
                                            type='password'
                                            name='providerConfirmPassword'
                                            value={providerSignUpState.providerConfirmPassword}
                                            onChange={handleProviderChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <div className='circle-avatar'>
                                            <PersonAdd style={globalIconStyle} />
                                        </div>
                                        <button value='Add a Photo'>Add a Photo</button>
                                    </div>
                                    <div className='flex-row'>
                                        <input type='submit' className='button' value='Submit' disabled={loading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
                :
                <div className='card-type1 signup-card'>
                    {loading ? <Loading /> :
                        <div className='ninetyfiveperc-container flex-column'>
                            <form onSubmit={onUserSignUpSubmit} className='eightyperc-container'>
                                <h2 className='heading-type3'>User Sign Up</h2>
                                <div className='flex-column-stretch'>
                                    <div className='flex-row'>
                                        <p className='signup-instruction'>Please fill in the following details. All fields are compulsory.</p>
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Firstname: </p>
                                        <input type='text'
                                            name='userFirstName'
                                            placeholder='John'
                                            value={userSignUpState.userFirstName}
                                            onChange={handleUserChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Lastname: </p>
                                        <input type='text'
                                            name='userLastName'
                                            placeholder='Doe'
                                            value={userSignUpState.userLastName}
                                            onChange={handleUserChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Enter Email: </p>
                                        <input
                                            type='text'
                                            name='userEmail'
                                            placeholder='johndoe@example.com'
                                            value={userSignUpState.userEmail}
                                            onChange={handleUserChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Choose a Password: </p>
                                        <input
                                            type='password'
                                            name='userPassword'
                                            value={userSignUpState.userPassword}
                                            onChange={handleUserChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <p>Confirm Password: </p>
                                        <input
                                            type='password'
                                            name='userConfirmPassword'
                                            value={userSignUpState.userConfirmPassword}
                                            onChange={handleUserChange}
                                        />
                                    </div>
                                    <div className='flex-row'>
                                        <div className='circle-avatar'>
                                            <PersonAdd style={globalIconStyle} />
                                        </div>
                                        <button value='Add a Photo' onClick={onAddPhotoClick}>Add a Photo</button>
                                    </div>
                                    <div className='flex-row'>
                                        <input type='submit' className='button' value='Submit' disabled={loading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            }

            <div className='card-type1 signup-card signup-card2'>
                <p>Existing user? <Link to='/login'>Log in</Link> instead.</p>
            </div>
        </div >
    )
}

export default SignUp

