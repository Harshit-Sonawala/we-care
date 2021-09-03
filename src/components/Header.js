import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className='header'>
            <div className='eightyperc-container'>
                <div className='header-main'>
                    <Link to='/'>
                    <h1>WeCare</h1>
                    </Link>
                    <div class='header-nav'>
                        <button>Services</button>
                        <Link to='/about'>
                            <button>About</button>
                        </Link>
                        <button>Other</button>
                        <button>Account</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
