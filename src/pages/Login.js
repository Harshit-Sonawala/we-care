import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
//import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'
//import Account from './Account'
import { Person } from '@material-ui/icons'
import LoadingGif from '../assets/images/loading.gif'
import globalPrimaryColor from '../assets/colors'

const Login = () => {

    const history = useHistory()
    //const { currentUser } = useContext(AuthContext)
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
            await signInWithEmailAndPassword(auth, logInState.loginEmail, logInState.loginPassword).then((userResponse) => {
                const finalUser = userResponse.user
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
                        <form onSubmit={onLoginSubmit} className='eightyperc-container'>
                            <h2 className='heading-type3'>Log in</h2>
                            <p>Enter Email:</p>
                            <input type='text'
                                name='loginEmail'
                                placeholder='abc@example.com'
                                value={logInState.loginEmail}
                                onChange={handleLoginChange}
                            />
                            <p>Enter Password:</p>
                            <input type='password'
                                name='loginPassword'
                                value={logInState.loginPassword}
                                onChange={handleLoginChange}
                            />
                            <input type='submit' className='button' value='Submit' disabled={loading} />
                            <p className='center-text'>Forgot Password?</p>
                        </form>
                    </div>
                }
            </div>
            <div className='card-type1 login-card login-card2'>
                <p>New user? <Link to='/signup'>Create an account</Link> instead.</p>
            </div>
        </div>
    )
}

export default Login
