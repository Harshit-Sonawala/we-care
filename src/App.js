// import { useState } from 'react'\
import Header from './components/Header'
import Categories from './components/Categories'
import Showcase from './components/Showcase'
import Footer from './components/Footer'

const App = () => {
  return(
    <div className='main'>
      <Header />
      <Showcase />
      <Categories />
      <Footer />
    </div>
  );
}

export default App;
