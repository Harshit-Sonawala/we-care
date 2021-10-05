import React from 'react'
import LoadingGif from '../assets/images/loading.gif'

const Loading = () => {
    return (
        <img
            src={LoadingGif}
            className='loading-gif'
            alt='Loading...'
            style={{
                width: '70px',
                height: '70px',
                margin: 'auto',
                display: 'block'
            }}
        />
    )
}

export default Loading
