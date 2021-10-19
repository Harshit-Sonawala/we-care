import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import WeCareLogoBig from '../assets/images/WeCareLogoBig.png'
import { ViewList, Info, AccountBox, Login } from '@mui/icons-material'
const Navbar = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <header className='navbar'>
            <div className='eightyperc-container'>
                <div className='navbar-main'>
                    <Link to='/'>
                        <img className='logo' src={WeCareLogoBig} alt='WeCare' />
                    </Link>
                    <div className='navbar-nav'>
                        <Link to='/services'><button><ViewList />Services</button></Link>
                        <Link to='/about'><button><Info />About</button></Link>
                        {
                            currentUser ? <Link to='/account'><button><AccountBox />Account</button></Link>
                                : <Link to='/login'><button><Login />Log In</button></Link>
                        }
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Navbar
