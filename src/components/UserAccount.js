import { Person } from '@material-ui/icons'
import { globalIconStyle } from '../assets/GlobalStyles'

const UserAccount = ({ userData }) => {
    return (
        <>
            <div className="flex-row">
                <div className='circle-avatar'>
                    <Person style={globalIconStyle} />
                </div>
            </div>
            <h3 className='heading-type3 center-text'>{userData.userDataFirstName} {userData.userDataLastName}</h3>
            <div className='flex-row'>
                <p className='para-type2'>Email:</p><p className='para-type1'>{userData.userDataEmail}</p>
            </div>
            <div className='flex-row'>
                <p className='para-type2'>Address:</p><p className='para-type1'>{userData.userDataEmail}</p>
            </div>
            <div className='flex-row'>
                <p className='para-type2'>Phone Number:</p><p className='para-type1'>{userData.userDataEmail}</p>
            </div>
        </>
    )
}

export default UserAccount
