import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../firebaseInit'
import ServiceCard2 from '../components/ServiceCard2'
import { Checkbox, FormControl, Select, MenuItem } from '@mui/material'
import { Person, Logout, Delete } from '@mui/icons-material'
import { globalIconStyle } from '../assets/GlobalStyles'

const ProviderAccount = ({ providerData, setProviderData, onSignOutSubmit, onDeleteUser }) => {

    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [serviceInput, setServiceInput] = useState({
        serviceId: 0,
        serviceTitle: '',
        serviceDescription: '',
        serviceCategory: '',
        servicePrice: 0.0,
        serviceAvailable: true,
        serviceProvider: ''
    })

    const handleServiceInputChange = (e) => {
        setServiceInput({
            ...serviceInput,
            [e.target.name]: e.target.value
        })
    }

    const onAddServiceSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const newServiceId = (providerData.providerDataServices.length) + 1
        console.log(`newServiceId: ${newServiceId}`)
        const newService = { ...serviceInput, serviceId: newServiceId, serviceProvider: providerData.providerDataCompanyName }
        // Can't directly use providerData as it doesnt immediately get the synchronous data
        const finalServices = [...providerData.providerDataServices, newService]
        setProviderData(providerData => ({
            ...providerData,
            providerDataServices: finalServices
        }))
        await updateDoc(doc(db, 'providers', currentUser.uid), {
            providerServices: finalServices
        }).catch((error) => {
            console.log(`in providerAccount/addNewService/fireStore_upDoc: Error Code ${error.code}: ${error.message}`)
            setLoading(false)
            return
        })
        setServiceInput(serviceInput => ({
            serviceId: 0,
            serviceTitle: '',
            serviceDescription: '',
            serviceCategory: '',
            servicePrice: 0.0,
            serviceAvailable: true,
            serviceProvider: ''
        }))
        setLoading(false)
    }

    // const onDeleteService = async (passedServiceId) => {
    //     setLoading(true)
    //     const finalServices = [...providerData.providerDataServices]
    //     finalServices.filter((eachService) => eachService.serviceId !== passedServiceId)
    //     setProviderData(providerData => ({
    //         ...providerData,
    //         providerDataServices: finalServices
    //     }))
    //     console.log(`finalServices: ${JSON.stringify(finalServices)}`)
    //     await updateDoc(doc(db, 'providers', currentUser.uid), {
    //         providerServices: finalServices
    //     }).catch((error) => {
    //         console.log(`in providerAccount/deleteService/fireStore_upDoc: Error Code ${error.code}: ${error.message}`)
    //         setLoading(false)
    //         return
    //     })
    //     setLoading(false)
    // }

    return (
        <>
            <div className='flex-row'>
                <div className='card-type1 account-card'>
                    <div className='flex-column-stretch eightyperc-container'>
                        <div className='flex-row'>
                            <div className='circle size100px'>
                                <Person style={globalIconStyle} />
                            </div>
                        </div>
                        <h3 className='heading-type3 center-text'>{providerData.providerDataCompanyName}</h3>
                        <div className='flex-row'>
                            <p className='para-type2'>Account Manager:</p><p className='grey-container'>{providerData.providerDataFirstName} {providerData.providerDataLastName}</p>
                        </div>
                        <div className='flex-row'>
                            <p className='para-type2'>Email:</p><p className='grey-container'>{providerData.providerDataEmail}</p>
                        </div>
                        <div className='flex-row'>
                            <p className='para-type2'>Phone Number:</p><p className='grey-container'>{providerData.providerDataNumber}</p>
                        </div>
                        <div className='flex-row left-justify'>
                            <p className='para-type2'>About Your Company:</p>
                        </div>
                        <div className="flex-row">
                            <p className='grey-container'>{providerData.providerDataDescription}</p>
                        </div>
                        <div className='flex-row'>
                            <button className='button-type1' onClick={onSignOutSubmit}><Logout />Log Out</button>
                            <button className='button-type2' onClick={onDeleteUser}><Delete />Delete Account</button>
                        </div>
                    </div>
                </div>
                <div className='card-type1 account-card'>
                    <div className='flex-column-stretch ninetyfiveperc-container'>
                        <h4 className='heading-type3'>Your Services: {providerData.providerDataServices.length}</h4>
                        <div className="flex-column-stretch dark-grey-container">
                            {(providerData.providerDataServices.length !== 0) ? providerData.providerDataServices.map((eachService, serviceIndex) => (
                                <ServiceCard2 passedService={eachService} serviceIndex={serviceIndex} />
                            )) : <div className='flex-row'>
                                <p className='para-type2'>No Services Added</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='card-type1 account-card auto-side-margin'>
                <form onSubmit={onAddServiceSubmit} className='eightyperc-container'>
                    <h4 className='heading-type3'>Add a New Service</h4>
                    <div className='flex-column-stretch'>
                        <div className='flex-row'>
                            <p>Service Title:</p>
                            <input type='text'
                                name='serviceTitle'
                                placeholder='My Service'
                                value={serviceInput.serviceTitle}
                                onChange={handleServiceInputChange}
                            />
                        </div>
                        <div className='flex-column-stretch signup-description'>
                            <p>Enter Service Description: </p>
                            <textarea
                                name='serviceDescription'
                                placeholder='About my service...'
                                value={serviceInput.serviceDescription}
                                onChange={handleServiceInputChange}
                            />
                        </div>
                        <div className='flex-row'>
                            <p>Service Price: Rs.</p>
                            <input type='text'
                                name='servicePrice'
                                placeholder='0.00'
                                value={serviceInput.servicePrice}
                                onChange={handleServiceInputChange}
                            />
                        </div>
                        <div className="flex-row">
                            <p>Service Category: </p>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                                <Select
                                    name='serviceCategory'
                                    value={serviceInput.serviceCategory}
                                    onChange={handleServiceInputChange}
                                >
                                    <MenuItem value=''>None</MenuItem>
                                    <MenuItem value={'Cleaning'}>Cleaning</MenuItem>
                                    <MenuItem value={'Electricians'}>Electricians</MenuItem>
                                    <MenuItem value={'Plumbers'}>Plumbers</MenuItem>
                                    <MenuItem value={'Carpenters'}>Carpenters</MenuItem>
                                    <MenuItem value={'Pest Control'}>Pest Control</MenuItem>
                                    <MenuItem value={'Salon for Women'}>Salon for Women</MenuItem>
                                    <MenuItem value={'Salon for Men'}>Salon for Men</MenuItem>
                                    <MenuItem value={'Massage'}>Massage</MenuItem>
                                    <MenuItem value={'Miscellanious'}>Miscellanious</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="flex-row">
                            <p>Available Now</p>
                            <Checkbox defaultChecked
                                name='serviceAvailable'
                                value={serviceInput.serviceAvailable}
                                onChange={handleServiceInputChange}
                            />
                        </div>
                        <div className='flex-row'>
                            <input type='submit' className='button' value='Submit' disabled={loading} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProviderAccount
