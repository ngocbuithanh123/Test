import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
import * as React from "react";
import { defaultAPI, defaultURI, defaultFunc, defaultConfig, formatPhoneNumber } from './helper/helper'
import axios from 'axios'
import header from '../images/Main_Menu/header_rule.jpg'
import { emailImage, nameImage, dateof_birthImage, addressImage, cellImage, cityImage, stateImage, zipImage, phnImage } from './helper/images'
// import $ from 'jquery'
// To customize image in iframe instal jquery 'npm i jquery' and type 'toach loader.js' in terminal
// In loader.js 'window.$ = window.jQuery = require('jquery')'
// Import jquery in this file
// Use this jquery to customize $('iframe').contents().find('img').css({ width: '100%', height: 'auto' });
// Put jquery inside fuction
export default function GuestRegister() {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLogin = useSelector(state => state.isLogin)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [telePhone, setTelePhone] = useState('')
    const [counter, setCounter] = useState(60);
    const [type, setType] = useState("");
    
    const handleStart = () => {
        setType("count")
        setInterval(() => {
            setCounter(prev => prev - 1)
        }, 1000)
    }
    const [isNext, setIsNext] = useState(false)
    const handleOnChange = () => {
        setIsNext(!isNext);
    };
    const handleInput = (e) => {
        // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        // we'll set the input value using our setInputValue
        setPhone(formattedPhoneNumber);
    };
    // console.log(getAge(birthday));
    console.log(defaultFunc.ageTest(birthday));
    const submit = (e) => {
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
                if (element === '' || !element) {
                    if (['email', 'birthday', 'firstName', 'lastName'].includes(key)) {
                        setIsNext(false)
                    }
                    dispatch({ type: 'SHOW-MESSAGE', message: 'Please enter the ' + key })
                    return
                }
            }
        }
        if (!checkAge) {
            setIsNext(false)
            dispatch({ type: 'SHOW-MESSAGE', message: 'You are not 18 years old' })
            return
        }

        let data = {
            FirstName: firstName,
            MiddleName: '',
            LastName: lastName,
            Email: email,
            dateofbirth: birthday,
            Password: '',
            Telephone: telePhone,
            Cellphone: phone,
            Address: address,
            City: city,
            State: state,
            Zipcode: zip,
            TotalPurchasedCouponPoints: 0,
            CurrentCouponPoints: 0,
            Avatar: '',
            GuestUser: true,
        }
        dispatch({ type: 'LOADING' })
        e.target.disabled = true
        axios.post(defaultAPI + defaultURI.POST_ADD_UPDATE_CUSTOMER, data)
            .then(response => {
                e.target.disabled = false
                if (response.data.Successful) {
                    let ID = response.data.ID
                    dispatch({ type: 'SHOW-MESSAGE', message: response.data.Message })
                    dispatch({ type: "UN-LOADING" })
                    axios.get(defaultAPI + defaultURI.GET_DATA + "?customerid=" + ID + "&establishmentid=" + defaultConfig.EstablishmentID)
                        .then(res => {
                            if (res.data) {
                                let FirstName = res.data.FirstName ?? ""
                                let MiddleName = res.data.MiddleName ?? ""
                                let LastName = res.data.LastName ?? ""
                                let userInfo = {
                                    userID: ID,
                                    fullName: FirstName + " " + MiddleName + " " + LastName,
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
                                dispatch({ type: 'LOGIN', userInfo: userInfo })
                            }

                        })
                } else {
                    dispatch({ type: 'SHOW-MESSAGE', message: response.data.Message })
                    dispatch({ type: "UN-LOADING" })
                }
            })
            .catch(error => {
                e.target.disabled = false
                dispatch({ type: "UN-LOADING" })
                dispatch({ type: 'SHOW-MESSAGE', message: 'Something went wrong. Please try again!' })
            })
    }
    if (isLogin) {
        return <Redirect to='/my-account' />
    }
    switch (type) {
        case 'count':
            return (
                <div className="main-container">
                    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: "70%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px' }}>{counter > 0 ?
                                <p style={{ fontSize: '30px', padding: '20px' }}><b>Time Remaining: {counter} </b> </p> : history.push('/')}
                            </div>


                            <button key="back" className="btn btn-primary btn-block" onClick={() => setType("Email")} style={{ padding: "20px", width: '40%' }}>Play</button>

                        </div>
                    </div>
                </div>

            )
        case 'Email':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your email: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-envelope-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={emailImage} alt="icon input" />
                                    </div>
                                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Enter your email" value={email} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("DateOfBirth")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={history.goBack}>BACK</button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        case 'DateOfBirth':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your date of birth: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i class="fa fa-regular fa-calendar" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={dateof_birthImage} alt="icon input" />
                                    </div>
                                    <input type="date" onChange={(e) => { setBirthday(e.target.value) }} className="form-control" placeholder="Date Of Birth" value={birthday} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                {!defaultFunc.ageTest(birthday) && birthday.length > 0 ? <p style={{ color: 'red', fontSize: '120%' }}>You must be over 18</p> : <p></p>}
                            </div>
                            <div className="mb-3">
                                <button key="next" disabled={!defaultFunc.ageTest(birthday) || birthday.length === 0} className="btn btn-primary btn-block" onClick={() => setType("FName")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("Email")}>BACK</button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        case 'FName':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your first name: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-user-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={nameImage} alt="icon input" />
                                    </div>
                                    <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className="form-control" placeholder="First name" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("LName")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("DateOfBirth")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'LName':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your last name: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-user-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={nameImage} alt="icon input" />
                                    </div>
                                    <input type="text" onChange={(e) => { setLastName(e.target.value) }} className="form-control" placeholder="Last name" value={lastName} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("Telephone")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("FName")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'Telephone':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your telephone number: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-phone" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={phnImage} alt="icon input" />
                                    </div>
                                    <input type="text" onChange={(e) => { setTelePhone(e.target.value) }} className="form-control" placeholder="Telephone number" value={telePhone} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("Cellphone")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("LName")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'Cellphone':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your cellphone number: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-mobile" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={cellImage} alt="icon input" />
                                    </div>
                                    <input type="tel" value={phone} onChange={(e) => { handleInput(e) }} className="form-control" placeholder="Cell phone number" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("Address")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("Telephone")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'Address':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your address: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-map-marker" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={addressImage} alt="icon input" />
                                    </div>
                                    <input type="text" onChange={(e) => { setAddress(e.target.value) }} className="form-control" placeholder="Enter your address" value={address} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("City")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("Cellphone")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'City':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your city: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i class="fa fa-x fa fa-building-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={cityImage} alt="icon input" />
                                    </div>
                                    <input type="text" onChange={(e) => { setCity(e.target.value) }} className="form-control" placeholder="City" value={city} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("State")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("Address")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'State':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your state: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa fa-university" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={stateImage} alt="icon input" />
                                    </div>
                                    <input type="text" onChange={(e) => { setState(e.target.value) }} className="form-control" placeholder="State" value={state} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("Zip")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("City")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'Zip':
            return (
                <div className="main-container">
                    <div className="container" style={{ width: "30%" }}>
                        <div className="row">
                            <div className="col">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ marginBottom: '1px', color: 'white', fontSize: '120%', padding: '20px' }}><b>*Enter your zip: </b> </p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-address-card-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={zipImage} alt="icon input" />
                                    </div>
                                    <input type="text" maxLength={5} onChange={(e) => { setZip(e.target.value) }} className="form-control" placeholder="zip" value={zip} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => setType("Check1")}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => setType("State")}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'Check1':
            return (
                <div className="main-container">
                    <div className="container" style={{ marginTop: '2%' }}>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-envelope-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={emailImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {email}</p>
                                </div>

                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-user-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={nameImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {firstName}</p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-user-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={nameImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {lastName}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i class="fa fa-regular fa-calendar" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={dateof_birthImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {birthday}</p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-user-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={nameImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> A</p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-map-marker" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={addressImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="next" className="btn btn-primary btn-block" onClick={() => { setType("Check2") }}>NEXT</button>
                            </div>
                            <div className="mb-3">
                                <button key="back" className="btn btn-primary btn-block" onClick={() => { setType("Zip") }}>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'Check2':
            return (
                <div className="main-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i class="fa fa-x fa fa-building-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={cityImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {city}</p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-address-card-o" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={zipImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {zip}</p>
                                </div>
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-mobile" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={cellImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {phone}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa fa-university" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={stateImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {state}</p>
                                </div>

                                <div className="input-group mb-3 input-group-lg">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text"><i className="fa fa-x fa-phone" aria-hidden="true"></i></span> */}
                                        <img className="image-input" style={{ width: '97%' }} src={phnImage} alt="icon input" />
                                    </div>
                                    <p className="form-control"> {telePhone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-3">
                                <button key="submit" className="btn btn-primary btn-block" onClick={() => { setType("Confirm") }}>SUBMIT</button>
                            </div>
                            <div className="mb-3">
                                <button key="prev" className="btn btn-primary btn-block" onClick={() => { setType("Check1") }}>PREV</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        // case 'Confirm':
        //     return (

        //         <div className="main-container">
        //             <div className="container" style={{ width: '55%' }}>

        //                 <div className="row">
        //                     <div className="col">
        //                         <div className="text-center">
        //                             <div className="mb-3" style={{ width: '100%', height:'100%' }}>
        //                                 {/* <img src={logo} alt="Logo" style={{width: '100%' }} /> */}
        //                                 {/* <iframe srcdoc="<html><body>Hello, <b>world</b>.</body></html>"></iframe> */}
        //                                 {/* <iframe frameborder="0" scrolling="yes" width="100%" height="100%"
        //                                     src={logo} name="imgbox" id="imgbox">
        //                                 </iframe><br /> */}
        //                                 {/* <iframe frameborder="0" scrolling="yes" width="100%" height="100%" 
        //                                     // srcdoc="
        //                                     // <html>
        //                                     // <body>Hello, <b>world</b>.</body>

        //                                     // </html>"
        //                                     src="/"
        //                                     >
        //                                 </iframe> */}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        //                     <div className="col-2">
        //                         <button key="prev" style={{ backgroundColor: 'white', color: 'black' }} className="btn btn-primary btn-block" onClick={() => { setType("Check2") }}><b>Cancel</b></button>

        //                     </div>

        //                     <div className='col-8' style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
        //                         <input type='checkbox' value={isNext} checked={isNext} onChange={handleOnChange} style={{ margin: '1%' }} />
        //                         <p style={{ paddingLeft: '4%' }}>
        //                             I have read and understood the rules & accept the terms and conditions
        //                         </p>

        //                     </div>
        //                     <div className="col-2" >
        //                         <button key="submit" style={{ backgroundColor: 'white', color: 'black' }} disabled={!isNext} className="btn btn-primary btn-block" onClick={(e) => { submit(e) }}><b>SUBMIT</b></button>

        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )


        // case 'Confirm':
        //     return (
        //         <div>
        //             <div className="row" style={{ width: '100%', height: '90%'}}>
        //                 <img src={logo} alt="Logo" style={{ width: '100%' }} />

        //             </div>
        //             <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'fixed', bottom: '5%' }}>
        //                 <div className="col-2">
        //                     <button key="prev" style={{ backgroundColor: 'white', color: 'black' }} className="btn btn-primary btn-block" onClick={() => { setType("Check2") }}><b>Cancel</b></button>

        //                 </div>

        //                 <div className='col-8' style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
        //                     <input type='checkbox' value={isNext} checked={isNext} onChange={handleOnChange} style={{ margin: '1%' }} />
        //                     <p style={{ paddingLeft: '4%' }}>
        //                         I have read and understood the rules & accept the terms and conditions
        //                     </p>

        //                 </div>
        //                 <div className="col-2" >
        //                     <button key="submit" style={{ backgroundColor: 'white', color: 'black' }} disabled={!isNext} className="btn btn-primary btn-block" onClick={(e) => { submit(e) }}><b>SUBMIT</b></button>

        //                 </div>
        //             </div>
        //         </div>
        //     )

        case 'Confirm':
            return (
                <div className="rule-container" >
                    <div className="" style={{ width: '100%', height: '100%', flexDirection: 'column', zIndex: '1', paddingBottom: '2%' }}>
                        <div className="row" style={{ height: '25%' }}>
                            <img src={header} alt="Logo" style={{ width: '100%', height:'100%' }} />
                        </div>
                        <div className="row" style={{ height: '75%' }}>
                            <div className="col">
                                <div className="text-center" style={{ width: '100%', height: '100%' }}>
                                    <div className="mb-3" style={{ width: '100%', height: '100%' }}>
                                        {/* <img src={logo} alt="Logo" style={{width: '100%' }} /> */}
                                        {/* <iframe srcdoc="<html><body>Hello, <b>world</b>.</body></html>"></iframe> */}
                                        {/* <iframe frameborder="0" scrolling="yes" width="100%" height="100%" title='rule'
                                            src={logo} name="imgbox" id="imgbox">
                                        </iframe><br /> */}

                                        <iframe frameborder="0" scrolling="yes" width="100%" height="100%" title='rule'
                                            srcdoc="
                                            <html>
                                            <head>
<style>
body {background-color: silver; padding-left:5%; padding-right: 5%; text-align: left}
p    {font-size: 180%}
</style>
</head>
<body>
<p>
<b>
<b>NO PURCHASE OF SKIDOOZY COUPON POINTS OR ANY OTHER PRODUCT OR SERVICE IS NECESSARY TO ENTER OR PARTICIPATE IN THIS PROMOTIONAL GAME. PARTICIPATION IN THIS PROMOTIONAL GAME IS FREE. PURCHASE OF SKIDOOZY COUPON POINTS OR ANY
OTHER PRODUCT OR SERVICE WILL NOT INCREASE YOUR CHANCES OF WINNING. THE SWEEPSTAKES IS VOID WHERE PROHIBITED BY LAW. THE SWEEPSTAKES BEGINS AT 12:01 AM, EST ON 1/1/2016 AND ENDS AT 11:59 AM EST ON 12/31/2016 OR WHEN ALL ENTRIES HAVE BEEN EXHAUSTED WHICHEVER OCCURS FIRST.
</b></br></br>
1. SPONSORSHIP.</b> The name and address of the sponsor of this promotional Game 
(the <b>''Sponsor''</b>) is the retailer or the store or other venue in which the point-of-sale kiosk is located and is posted with the paper version of these Official Rules at the store where you are participating in this free promotional game.</br></br>

<b>2. ELIGIBILITY.</b> This promotional game is open to legal residents of the 50 states of the United States and of the District of Columbia who are 18 years of age or older at the time of participation and who are not ineligible as set out in these Official Rules. Void where prohibited by law. Employees (and members of employees’ immediate families and residents in their households) of the Sponsor and the Administrator are not eligible to play or win. Sweepstakes Distributors are also not eligible to play or win.</br></br>


<b>3. HOW TO ENTER.</b> You may purchase Skidoozy Coupon Points or other products, at which time an account will be created for you. (There is no charge to open an account.) For each dollar of such purchase you will be awarded one hundred entries (100 credits) to enter the promotional game. TO ENTER WITHOUT PURCHASE: (a) There is unlimited free play. Press the free play request button at the point-of-sale kiosk and enter required information to receive free play and free play is usable only at the premises of the Sponsor set out in paragraph 1 of these rules; (b) ask the point-of-sale clerk for an official free entry request form, legibly hand print all of the information requested on the form and follow the mailing instructions on the form; or (c) on a postcard or sheet of white paper no smaller than three inches by five inches (3'' x 5'') nor larger than eight and one half by eleven inches (8½ '' x 11'') hand print your name, address, city, state, zip code, cell phone, email address, age, the date you are preparing your request and the name and store address of the Sponsor. Mail the official free entry request form or handwritten free entry request, with the envelope or postcard address and return address also handwritten, to:</br></br>



Official Free Entry Request</br></br>
P.O. Box #35717</br></br>
Tucson, AZ 85704</br></br>

No return envelope is required. Limit of one free entry (1 credit) per complying stamped hand-written outer envelope or complying stamped hand-written postcard. Free entry requests will be disqualified for any of the following reasons: (1) ineligibility, (2) inclusion with the free entry request of any other correspondence, promotional materials or other materials, (3) lost, late, damaged or misdirected or postage due requests and (4) requests that in the opinion of the Sponsor are machine generated in whole or in part, including but not limited to the stamped outer envelope or postcard. The decision of the Sponsor or the Sponsor’s agent regarding eligibility or disqualification of free entry requests received will be final. A free entry will not entitle the person requesting it or any other person, to Skidoozy Coupon Points. Free entry requests received by the Sponsor become the Sponsor’s property upon receipt and will not be returned. Ineligible and non-complying requests will not be acknowledged.</br></br>


<b>4. HOW TO PARTICIPATE.</b> Participation in the promotional game, whether by free entry or by purchase, is limited to the premises of the Sponsor identified in paragraph 1 of these rules. The Sponsor’s point-of-sale kiosk will tell what (if anything) you have won and the patron will then print out a receipt and present it to the location’s clerk who will then pay to you anything that you have won (cash or prizes). If instead you want to view your participation results by using an entertaining theme at a point-of-sale kiosk, the location’s clerk will instruct you how to use the electronic equipment to do so. Upon revealing sweepstakes entries at a point-of-sale kiosk you will see two small boxes near the bottom left portion of the screen. One box is clearly marked ''Entries.'' This discloses the number of sweepstakes entries that you have remaining in your account to reveal. The Entries in this box have no cash value. The other box is marked ''Winnings.'' The Winnings box shows your winnings after the Entries have been revealed and can be redeemed for cash or prizes. If you have purchased Skidoozy Coupon Points or other products or services to obtain free sweepstakes entries, revealing promotional entries will not reduce your entitlement to what you have purchased. Whether you have entered for free or by purchase of products or services, you cannot use Winnings to play or replay the promotional game. To collect at any time, print out a receipt from the point-of-sale kiosk take it to the Sponsor’s cashier and show them what you have won. On verification of that amount the Sponsor will pay to you in currency the amount that you have won. The right to receive promotional prizes cannot be assigned or transferred by the participant who is entitled to the prizes.</br></br>


<b>5. HOW WINNERS ARE SELECTED.</b> Winners are selected from a finite pool of electronic game pieces. Each electronic game piece has an assigned value. On each draw from the finite deal the server will randomly select from the finite pool of electronic game pieces, one that represents the result of that draw. Upon such selection, the electronic game piece is removed from the deal and is not used again. The value (if any) of the electronic game piece selected will be added to the awarded credits display on the monitor of the point-of-sale kiosk that you are using. The sweepstakes does not differentate between sweepstakes entries granted through a purchase from those granted by request with no purchase neccessary. All promotional entries, received with or without a purchase have the same odds of winning a prize. Some reveal screens may appear to be interactive, conveying the impression that the participant’s actions can influence the odds or the prize. They are in fact pseudo-interactive. The appearance of interactivity is merely an entertaining illusion. The participant’s actions do not influence the odds or the winnings outcome. </br></br>

<b>6. ODDS OF WINNING.</b> On each draw you have a 44% chance of winning something. The value of the top prize and other prizes can vary with the number of the entry credits that you commit to start a single draw. For example, if you commit one credit to the draw, the top prize is $1,000.00. If you commit 2 credits to the draw, the top prize will be $2,000.00. The odds of winning the top prize is one in 13,886. There are two ways that you can obtain a more detailed and complete statement of the odds of winning: (1) request a written summary and disclosure of the winning odds by writing to the Sponsor at:</br></br>
Official Free Entry Request</br></br>
P.O. Box #35717</br></br>
Tucson, AZ 85704</br></br>
or (2) request the written summary and disclosure of the winning odds in paper form at the Sponsor's store.</br></br>
<b>7. OTHER TERMS AND CONDITIONS OF THE OFFICIAL RULES.</b> These official rules apply to a number of Skidoozy Coupon Points game promotions. The promotional game is defined not by the products that are being promoted but by the finite pool of electronic game pieces from which entries are drawn. Please refer to the Sponsor's wall postings for the beginning and ending dates of the current promotion at the Sponsor's store. The promotional game may end earlier than the date posted: (a) when the deal of electronic game pieces is exhausted or (b) when terminated by the Sponsor/Administrator for the reasons stated below: The Sponsor/Administrator reserves the right to modify and/or terminate this promotional game and to take such other measures that the Sponsor/Administrator may deem necessary to appropriate, in its sole discretion to preserve the integrity of the promotional game or in the event that it or associated practices or equipment become corrupted, technically or otherwise. In such event, prizes will be awarded only from entries received prior to the date of termination or modification. Participating entrants release the Sponsor and/or the Administrator, together with all other businesses involved in this promotional game, as well as the employees, officers and directors of each, of all claims and liability related to participation in this promotional game. Any promotional game notice, entry form or other writing, including writings in electronic form that contains an error (printing, human, technical or other) shall be deemed null and void. Technical malfunction of the electronic equipment associated with this promotional game voids all play on it. Upon delivery of a prize to a winner, sponsor/administrator will be deemed to have awarded the prize to the winner with winner assuming full ownership and responsibility for the prize. CAUTION: Any attempt made by entrant to deliberately undermine the legitimate operation of the Sweepstakes is a violation of criminal and civil laws. Should such an attempt be made, or if sponsor/administrator suspects that there has been any electronic tampering or if technical difficulties compromise the integrity of the Sweepstakes, sponsor/administrator reserves the right to seek damages from any such entrant as permitted by law and to void such participant's entries from the Sweepstakes. 
Any loss of winning voucher will be the responsibility of the patron. In such case that a patron looses their winning claim ticket that prize will be forfeited and the sponsor/administrator shall not be liable for compensation and shall be held completely harmless in all such situations. Winners may be required, at the sole discretion of the Sponsor, to sign and return an affidavit of eligibility/liability release and where legally permissible, a publicity release, as a condition precedent to the receipt of any prize to be awarded. All winners are subject to disclosure of their winnings and identifying information; to the extent such disclosure is required by law or provided for in these Official Rules. Regardless of how winners use prizes awarded to them, all such awards are taxable income to the participant. Participants are responsible to pay all income and other taxes due in respect of any prize that they receive. The prize winner(s) is responsible for all federal, state and local taxes on prizes and are the sole responsibility of the prize winner(s). All prize winner(s) and prizes will be reported to governmental tax authorities as required by law. Please refer to the Sponsor’s PRIVACY POLICY, below. Except where prohibited by law, all winners consent to the use of their names, home town, prizes won and likenesses for promotional purposes on behalf of the sponsor and the participating retailer. All disputes and claims arising out of or relating to this promotional game shall be determined according to the laws of the state in which the Sponsor’s retail premises is located, without regard to such state’s conflict of law principles. All participating entrants, by their participation, consent to the personal jurisdiction of the U.S. federal and state courts located in that state and agree that such courts have exclusive jurisdiction over all such disputes. All causes of action in any way arising out of or connected with this promotional game shall be resolved individually without resort to any form of class action litigation; and any claims, judgments and awards shall be limited to actual out-of-pocket expenses incurred.
</br></br>
<b>8. PRIVACY POLICY.</b> The Sponsor and the Administrator and their respective subsidiaries, affiliates and contractors respect the rights to privacy of all patrons, as a group and individually and recognize the importance of protecting information collected about them. The sponsor and the administrator have adopted a company-wide privacy policy that guides how the sponsor and the administrator store and use the information that patron's provide in connection with their participation in the promotional game and their use of Skidoozy Coupon Points. The sponsor and the administrator adhere to the safe harbor principles that have been established by federal law. Any patron, who has questions, complaints or comments regarding the sponsor's/administrators privacy policies, may contact the privacy policy administrator by writing to: Privacy Policy Administrator, Skidoozy Coupon Points via United States postal service at: 
Skidoozy Privacy Policy Administrator P.O. Box #35717 Tucson, AZ 85704. </br></br>

This policy applies only to information collected by the sponsor or the administrator through or derived from the medium of its Skidoozy Coupon Points program and that the sponsor believes, patrons would appreciate receiving. From time to time the sponsor or the administrator may employ a third-party contractor to collect personal information on the sponsor's behalf or the administrator's behalf to provide delivery, product promotional fulfillment or other services. </br></br>

When the sponsor's third-party contractors collect and/or have access to patron personal information, the sponsor requires that they adhere to the sponsors stated privacy policies and protect the confidentiality of patron’s personal information that they collect and have access to in the course of their engagement by the sponsor or the administrator. Patrons who have disclosed personal information to the sponsor and/or the administrator may choose to opt out of the sponsor's disclosure of personal information about them to third parties. If the patron chooses to opt out at anytime, the patron may do so by notifying the sponsor's privacy policy administrator by United States postal service, at: Skidoozy Privacy Policy Administrator P.O. Box #35717 Tucson, AZ 85704.

</p>

</body>

                                            </html>"
                                        //src="/"
                                        >
                                        </iframe>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div className="col-2">
                                <button key="prev" style={{ backgroundColor: 'white', color: 'black' }} className="btn btn-primary btn-block" onClick={() => { setType("Check2") }}><b>Cancel</b></button>

                            </div>

                            <div className='col-8' style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                                <input type='checkbox' value={isNext} checked={isNext} onChange={handleOnChange} style={{ margin: '1%' }} />
                                <p style={{ paddingLeft: '4%' }}>
                                    I have read and understood the rules & accept the terms and conditions
                                </p>

                            </div>
                            <div className="col-2" >
                                <button key="submit" style={{ backgroundColor: 'white', color: 'black' }} disabled={!isNext} className="btn btn-primary btn-block" onClick={(e) => { submit(e) }}><b>SUBMIT</b></button>

                            </div>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div className="main-container">
                    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: "70%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <button key="back" className="btn btn-primary btn-block" onClick={handleStart} style={{ padding: "20px", width: '40%' }}>Free Play Request</button>
                        </div>
                    </div>
                </div>

            )
    }
}
