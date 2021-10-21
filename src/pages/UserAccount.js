import React from 'react'
import { Person, Logout, Delete } from '@mui/icons-material'
import { globalIconStyle } from '../assets/GlobalStyles'

const UserAccount = ({ userData, onSignOutSubmit, onDeleteUser }) => {
    return (
        <div className='card-type1 account-card auto-side-margin'>
            <div className='eightyperc-container flex-column-stretch'>
                <div className='flex-row'>
                    <div className='circle size100px'>
                        <Person style={globalIconStyle} />
                    </div>
                </div>
                <h3 className='heading-type3 center-text'>{userData.userDataFirstName} {userData.userDataLastName}</h3>
                <div className='flex-row'>
                    <p className='para-type2'>Email:</p><p className='grey-container'>{userData.userDataEmail}</p>
                </div>
                <div className='flex-row'>
                    <p className='para-type2'>Address:</p><p className='grey-container'>{userData.userDataEmail}</p>
                </div>
                <div className='flex-row'>
                    <p className='para-type2'>Phone Number:</p><p className='grey-container'>{userData.userDataEmail}</p>
                </div>
                <div className='flex-row'>
                    <button className='button-type1' onClick={onSignOutSubmit}><Logout />Log Out</button>
                    <button className='button-type2' onClick={onDeleteUser}><Delete />Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default UserAccount
