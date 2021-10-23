import React from 'react'
import CategoryCard from './CategoryCard'

import cleaningImg from '../assets/images/cleaning.jpg'
import electricianImg from '../assets/images/electrician.jpeg'
import plumberImg from '../assets/images/plumber.jpeg'
import carpenterImg from '../assets/images/carpenter.jpeg'
import pestcontImg from '../assets/images/pest_cont.jpg'
import womensalonImg from '../assets/images/women_salon.jpg'
import mensalonImg from '../assets/images/men_salon.jpg'
import massageImg from '../assets/images/massage.jpg'
import miscImg from '../assets/images/misc.jpg'

const Categories = () => {

    return (
        <div className='category-main'>
            <div className='ninetyfiveperc-container'>
                <h2 className='heading-type3'>Categories:</h2>
                <div className='category-container'>
                    <CategoryCard title={'Cleaning'} bgImg={cleaningImg} />
                    <CategoryCard title={'Electricians'} bgImg={electricianImg} />
                    <CategoryCard title={'Plumbers'} bgImg={plumberImg} />
                    <CategoryCard title={'Carpenters'} bgImg={carpenterImg} />
                    <CategoryCard title={'Pest Control'} bgImg={pestcontImg} />
                    <CategoryCard title={'Salon for Women'} bgImg={womensalonImg} />
                    <CategoryCard title={'Salon for Men'} bgImg={mensalonImg} />
                    <CategoryCard title={'Massage'} bgImg={massageImg} />
                    <CategoryCard title={'Miscellanious'} bgImg={miscImg} />
                </div>
            </div>
        </div>
    )
}

export default Categories
