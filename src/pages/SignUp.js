import { useState } from 'react'
import { PersonAdd } from '@material-ui/icons'
import { firebaseCreateUserEmail } from '../firebase'
import { Link } from 'react-router-dom'

const SignUp = () => {

    const [signUpState, setSignUpState] = useState({
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUserChange = (e) => {
        setSignUpState({
            ...signUpState,
            [e.target.name]: e.target.value
        })
    }

    const onUserSignUpSubmit = (e) => {
        e.preventDefault()
        console.log(signUpState)
        if (signUpState.userFirstName && signUpState.userLastName && signUpState.userEmail && signUpState.userPassword && signUpState.userConfirmPassword) {
            if (signUpState.userPassword === signUpState.userConfirmPassword) {
                try {
                    setError('')
                    setLoading(true)
                    const finalUserEmail = signUpState.userEmail
                    const finalUserPassword = signUpState.userPassword
                    firebaseCreateUserEmail(finalUserEmail, finalUserPassword)
                } catch {
                    setError('Failed to create user account.')
                    console.log(error)
                    return
                }
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
        setSignUpState({
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPassword: '',
            userConfirmPassword: ''
        })
        setLoading(false)
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
                                    value={signUpState.userFirstName}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Lastname: </p>
                                <input type='text'
                                    name='userLastName'
                                    placeholder='Doe'
                                    value={signUpState.userLastName}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Enter Email: </p>
                                <input type='text'
                                    name='userEmail'
                                    placeholder='abc@example.com'
                                    value={signUpState.userEmail}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Choose a Password: </p>
                                <input type='password'
                                    name='userPassword'
                                    value={signUpState.userPassword}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <p>Confirm Password: </p>
                                <input type='password'
                                    name='userConfirmPassword'
                                    value={signUpState.userConfirmPassword}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className='signup-flex-row'>
                                <div className='circle-avatar'>
                                    <PersonAdd style={{ color: '#401BE7', height: '70px', width: '70px' }} />
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

