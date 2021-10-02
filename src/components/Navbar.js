import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <header className='header'>
            <div className='eightyperc-container'>
                <div className='header-main'>
                    <Link to='/'>
                        <h1>WeCare</h1>
                    </Link>
                    <div className='header-nav'>
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
