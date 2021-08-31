const CategoryCard = ({ title, bgImg }) => {

    const cardBg = {
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
    }

    return (
        <div className='category-card' style={cardBg}>
            <div className='category-card-title'>{title}</div>
        </div>
    )
}

export default CategoryCard
