import React from 'react'
import { AccountCircle, MonetizationOn } from '@mui/icons-material'

const ServiceCard = ({ passedService, passedIndex }) => {
    const displayIndex = passedIndex + 1
    return (
        <div className='flex-row stretch-justify' key={displayIndex}>
            <div className='service-card'>
                <div className="flex-row left-justify">
                    <p className='circle index-circle'>{displayIndex}</p>
                    <p className='para-type2'>{passedService.serviceTitle}</p>
                    <div className='flex-row left-justify'>
                        <AccountCircle /><p>By:</p><p className='para-type1'>{passedService.serviceProvider}</p>
                    </div>
                    <div className='flex-max'></div>
                    <p className='para-type3 icon-para'><MonetizationOn />Price: Rs. {passedService.servicePrice}</p>
                </div>

                <div className="flex-row left-justify">
                    <p className='grey-container'>{passedService.serviceDescription}</p>
                    {/* <button className='button-type2' onClick={() => onDeleteService(passedService.serviceId)}><Delete /></button> */}
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
