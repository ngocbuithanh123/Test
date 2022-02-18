import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { defaultURI } from './helper/helper'
export default function ForgotPassword(){
    var history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const submit = (e) => {
        if(email === ''){
            dispatch({type: 'SHOW-MESSAGE', message: 'Please enter your email!'})
            return false
        }
        e.target.disabled = true
        axios.get(defaultURI.GET_FORGOT_PASSWORD + email)
        .then(response => {
            dispatch({type: 'SHOW-MESSAGE', message: response.data})
            e.target.disabled = false
        })
        .catch(error => {
            dispatch({type: 'SHOW-MESSAGE', message: 'Something went wrong. Please try agian!'})
            e.target.disabled = false
        })
    }
    return(
        <div className="main-container">
            <div className="container">
                <div className="input-group mb-3 input-group-lg">
                    <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-x fa-envelope-o" aria-hidden="true"></i></span>
                    </div>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Email"/>
                </div>
                <div className="text-center">
                    <div className="mb-3">
                        <button className="btn btn-primary btn-block" onClick={(e)=>{submit(e)}}>SUBMIT</button>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary btn-block" onClick={()=>{history.push('/login')}}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}