import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../firebaseInit'
import ServiceCard2 from '../components/ServiceCard2'
import { Person, Logout, Delete, ShoppingCart, ArrowForward } from '@mui/icons-material'
import { globalIconStyle } from '../assets/GlobalStyles'

const UserAccount = ({ userData, setUserData, onSignOutSubmit, onDeleteUser }) => {

    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInput] = useState({
        userInputAddress: '',
        userInputNumber: ''
    })

    const handleUserInputChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    const onAddDetailsSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await updateDoc(doc(db, 'users', currentUser.uid), {
            userAddress: userInput.userInputAddress,
            userNumber: userInput.userInputNumber
        }).catch((error) => {
            console.log(`in userAccount/addDetails/fireStore_upDoc: Error Code ${error.code}: ${error.message}`)
            setLoading(false)
            return
        })
        setUserInput(userInput => ({
            userInputAddress: '',
            userInputNumber: ''
        }))
        setLoading(false)
    }

    const onDeleteItem = async (passedIndex) => {
        setLoading(true)
        console.log(`indexToDelete: ${passedIndex}`)
        const finalCart = userData.userDataCart
        finalCart.splice(passedIndex, 1)
        setUserData(userData => ({
            ...userData,
            userDataCart: finalCart
        }))
        await updateDoc(doc(db, 'users', currentUser.uid), {
            userCart: finalCart
        }).catch((error) => {
            console.log(`in userAccount/deleteItem/fireStore_upDoc: Error Code ${error.code}: ${error.message}`)
            setLoading(false)
            return
        })
        setLoading(false)
    }

    const onEmptyCart = async () => {
        setLoading(true)
        const finalCart = []
        setUserData(userData => ({
            ...userData,
            userDataCart: finalCart
        }))
        await updateDoc(doc(db, 'users', currentUser.uid), {
            userCart: finalCart
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

    const onCheckOutClicked = () => {
        setLoading(true)
        console.log(`Checkout Clicked.`)
        setLoading(false)
    }

    return (
        <>
            <div className='eightyperc-container'>
                <div className='flex-row'>
                    <div className='card-type1 account-card'>
                        <div className='flex-column-stretch eightyperc-container'>
                            <div className='flex-row'>
                                <div className='circle size100px'>
                                    <Person style={globalIconStyle} />
                                </div>
                            </div>
                            <h3 className='heading-type3 center-text'>{userData.userDataFirstName} {userData.userDataLastName}</h3>
                            <div className='flex-row'>
                                <p className='para-type2'>Email:</p><p className='grey-container'>{userData.userDataEmail}</p>
                            </div>
                            <div className='flex-row left-justify'>
                                <p className='para-type2'>Address:</p><p className='grey-container'>{userData.userDataAddress}</p>
                            </div>
                            <div className='flex-row'>
                                <p className='para-type2'>Phone Number:</p><p className='grey-container'>{userData.userDataNumber}</p>
                            </div>
                            <div className='flex-row'>
                                <button className='button-type1' onClick={onSignOutSubmit}><Logout />Log Out</button>
                                <button className='button-type2' onClick={onDeleteUser}><Delete />Delete Account</button>
                            </div>
                        </div>
                    </div>
                    <div className='card-type1 account-card auto-side-margin'>
                        <form onSubmit={onAddDetailsSubmit} className='eightyperc-container'>
                            <h4 className='heading-type3'>Enter Additional Details</h4>
                            <div className='flex-column-stretch'>
                                <div className='flex-column-stretch signup-description'>
                                    <p>Enter Address: </p>
                                    <textarea
                                        name='userInputAddress'
                                        placeholder='About my service...'
                                        value={userInput.userInputAddress}
                                        onChange={handleUserInputChange}
                                    />
                                </div>
                                <div className='flex-row'>
                                    <p>Phone Number: </p>
                                    <input type='text'
                                        name='userInputNumber'
                                        placeholder='+91...'
                                        value={userInput.userInputNumber}
                                        onChange={handleUserInputChange}
                                    />
                                </div>
                                <div className='flex-row'>
                                    <input type='submit' className='button' value='Submit' disabled={loading} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='flex-column'>
                <div className='card-type1 eightyperc-container'>
                    <div className='flex-column-stretch ninetyfiveperc-container'>
                        <h4 className='heading-type3'>Your Cart Items: {userData.userDataCart.length}</h4>
                        <div className="flex-column-stretch dark-grey-container">
                            {(userData.userDataCart.length !== 0) ? userData.userDataCart.map((eachService, serviceIndex) => (
                                <ServiceCard2 passedService={eachService} passedIndex={serviceIndex} onDeleteItem={onDeleteItem} />
                            )) : <div className='flex-row'>
                                <p className='para-type2'>Cart is Empty</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-type1 eightyperc-container cart-total-card">
                    <div className='flex-row'>
                        <h4>Cart Total:   Rs. {calculateCartTotal(userData.userDataCart)}</h4>
                    </div>
                    <div className='flex-row'>
                        <button className='button-type2' onClick={onEmptyCart}><Delete />Empty Cart</button>
                        <button className='button-type1' onClick={onCheckOutClicked}>Proceed To Checkout<ShoppingCart /><ArrowForward /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAccount
