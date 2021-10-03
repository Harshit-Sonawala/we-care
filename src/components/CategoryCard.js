const CategoryCard = ({ title, bgImg }) => {

    const cardBgStyle = {
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`
    }

    return (
        <div className='category-card' style={cardBgStyle}>
            <div className='category-card-title'>{title}</div>
        </div>
    )
}

export default CategoryCard
