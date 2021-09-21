import { useState } from 'react'
import { Person } from '@material-ui/icons'

const Login = () => {

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const onLoginSubmit = (e) => {
        e.preventDefault()
        if (!loginEmail) {
            alert('Please enter the Email and Password.')
            return
        }
        setLoginEmail('')
        setLoginPassword('')
    }

    return (
        <div className='eightyperc-container'>
            <div className='card-type1 account-card'>
                <div className='ninetyfiveperc-container flex-container'>
                    <div className='circle-avatar'>
                        <Person style={{ color: '#401BE7', height: '70px', width: '70px' }} />
                    </div>
                    <form onSubmit={onLoginSubmit} className='eightyperc-container'>
                        <h2 className='heading-type3'>Log in</h2>
                        <p>Enter Email:</p>
                        <input type='text'
                            placeholder='john@example.com'
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <p>Enter Password:</p>
                        <input type='password'
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <input type="submit" className="button" value="Submit" />
                        <p className='centerText'>Forgot Password?</p>
                    </form>
                </div>
            </div>
            <div className='card-type1 account-card account-card2'>
                <p>New user? Create an account instead.</p>
            </div>
        </div>
    )
}

export default Login
