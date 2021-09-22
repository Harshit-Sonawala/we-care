import { useState } from 'react'
import { PersonAdd } from '@material-ui/icons'

import React from 'react'

const SignUp = () => {

    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')


    const onUserSignUpSubmit = (e) => {
        e.preventDefault()
        setUserFirstName('')
        setUserLastName('')
        setUserEmail('')
        setUserPassword('')
        setUserConfirmPassword('')
    }

    return (
        <div className='eightyperc-container'>
            <div className='card-type1 signup-card'>
                <div className='ninetyfiveperc-container flex-container'>
                    <form onSubmit={onUserSignUpSubmit} className='eightyperc-container'>
                        <h2 className='heading-type3'>User Sign Up</h2>
                        <div className="signup-flex-column">
                            <div className="signup-flex-row">
                                <p>Enter Firstname: </p>
                                <input type='text'
                                    placeholder='John'
                                    value={userFirstName}
                                    onChange={(e) => setUserFirstName(e.target.value)}
                                />
                            </div>
                            <div className="signup-flex-row">
                                <p>Enter Lastname: </p>
                                <input type='text'
                                    placeholder='Doe'
                                    value={userLastName}
                                    onChange={(e) => setUserLastName(e.target.value)}
                                />
                            </div>
                            <div className="signup-flex-row">
                                <p>Enter Email: </p>
                                <input type='text'
                                    placeholder='abc@example.com'
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </div>
                            <div className="signup-flex-row">
                                <p>Choose a Password: </p>
                                <input type='password'
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                />
                            </div>
                            <div className="signup-flex-row">
                                <p>Confirm Password: </p>
                                <input type='password'
                                    value={userConfirmPassword}
                                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="signup-flex-row">
                                <div className='circle-avatar'>
                                    <PersonAdd style={{ color: '#401BE7', height: '70px', width: '70px' }} />
                                </div>
                                <button value="Add a Photo">Add a Photo</button>
                            </div>
                            <input type='submit' className='button' value='Submit' />
                        </div>
                    </form>
                </div>
            </div >
            <div className='card-type1 account-card account-card2'>
                <p>Existing user? Log in instead.</p>
            </div>
        </div >
    )
}

export default SignUp

