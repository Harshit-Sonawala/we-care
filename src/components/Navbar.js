import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import WeCareLogoBig from '../assets/images/WeCareLogoBig.png'

const Navbar = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <header className='navbar'>
            <div className='eightyperc-container'>
                <div className='navbar-main'>
                    <Link to='/'>
                        <img className="logo" src={WeCareLogoBig} alt="WeCare" />
                    </Link>
                    <div className='navbar-nav'>
                        <Link to='/services'><button>Services</button></Link>
                        <Link to='/about'><button>About</button></Link>
                        {
                            currentUser ? <Link to='/account'><button>Account</button></Link>
                                : <Link to='/login'><button>Log In</button></Link>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
