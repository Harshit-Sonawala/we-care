import React from 'react'
import { AccountCircle, MonetizationOn, AddShoppingCart } from '@mui/icons-material'
import { ref, getDownloadURL } from '@firebase/storage'
import { storage } from '../firebaseInit'

const ServiceCard = ({ passedService, passedIndex, showButton, onAddToCart }) => {

    const displayIndex = passedIndex + 1

    const getImageURL = async (passedService) => {
        const uploadedRef = ref(storage, `serviceImages/${passedService.serviceProvider}/${passedService.serviceImageName}`)
        await getDownloadURL(uploadedRef).then((url) => {
            const img = document.getElementById(passedService.serviceProvider + passedService.serviceImageName);
            img.setAttribute('src', url);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='flex-row stretch-justify' key={passedIndex}>
            <div className='service-card'>
                <div className="flex-row left-justify">
                    {passedService.serviceImageName !== undefined ?
                        <div className='service-image'>
                            <img src={getImageURL(passedService)} alt={passedService.serviceTitle} className='final-service-image' id={passedService.serviceProvider + passedService.serviceImageName} />
                        </div> : <></>
                    }


                    <div className='flex-col'>
                        <div className="flex-row left-justify">
                            <p className='circle index-circle'>{displayIndex}</p>
                            <p className='para-type2'>{passedService.serviceTitle}</p>
                            <div className='flex-row left-justify'>
                                <AccountCircle /><p>By:</p><p className='para-type1'>{passedService.serviceProvider}</p>
                            </div>
                        </div>
                        <div className="flex-row left-justify">
                            <p className='grey-container service-description'>{passedService.serviceDescription}</p>
                            <div className='flex-max' />
                        </div>
                        <div className="flex-row left-justify">
                            <p className='para-type3 icon-para'><MonetizationOn />Price: Rs. {passedService.servicePrice}</p>
                            {showButton ? <button className='button-type1' onClick={() => onAddToCart(passedService.serviceCategory, passedIndex)}><AddShoppingCart /> Add To Cart</button> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
