// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Services from './pages/Services'
import About from './pages/About'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'

const App = () => {
    return (
        <Router>
            <div className='main'>
                <Header />
                <Route path='/' exact render={(props) => (
                    <Homepage />
                )} />
                <Route path='/services' component={Services} />
                <Route path='/about' component={About} />
                <Route path='/login' component={Login} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
