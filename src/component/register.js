import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
import {emailImage, passwordImage, nameImage, dateof_birthImage, addressImage, cellImage, cityImage, stateImage, zipImage, phnImage } from './helper/images'
import { defaultAPI, defaultURI, defaultFunc, defaultConfig } from './helper/helper'
import axios from 'axios'
export default function Register(){
    const dispatch = useDispatch()
    const history = useHistory()
    const isLogin = useSelector(state => state.isLogin)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confimmPassword, setConfimmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [telePhone, setTelePhone] = useState('')
    const [isNext, setIsNext] = useState(false)
    const submit = (e) => {
        let checkAge = defaultFunc.ageTest(birthday)
        let checkData = {
            email,
            birthday,
            password,
            confimmPassword,
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
                    if(['email', 'birthday', 'password', 'confimmPassword','firstName','lastName'].includes(key)){
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
        if(password !== confimmPassword){
            setIsNext(false)
            dispatch({type: 'SHOW-MESSAGE', message: 'Confimm password does not match'})
            return
        }
        let data = {
            FirstName: firstName,
            MiddleName: '',
            LastName: lastName,
            Email: email,
            dateofbirth: birthday,
            Password: password,
            Telephone:telePhone,
            Cellphone: phone,
            Address: address,
            City: city,
            State: state,
            Zipcode: zip, 
            TotalPurchasedCouponPoints: 0,
            CurrentCouponPoints: 0,
            Avatar: '',
            GuestUser: false,
        }
        dispatch({type: 'LOADING'})
        e.target.disabled = true
        axios.post(defaultAPI + defaultURI.POST_ADD_UPDATE_CUSTOMER, data)
        .then(response =>{
            e.target.disabled = false
            if(response.data.Successful) {
                let ID = response.data.ID
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                dispatch({type: "UN-LOADING"})
                axios.get(defaultAPI + defaultURI.GET_DATA + "?customerid="+ ID +"&establishmentid="+defaultConfig.EstablishmentID)
                .then(res => {
                    if(res.data){
                        let FirstName = res.data.FirstName??""
                        let MiddleName = res.data.MiddleName??""
                        let LastName = res.data.LastName??""
                        let userInfo = {
                            userID: ID,
                            fullName: FirstName +" "+ MiddleName +" "+ LastName,
                            firstName: FirstName,
                            lastName: LastName,
                            dateOfBirth: defaultFunc.formatDate(res.data.DateofBirth),
                            telephone: res.data.Telephone,
                            phone: res.data.Cellphone,
                            address: res.data.Address,
                            city: res.data.City,
                            state: res.data.State,
                            zipCode: res.data.Zipcode,
                            avatar: res.data.Avatar,
                            guestUser: res.data.GuestUser,
                            email: res.data.Email,
                            couponPoint: res.data.CurrentCouponPoints,
                            entry: res.data.SweepstakesPoints,
                            bankBalance: res.data.BankBalance,
                            winBalance: res.data.WalletBalance
                        }
                        dispatch({type: 'LOGIN', userInfo: userInfo})
                    }
                    
                })
            } else {
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                dispatch({type: "UN-LOADING"})
            }
        })
        .catch(error => {
            e.target.disabled = false
            dispatch({type: "UN-LOADING"})
            dispatch({type: 'SHOW-MESSAGE', message: 'Something went wrong. Please try again!'})
        })
    }
    if(isLogin){
        return <Redirect to='/my-account' />
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
                                    <img src={passwordImage} className="image-input" alt="icon input"/>
                                </div>
                                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" placeholder="Enter your password" value={password} />
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={nameImage} alt="icon input"/>
                                </div>
                                <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="form-control" placeholder="First name"/>
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
                                    <img src={passwordImage} className="image-input" alt="icon input"/>
                                </div>
                                <input type="password" onChange={(e)=>{setConfimmPassword(e.target.value)}} className="form-control" placeholder="Confirm password" value={confimmPassword} />
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                                <div className="input-group-prepend">
                                    <img className="image-input" src={nameImage} alt="icon input"/>
                                </div>
                                <input type="text" onChange={(e)=>{setLastName(e.target.value)}} className="form-control" placeholder="Last name" value={lastName}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-center register-button-div">
                        <div className="mb-3">
                            <button key="next" className="btn btn-primary btn-block" onClick={()=>{setIsNext(true)}}>NEXT</button>
                        </div>
                        <div className="mb-3">
                            <button key="back" className="btn btn-primary btn-block" onClick={history.goBack}>BACK</button>
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
                                    <img className="image-input" src={addressImage} alt="icon input"/>
                                </div>
                                <input type="email" onChange={(e)=>{setAddress(e.target.value)}} className="form-control" placeholder="Enter your address" value={address}/>
                            </div>
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
                                    <img className="image-input" src={cityImage} alt="icon input"/>
                                </div>
                                <input type="text" onChange={(e)=>{setCity(e.target.value)}} className="form-control" placeholder="City" value={city}/>
                            </div>
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
                    <div className="text-center register-button-div">
                        <div className="mb-3">
                            <button key="submit" className="btn btn-primary btn-block" onClick={(e)=>{submit(e)}}>SUBMIT</button>
                        </div>
                        <div className="mb-3">
                            <button key="prev" className="btn btn-primary btn-block" onClick={()=>{setIsNext(false)}}>PREV</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}