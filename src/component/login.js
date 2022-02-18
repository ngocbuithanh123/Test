import axios from 'axios';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
import { emailImage, passwordImage } from './helper/images'
import { defaultAPI, defaultURI, defaultFunc, defaultConfig } from './helper/helper'
export default function Login(){
    var history = useHistory()
    const isLogin = useSelector(state => state.isLogin)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const submit = (e) => {
        dispatch({type: 'LOADING'})
        let nameAPI = defaultURI.LOGIN; 
        let emailAPI = "?username=" + email;
        let passwordAPI = "&password=" + password;
        let  _url = defaultAPI  + nameAPI + emailAPI + passwordAPI + "&logintype=1";
        axios.get(_url)
        .then(data => {
            if(data.data !== 0){
                let ID = data.data
                let  getDataUrl = defaultAPI + defaultURI.GET_DATA + "?customerid="+ ID +"&establishmentid=" + defaultConfig.EstablishmentID;
                axios.get(getDataUrl)
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
                        dispatch({type: 'UN-LOADING'})
                        dispatch({type: 'LOGIN', userInfo: userInfo })
                        history.push('/profile')
                    }
                    
                })
                .catch(()=>{
                    dispatch({type: 'UN-LOADING'})
                })
            } else {
                dispatch({type: 'UN-LOADING'})
            }
        })
        .catch(() =>{
            console.log('error')
            dispatch({type: 'UN-LOADING'})
        })
        
    }
    if(isLogin){
        return (
            <Redirect to='/profile' />
        )
    }
    return(
        <div className="main-container">
            <div className="container" style={{width: '50%'}}>
                <div className="input-group mb-3 input-group-lg">
                    <div className="input-group-prepend">
                        <img className="image-input" src={emailImage} alt="icon input"/>
                    </div>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="form-control" placeholder="Email"/>
                </div>
                <div className="input-group mb-3 input-group-lg">
                    <div className="input-group-prepend">
                        <img src={passwordImage} className="image-input" alt="icon input"/>
                    </div>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" placeholder="Password" value={password} />
                </div>
                <div className="text-center">
                    <div className="row mb-3">
                        <div className="col-6">
                            <button className="btn btn-primary btn-block btn-lg" onClick={() => {history.push('/forgot-password')}}>Fogot Password</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary btn-block btn-lg" onClick={() => {history.push('/')}}>BACK</button>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-block btn-lg" onClick={(e)=>{submit(e)}}>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}