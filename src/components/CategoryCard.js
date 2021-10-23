import React from 'react'
import { HashLink } from 'react-router-hash-link'

const CategoryCard = ({ title, bgImg }) => {

    const cardBgStyle = {
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`
    }

    return (
        <div className='category-card' style={cardBgStyle}>
            <HashLink to={`/services#${title}`}>
                <div className='category-card-title'>{title}</div>
            </HashLink>
        </div>
    )
}

export default CategoryCard
