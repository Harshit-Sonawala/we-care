import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, setDoc } from '@firebase/firestore'
import { db } from '../firebaseInit'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { Person, Delete } from '@material-ui/icons'
import { globalIconStyle } from '../assets/GlobalStyles'

const ProviderAccount = ({ providerData, setProviderData, onSignOutSubmit, onDeleteUser }) => {

    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [serviceInput, setServiceInput] = useState({
        serviceId: 0,
        serviceTitle: '',
        serviceDescription: '',
        serviceAvailable: true,
        servicePrice: 0.0
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
        const newService = { ...serviceInput, serviceId: newServiceId }
        //setServiceInput(serviceInput => ({ ...serviceInput, serviceId: newServiceId }))
        console.log(`serviceInput: ${JSON.stringify(serviceInput)}`)
        console.log(`newService: ${JSON.stringify(newService)}`)
        // Can't directly use providerData as it doesnt immediately get the synchronous data
        const finalServices = [...providerData.providerDataServices, newService]
        setProviderData(providerData => ({
            ...providerData,
            providerDataServices: finalServices
        }))
        await setDoc(doc(db, 'providers', currentUser.uid), {
            providerServices: finalServices
        }, { merge: true }).catch((error) => {
            console.log(`in providerAccount/addNewService/fireStore_setDoc: Error Code ${error.code}: ${error.message}`)
            setLoading(false)
            return
        })
        setServiceInput(serviceInput => ({
            serviceId: 0,
            serviceTitle: '',
            serviceDescription: '',
            serviceAvailable: true,
            servicePrice: 0.0
        }))
        setLoading(false)
    }

    const onDeleteService = (passedServiceId) => {
        console.log(`Service Id To Delete: ${passedServiceId}`)
        // setProviderData(providerData => providerData.providerDataServices.filter((service) => service.serviceId !== passedServiceId)
        // )
    }

    return (
        <>
            <div className='flex-row'>
                <div className='card-type1 account-card'>
                    <div className='flex-column-stretch eightyperc-container'>
                        <div className='flex-row'>
                            <div className='circle-avatar'>
                                <Person style={globalIconStyle} />
                            </div>
                        </div>
                        <h3 className='heading-type3 center-text'>{providerData.providerDataCompanyName}</h3>
                        <div className='flex-row'>
                            <p className='para-type2'>Account Manager:</p><p className='para-type1'>{providerData.providerDataFirstName} {providerData.providerDataLastName}</p>
                        </div>
                        <div className='flex-row'>
                            <p className='para-type2'>Email:</p><p className='para-type1'>{providerData.providerDataEmail}</p>
                        </div>
                        <div className='flex-row'>
                            <p className='para-type2'>Phone Number:</p><p className='para-type1'>{providerData.providerDataNumber}</p>
                        </div>
                        <div className='flex-row'>
                            <p className='para-type2'>About:</p>
                        </div>
                        <div className="flex-row">
                            <p className='para-type1'>{providerData.providerDataDescription}</p>
                        </div>
                        <div className='flex-row'>
                            <button className='button-type1' onClick={onSignOutSubmit}>Log Out</button>
                            <button className='button-type2' onClick={onDeleteUser}>Delete Account</button>
                        </div>
                    </div>
                </div>
                <div className='card-type1 account-card'>
                    <div className='flex-column-stretch eightyperc-container'>
                        <h4 className='heading-type3'>Your Services: {providerData.providerDataServices.length}</h4>
                        {(providerData.providerDataServices.length !== 0) ? providerData.providerDataServices.map((eachService) => (
                            <div className='flex-row' key={eachService.serviceId}>
                                <p className='para-type1'>{eachService.serviceId}</p>
                                <p className='para-type1'>{eachService.serviceTitle}</p>
                                <button className='button-type2' onClick={() => onDeleteService(eachService.serviceId)}><Delete /></button>
                            </div>
                        )) : <div className='flex-row'>
                            <p className='para-type2'>No Services Added</p>
                        </div>
                        }
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
                        <div className="flex-row">
                            <FormControlLabel control={
                                <Checkbox defaultChecked
                                    name='serviceAvailable'
                                    value={serviceInput.serviceAvailable}
                                    onChange={handleServiceInputChange}
                                />
                            } label="Available Now" />
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
