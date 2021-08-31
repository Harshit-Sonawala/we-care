// import { useState } from 'react'\
import Header from './Header'
import Categories from './Categories'
import Showcase from './Showcase'

const App = () => {
  return(
    <div className='main'>
      <Header />
      <Showcase />
      <Categories />
    </div>
  );
}

export default App;
