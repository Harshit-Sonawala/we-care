import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseInit'
import { Person } from '@mui/icons-material'
import Loading from '../components/Loading'
import { globalIconStyle } from '../assets/GlobalStyles'

const Login = () => {

    const history = useHistory()
    const { setIsProvider } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [logInState, setlogInState] = useState({
        loginEmail: '',
        loginPassword: ''
    })

    const handleLoginChange = (e) => {
        setlogInState({
            ...logInState,
            [e.target.name]: e.target.value
        })
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault()
        if (logInState.loginEmail && logInState.loginPassword) {
            setLoading(true)
            await signInWithEmailAndPassword(auth, logInState.loginEmail, logInState.loginPassword).then(async (userResponse) => {
                const finalUser = userResponse.user
                const docSnap = await getDoc(doc(db, 'providers', finalUser.uid))
                if (docSnap.exists()) {
                    setIsProvider(true)
                    console.log(`isProvider true in login`)
                } else {
                    console.log(`isProvider false in login`)
                }
                alert(`Successfully logged in with finalUser.uid: ${finalUser.uid}`)
                history.push('/')
            }).catch((error) => {
                alert(`in login/firebaseSignInEmail: Error Code ${error.code}: ${error.message}`)
                setlogInState({
                    loginEmail: '',
                    loginPassword: ''
                })
                setLoading(false)
                return
            })
        } else {
            alert('Please enter the Email and Password.')
            return
        }
        setlogInState({
            loginEmail: '',
            loginPassword: ''
        })
        setLoading(false)
    }

    return (
        <div className='eightyperc-container'>
            <div className='card-type1 login-card'>
                {loading ? <Loading /> :
                    <div className='ninetyfiveperc-container flex-column'>
                        <div className='circle size100px'>
                            <Person style={globalIconStyle} />
                        </div>
                        <form onSubmit={onLoginSubmit} className='eightyperc-container'>
                            <h2 className='heading-type3'>Log in</h2>
                            <div className='flex-column-stretch'>
                                <div className='flex-row left-justify'>
                                    <p>Enter Email:</p>
                                </div>
                                <div className='flex-row'>
                                    <input type='text'
                                        name='loginEmail'
                                        placeholder='abc@example.com'
                                        value={logInState.loginEmail}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <div className='flex-row left-justify'>
                                    <p>Enter Password:</p>
                                </div>
                                <div className='flex-row'>
                                    <input type='password'
                                        name='loginPassword'
                                        value={logInState.loginPassword}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <div className='flex-row'>
                                    <input type='submit' className='button' value='Submit' disabled={loading} />
                                </div>
                            </div>
                            <p className='center-text'>Forgot Password?</p>
                        </form>
                    </div>
                }
            </div>
            <div className='card-type1 login-card login-card2'>
                <p>New user? <Link to='/signup' className='blue-link'>Create an account</Link> instead.</p>
            </div>
        </div>
    )
}

export default Login
