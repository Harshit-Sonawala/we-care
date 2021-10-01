import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { FirebaseContext } from './contexts/FirebaseContext'
import Header from './components/Header'
import Services from './pages/Services'
import About from './pages/About'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'


const App = () => {

    const [currentUser, setCurrentUser] = useState()

    return (
        <FirebaseContext.Provider value={{ currentUser, setCurrentUser }}>
            <Router>
                <div className='main'>
                    <Header />
                    <Route path='/' exact render={(props) => (
                        <Homepage />
                    )} />
                    <Route path='/services' component={Services} />
                    <Route path='/about' component={About} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={SignUp} />
                    <Footer />
                </div>
            </Router>
        </FirebaseContext.Provider>
    );
}

export default App;
