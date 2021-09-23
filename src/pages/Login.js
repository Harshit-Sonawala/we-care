import { useState } from 'react'
import { Person } from '@material-ui/icons'
import { firebaseSignInEmail } from '../firebase'
import { Link } from 'react-router-dom'
import globalPrimaryColor from '../assets/colors'

const Login = () => {

    const [logInState, setlogInState] = useState({
        loginEmail: '',
        loginPassword: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLoginChange = (e) => {
        setlogInState({
            ...logInState,
            [e.target.name]: e.target.value
        })
    }

    const onLoginSubmit = (e) => {
        e.preventDefault()
        if (logInState.loginEmail && logInState.loginPassword) {
            try {
                setError('')
                setLoading(true)
                const finalLoginEmail = logInState.loginEmail
                const finalLoginPassword = logInState.loginPassword
                firebaseSignInEmail(finalLoginEmail, finalLoginPassword)
            } catch {
                setError('Failed to create user account.')
                console.log(error)
                return
            }
        } else {
            alert('Please enter the Email and Password.')
            setError('Incomplete fields.')
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
                        <p className='centerText'>Forgot Password?</p>
                    </form>
                </div>
            </div>
            <div className='card-type1 login-card login-card2'>
                <p>New user? <Link to='/signup'>Create an account</Link> instead.</p>
            </div>
        </div>
    )
}

export default Login
