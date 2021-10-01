import React from 'react'

const LandingCard = ({ title, subtitle, imagePath, altText }) => {
    return (
        <div className="eightyperc-container">
            <div className="card-type1 landing-card">
                <div className="landing-image">
                    <img src={imagePath} alt={altText} />
                </div>
                <div className="landing-content">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
            </div>
        </div>
    )
}

export default LandingCard
