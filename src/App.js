import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Services from './pages/Services'
import About from './pages/About'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'


const App = () => {

    return (
        <AuthProvider>
            <Router>
                <div className='main'>
                    <Navbar />
                    <Route path='/' exact render={(props) => (
                        <Homepage />
                    )} />
                    <Route exact path='/services' component={Services} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <PrivateRoute exact path='/account' component={Account} />
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
