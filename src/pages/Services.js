import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, collection, query, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseInit'
import Categories from '../components/Categories'
import ServiceCard from '../components/ServiceCard'
import Loading from '../components/Loading'

const Services = () => {

    const { currentUser, isProvider } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [cleaningServices, setCleaningServices] = useState([])
    const [electricianServices, setElectricianServices] = useState([])
    const [userData, setUserData] = useState({
        userDataFirstName: '',
        userDataLastName: '',
        userDataEmail: '',
        userDataCart: []
    })

    useEffect(() => {
        readServices().then(readUserData())
        // eslint-disable-next-line
    }, [])

    const readServices = async () => {
        setLoading(true)
        const q = query(collection(db, 'providers'))
        const docSnap = await getDocs(q)
        var readData = []
        var allServices = []
        var i = 0
        if (docSnap) {
            docSnap.forEach((doc) => {
                //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
                readData[i] = doc.data()
                i++
            })
            // allServices = readData.map(eachDoc => eachDoc.providerServices)
            allServices = [...new Set([].concat(...readData.map((o) => o.providerServices)))]
            setCleaningServices(cleaningServices => allServices.filter(eachService => eachService.serviceCategory === 'Cleaning'))
            setElectricianServices(electricianServices => allServices.filter(eachService => eachService.serviceCategory === 'Electricians'))
        } else {
            console.log('not found')
        }
        setLoading(false)
    }

    const readUserData = async () => {
        if (currentUser != null) {
            var docSnap = await getDoc(doc(db, 'users', currentUser.uid))
            if (docSnap.exists()) {
                console.log(`Fetched user data:`, docSnap.data())
                setUserData({
                    ...userData,
                    userDataFirstName: docSnap.data().userFirstName,
                    userDataLastName: docSnap.data().userLastName,
                    userDataEmail: docSnap.data().userEmail,
                    userDataCart: docSnap.data().userCart
                })
            } else {
                console.log(`Not signed in by user.`)
            }
        }
    }

    const onAddToCart = async (passedCategory, passedIndex) => {
        setLoading(true)
        if (currentUser != null) {
            var whichServices = null
            console.log(`Adding ${passedCategory} ${passedIndex} to cart.`)
            // <MenuItem value={'Plumbers'}>Plumbers</MenuItem>
            // <MenuItem value={'Carpenters'}>Carpenters</MenuItem>
            // <MenuItem value={'Pest Control'}>Pest Control</MenuItem>
            // <MenuItem value={'Salon for Women'}>Salon for Women</MenuItem>
            // <MenuItem value={'Salon for Men'}>Salon for Men</MenuItem>
            // <MenuItem value={'Massage'}>Massage</MenuItem>
            // <MenuItem value={'Miscellanious'}>Miscellanious</MenuItem>
            if (passedCategory === 'Cleaning') {
                whichServices = cleaningServices
            } else if (passedCategory === 'Electricians') {
                whichServices = electricianServices
            } else {
                console.log(`passedCategory: ${passedCategory} doesnt match.`)
            }
            const addedService = whichServices[passedIndex]
            const finalCart = [...userData.userDataCart, addedService]
            setUserData(userData => ({
                ...userData,
                userDataCart: finalCart
            }))
            await updateDoc(doc(db, 'users', currentUser.uid), {
                userCart: finalCart
            }).catch((error) => {
                console.log(`in services/addToCart/fireStore_upDoc: Error Code ${error.code}: ${error.message}`)
                setLoading(false)
                return
            })

            alert(`Added ${addedService.serviceTitle} by ${addedService.serviceProvider} to cart.`)
        } else {
            alert(`Please Login or Signup first.`)
        }
        setLoading(false)
    }

    return (
        <>
            <div className='eightyperc-container'>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <h2 className='heading-type3'>Services</h2>
                        <p>Choose from the best services at the lowest prices:</p>
                    </div>
                </div>
                <Categories />
            </div>
            <div className='eightyperc-container'>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <div className='services flex-column-stretch'>
                            <h3 className='para-type1' id='cleaning'>Cleaning:</h3>
                            <div className="flex-column-stretch dark-grey-container">
                                {loading ? <Loading /> : <>
                                    {(cleaningServices.length !== 0) ? cleaningServices.map((eachService, serviceIndex) => (
                                        <ServiceCard
                                            passedService={eachService}
                                            passedIndex={serviceIndex}
                                            showButton={!isProvider}
                                            onAddToCart={onAddToCart}
                                        />
                                    )) : <div className='flex-row'>
                                        <p className='para-type2'>No Cleaning Services</p>
                                    </div>}
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <div className='services flex-column-stretch'>
                            <h3 className='para-type1'>Electricians:</h3>
                            <div className="flex-column-stretch dark-grey-container">
                                {loading ? <Loading /> : <>
                                    {(electricianServices.length !== 0) ? electricianServices.map((eachService, serviceIndex) => (
                                        <ServiceCard
                                            passedService={eachService}
                                            passedIndex={serviceIndex}
                                            showButton={!isProvider}
                                            onAddToCart={onAddToCart}
                                        />
                                    )) : <div className='flex-row'>
                                        <p className='para-type2'>No Electrician Services</p>
                                    </div>}
                                </>}
                            </div>
                        </div>
                        <div className='services'>
                            <h3>Electrician:</h3>
                            <p>Repairs & Fixes</p>
                            <p>Electrical Wiring</p>
                            <p>Installation Service</p>
                        </div>
                    </div>
                </div>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <div className='services'>
                            <h3>Plumbers:</h3>
                            <p>Pipe / Tap Fittings</p>
                            <p>Leakage Checks</p>
                            <p>Repairs & Fixes</p>
                            <p>Installation Service</p>
                        </div>
                    </div>
                </div>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <div className='services'>
                            <h3>Carpenters:</h3>
                            <p>Repairs & Fixes</p>
                            <p>Woodwork</p>
                            <p>Furniture Making</p>
                        </div>
                    </div>
                </div>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <div className='services'>
                            <h3>Pest Control:</h3>
                            <p>Cockroach & Ant Control</p>
                            <p>Bedbugs Control</p>
                            <p>Termite Control</p>
                        </div>
                    </div>
                </div>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <div className='services'>
                            <h3>Salon for Women:</h3>
                            <p>Hair Care / Haircuts</p>
                            <p>Skin Care</p>
                            <p>Waxing</p>
                            <p>Manicure</p>
                            <p>Pedicure</p>
                        </div>
                    </div>
                </div>
                <div className='card-type1'>
                    <div className='ninetyfiveperc-container'>
                        <div className='services'>
                            <h3>Salon for Men:</h3>
                            <p>Haircuts</p>
                            <p>Skin Care</p>
                            <p>Beard Grooming</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services
