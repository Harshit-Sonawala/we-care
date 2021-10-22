import React from 'react'
import { Widgets, MonetizationOn, RemoveShoppingCart } from '@mui/icons-material'

const ServiceCard2 = ({ passedService, passedIndex, onDeleteItem }) => {
    const displayIndex = passedIndex + 1
    return (
        <div className='flex-row stretch-justify' key={passedIndex}>
            <div className='service-card'>
                <div className="flex-row left-justify">
                    <p className='circle index-circle'>{displayIndex}</p>
                    <p className='para-type2'>{passedService.serviceTitle}</p>
                </div>
                <div className="flex-row stretch-justify">
                    <p className='grey-container'>{passedService.serviceDescription}</p>
                </div>
                <div className="flex-row left-justify">
                    <p className='para-type2 icon-para'><Widgets />{passedService.serviceCategory}</p>
                    <p className='para-type3 icon-para'><MonetizationOn />Price: Rs. {passedService.servicePrice}</p>
                    <button className='button-type2' onClick={() => onDeleteItem(passedIndex)}><RemoveShoppingCart />Remove</button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard2
