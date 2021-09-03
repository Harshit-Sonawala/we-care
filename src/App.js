// import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Categories from './components/Categories'
import Showcase from './components/Showcase'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  return(
    <Router>
      <div className='main'>
        <Header />
        <Route path='/about' component={About} />
        <Route path='/' exact render={(props) => (
          <>
            <Showcase />
            <Categories />
          </>
        )}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
