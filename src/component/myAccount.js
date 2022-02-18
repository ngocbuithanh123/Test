import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { defaultAPI, defaultURI, defaultFunc } from './helper/helper'
import {emailImage, nameImage, dateof_birthImage, addressImage, cellImage, cityImage, stateImage, zipImage, phnImage } from './helper/images'
import axios from 'axios'
export default function MyAccount(){
    const history = useHistory()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo)
    const [email, setEmail] = useState(userInfo.email)
    const [firstName, setFirstName] = useState(userInfo.firstName)
    const [lastName, setLastName] = useState(userInfo.lastName)
    const [birthday, setBirthday] = useState(userInfo.dateOfBirth)
    const [address, setAddress] = useState(userInfo.address)
    const [state, setState] = useState(userInfo.state)
    const [phone, setPhone] = useState(userInfo.phone)
    const [city, setCity] = useState(userInfo.city)
    const [zip, setZip] = useState(userInfo.zipCode)
    const [telePhone, setTelePhone] = useState(userInfo.telephone)
    const [isNext, setIsNext] = useState(false)
    const submit = (e) => {
        e.target.disabled = true
        let checkAge = defaultFunc.ageTest(birthday)
        let checkData = {
            email,
            birthday,
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone,
            telePhone,
        }
        for (const key in checkData) {
            if (Object.hasOwnProperty.call(checkData, key)) {
                const element = checkData[key];
                if(element === '' || !element){
                    if(['email', 'birthday', 'firstName','lastName', 'address', 'city'].includes(key)){
                        setIsNext(false)
                    }
                    dispatch({type: 'SHOW-MESSAGE', message: 'Please enter the ' + key})
                    return
                }
            }
        }
        if(!checkAge){
            setIsNext(false)
            dispatch({type: 'SHOW-MESSAGE', message: 'You are not 18 years old'})
            return
        }
        dispatch({type: "LOADING"})
        let data = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            dateofbirth: birthday,
            Telephone:telePhone,
            Cellphone: phone,
            Address: address,
            City: city,
            State: state,
            Zipcode: zip, 
            TotalPurchasedCouponPoints: 0,
            CurrentCouponPoints: 0,
            Avatar: userInfo.avatar,
            GuestUser: userInfo.GuestUser,
            CustomerID: userInfo.userID
        }
        axios.post(defaultAPI + defaultURI.POST_ADD_UPDATE_CUSTOMER, data)
        .then(response =>{
            e.target.disabled = false
            dispatch({type: "UN-LOADING"})
            if(response.data.Successful) {
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                history.push("/profile")
            } else {
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
            }
        })
        .catch(error => {
            e.target.disabled = false
            dispatch({type: "UN-LOADING"})
            dispatch({type: 'SHOW-MESSAGE', message: 'Something went wrong. Please try again!'})
        })
    }
    
    
    if(!isNext){
        return (
            <div className="main-container">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={emailImage} alt="icon input"/>
                                </div>
                                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter your email" value={email}/>
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={nameImage} alt="icon input"/>
                                </div>
                                <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="form-control" placeholder="First name"/>
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={addressImage} alt="icon input"/>
                                </div>
                                <input type="email" onChange={(e)=>{setAddress(e.target.value)}} className="form-control" placeholder="Enter your address" value={address}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={dateof_birthImage} alt="icon input"/>
                                </div>
                                <input type="date" onChange={(e)=>{setBirthday(e.target.value)}} className="form-control" placeholder="BOD" value={birthday}/>
                            </div>
                            
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={nameImage} alt="icon input"/>
                                </div>
                                <input type="text" onChange={(e)=>{setLastName(e.target.value)}} className="form-control" placeholder="Last name" value={lastName}/>
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={cityImage} alt="icon input"/>
                                </div>
                                <input type="text" onChange={(e)=>{setCity(e.target.value)}} className="form-control" placeholder="City" value={city}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="mb-3">
                            <button key="next" className="btn btn-primary btn-block" onClick={()=>{setIsNext(true)}}>Continue</button>
                        </div>
                        <div className="mb-3">
                            <Link className="btn btn-primary btn-block" to="/">BUY COUPON POINTS</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="main-container">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={stateImage} alt="icon input"/>
                                </div>
                                <input type="text" onChange={(e)=>{setState(e.target.value)}} className="form-control" placeholder="State" value={state} />
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={cellImage} alt="icon input"/>
                                </div>
                                <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="form-control" placeholder="Cell phone number"/>
                            </div>
                        </div>
                        <div className="col-6">
                            
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={zipImage} alt="icon input"/>
                                </div>
                                <input type="text" onChange={(e)=>{setZip(e.target.value)}} className="form-control" placeholder="zip" value={zip} />
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={phnImage} alt="icon input"/>
                                </div>
                                <input type="text" onChange={(e)=>{setTelePhone(e.target.value)}} className="form-control" placeholder="Telephone number" value={telePhone}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="mb-3 row">
                            <div className="col-6 px-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={()=>{setIsNext(false)}}>Back</button>
                            </div>
                            <div className="col-6 px-3">
                                <button key="submit" className="btn btn-primary btn-block" onClick={(e)=>{submit(e)}}>Save</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <Link className="btn btn-primary btn-block" to="/">BUY COUPON POINTS</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}