import React from 'react'
import SearchBar from './SearchBar'

const Showcase = () => {
    return (
        <div className='showcase-main'>
            <div className='showcase-header'>
                <div className='eightyperc-container'>
                    <h1 className='heading-type1'>Solutions for all your home and personal needs.</h1>
                    <h3 className='heading-type2'>Best in class service all year round</h3>
                </div>
            </div>
            <div className='eightyperc-container'>
                <SearchBar />
            </div>
        </div>
    )
}

export default Showcase
