import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { db } from '../firebaseInit'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Loading from '../components/Loading'
import ServiceCard2 from '../components/ServiceCard2'
import { RadioGroup, Radio } from '@mui/material'
import { Person, LocationOn, Email, Phone } from '@mui/icons-material'

const Checkout = () => {

    const history = useHistory()
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        userDataFirstName: '',
        userDataLastName: '',
        userDataEmail: '',
        userDataAddress: '',
        userDataNumber: '',
        userDataCart: []
    })
    const [finalCart, setFinalCart] = useState([])
    const [payInput, setPayInput] = useState({
        payInputMethod: false,
        payInputCName: '',
        payInputCNo: '',
        payInputCVV: '',
    })
    const [showCCInput, setShowCCInput] = useState(false)

    useEffect(() => {
        fireStoreRead()
        // eslint-disable-next-line
    }, [])

    const fireStoreRead = async () => {
        setLoading(true)
        var docSnap = await getDoc(doc(db, 'users', currentUser.uid))
        if (docSnap.exists()) {
            setUserData(userData => ({
                ...userData,
                userDataFirstName: docSnap.data().userFirstName,
                userDataLastName: docSnap.data().userLastName,
                userDataEmail: docSnap.data().userEmail,
                userDataAddress: docSnap.data().userAddress,
                userDataNumber: docSnap.data().userNumber,
                userDataCart: docSnap.data().userCart
            }))
            const tempCart = docSnap.data().userCart
            setFinalCart((finalCart) => tempCart)
        } else {
            console.log(`No user data found.`)
        }
        setLoading(false)
    }

    const emptyCart = async () => {
        setLoading(true)
        const emptyCart = []
        setUserData(userData => ({
            ...userData,
            userDataCart: emptyCart
        }))
        await updateDoc(doc(db, 'users', currentUser.uid), {
            userCart: emptyCart
        }).catch((error) => {
            console.log(`in userAccount/emptyCart/fireStore_upDoc: Error Code ${error.code}: ${error.message}`)
            setLoading(false)
            return
        })
        setLoading(false)
    }

    const calculateCartTotal = (passedCart) => {
        var cartTotal = 0.0
        if (passedCart.length !== 0) {
            passedCart.map((eachService) => cartTotal = cartTotal + parseFloat(eachService.servicePrice))
        }
        return cartTotal
    }

    const handlePayInputChange = (e) => {
        setPayInput({
            ...payInput,
            [e.target.name]: e.target.value
        })
        console.log(payInput.payInputMethod)
    }

    const handlePayInputMethodChange = (e) => {
        setPayInput({
            ...payInput,
            payInputMethod: e.target.value
        })
        setShowCCInput(e.target.value)
    }

    const onPaySubmit = (e) => {
        e.preventDefault()
        emptyCart()
        history.push('/')
        alert(`Order Placed! Thank You for Choosing WeCare!`)
    }

    return (
        <>
            {loading ? <Loading /> : <div className="flex-column">
                <div className='card-type1 eightyperc-container'>
                    <div className='flex-column-stretch ninetyfiveperc-container'>
                        <h4 className='heading-type3'>Order Summary: {finalCart.length} Items</h4>
                        <div className="flex-column-stretch dark-grey-container">
                            {(finalCart.length !== 0) ? finalCart.map((eachService, serviceIndex) => (
                                <ServiceCard2
                                    passedService={eachService}
                                    passedIndex={serviceIndex}
                                    onDeleteItem={() => { }}
                                    showDelete={false}
                                />
                            )) : <div className='flex-row'>
                                <p className='para-type2'>Cart is Empty</p>
                            </div>
                            }
                        </div>
                        <h4 className='heading-type3'>Order Total: Rs. {calculateCartTotal(finalCart)}</h4>
                    </div>
                </div>
                <div className="eightyperc-container">
                    <div className='flex-row'>
                        <div className='card-type3'>
                            <div className='flex-column-stretch eightyperc-container'>
                                <h3 className='heading-type3'>Delivery To:</h3>
                                <div className='flex-row left-justify'>
                                    <p className='para-type2 icon-para'><Person /></p><p className='para-type2'>{userData.userDataFirstName} {userData.userDataLastName}</p>
                                </div>
                                <div className='flex-row left-justify'>
                                    <p className='para-type2 icon-para'><LocationOn /></p><p className='grey-container'>{userData.userDataAddress}</p>
                                </div>
                                <div className='flex-row left-justify'>
                                    <p className='para-type2 icon-para'><Email /></p><p className='para-type2'>{userData.userDataEmail}</p>
                                </div>
                                <div className='flex-row left-justify'>
                                    <p className='para-type2 icon-para'><Phone /></p><p className='para-type2'>{userData.userDataNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div className='card-type3'>
                            <div className='flex-column-stretch eightyperc-container'>
                                <h3 className='heading-type3'>Pay By:</h3>
                                <RadioGroup
                                    value={payInput.payInputMethod}
                                >
                                    <div className="flex-row left-justify">
                                        <Radio
                                            value={false}
                                            name="payInputMethod"
                                            onChange={handlePayInputMethodChange}
                                        />
                                        <p>Cash On Delivery</p>
                                    </div>
                                    <div className="flex-row left-justify">
                                        <Radio
                                            value={true}
                                            name="payInputMethod"
                                            onChange={handlePayInputMethodChange}
                                        />
                                        <p>Credit / Debit Card</p>
                                    </div>
                                </RadioGroup>
                                <form onSubmit={onPaySubmit}>
                                    {showCCInput && <>
                                        <div className='flex-row left-justify'>
                                            <p>Enter Name on Card: </p>
                                            <input type='text'
                                                name='payInputCName'
                                                placeholder={`${userData.userDataFirstName} ${userData.userDataLastName}`}
                                                value={payInput.payInputCName}
                                                onChange={handlePayInputChange}
                                            />
                                        </div>
                                        <div className='flex-row left-justify'>
                                            <p>Enter Credit Card Number: </p>
                                            <input type='text'
                                                name='payInputCNo'
                                                placeholder='XXXX-XXXX-XXXX-XXXX'
                                                value={payInput.payInputCNo}
                                                onChange={handlePayInputChange}
                                            />
                                        </div>
                                        <div className='flex-row left-justify'>
                                            <p>Enter CVV Number: </p>
                                            <input type='password'
                                                name='payInputCVV'
                                                value={payInput.payInputCVV}
                                                onChange={handlePayInputChange}
                                            />
                                        </div>
                                    </>}
                                    <div className='flex-row'>
                                        <input type='submit' className='button' value='Submit' disabled={loading} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Checkout
