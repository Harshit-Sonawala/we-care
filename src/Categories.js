import CategoryCard from './CategoryCard'

const Categories = () => {
    return (
        <div className='ninetyfiveperc-container'>
            <div className='category-main'>
                <div className='ninetyfiveperc-container'>
                    <h2 className='heading-type3'>Categories:</h2>
                </div>
                <div className='category-container'>
                    <CategoryCard title={'Cleaning & Disinfection'}/>
                    <CategoryCard title={'Electricians'}/>
                    <CategoryCard title={'Plumbers'}/>
                    <CategoryCard title={'Salon for Men'}/>
                    <CategoryCard title={'Salon for Women'}/>
                    <CategoryCard title={'Beauty'}/>
                    <CategoryCard title={'Massage'}/>
                    <CategoryCard title={'Carpenters'}/>
                    <CategoryCard title={'Pest Control'}/>
                </div>
            </div>
        </div>
    )
}

export default Categories
