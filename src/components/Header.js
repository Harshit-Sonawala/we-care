import { Link } from 'react-router-dom'

const Header = () => {

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
                        {/* <button>Other</button> */}
                        <Link to='/signup'><button>Sign Up</button></Link>
                        <Link to='/login'><button>Log In</button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header