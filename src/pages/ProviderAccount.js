import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, updateDoc } from '@firebase/firestore'
import { db, storage } from '../firebaseInit'
import { ref, uploadBytes } from '@firebase/storage'
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
        serviceProvider: '',
        serviceImageName: '',
    })
    const [finalServiceImageInput, setFinalServiceImageInput] = useState(null)

    const handleServiceInputChange = (e) => {
        setServiceInput({
            ...serviceInput,
            [e.target.name]: e.target.value
        })
    }

    const handleServiceImageInputChange = (e) => {
        if (e.target.files[0]) {
            setServiceInput(serviceInput => ({
                ...serviceInput,
                serviceImageName: serviceInput.serviceTitle + '_' + e.target.files[0].name,
            }))
            setFinalServiceImageInput(finalServiceImageInput => e.target.files[0])
            console.log('image uploaded: ', finalServiceImageInput)
            if (finalServiceImageInput !== null) {
                console.log('image name: ', serviceInput.serviceImageName)
            }
        }
    };

    const onAddServiceSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Uploading the service image to firebase storage:
        const uploadToRef = ref(storage, `serviceImages/${providerData.providerDataCompanyName}/${serviceInput.serviceImageName}`)
        await uploadBytes(uploadToRef, finalServiceImageInput).then((snapshot) => {
            console.log('Uploaded File Snapshot: ', snapshot);
        })
        // Can't directly update providerData as it doesnt immediately get the synchronous data
        const newServiceId = (providerData.providerDataServices.length) + 1
        const newService = {
            ...serviceInput,
            serviceId: newServiceId,
            serviceProvider: providerData.providerDataCompanyName
        }
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
            serviceProvider: '',
            serviceImageName: '',
            serviceImageDownloadURL: '',
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
                                <ServiceCard2 passedService={eachService} passedIndex={serviceIndex} onDeleteItem={() => { }} showDelete={false} />
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
                        <div className="flex-row mv-10">
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
                        <div className='flex-row'>
                            <p>Upload an Image:</p>
                            <input type='file'
                                onChange={handleServiceImageInputChange}
                            />
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
