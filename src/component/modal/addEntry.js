import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { defaultURI, defaultAPI, defaultConfig } from '../helper/helper'
import { deleteBtn, topTitle } from '../helper/images'
import axios from "axios"
const styleButton = {fontSize: '16px'}
const arrayButton = [1, 5 , 10, 50, 100]
export default function AddEntry({ handleReloadData }){
    const dispatch = useDispatch()
    const userID = useSelector(state => state.userInfo.userID)
    const bankBalance = useSelector(state => state.userInfo.bankBalance)
    const winBalance = useSelector(state => state.userInfo.winBalance)
    const [maxValue, setMaxValue] = useState(bankBalance)
    const [value, setValue] = useState(0)
    const [balance, setBalance] = useState(true)
    const [undo, setUndo] = useState([])
    const handleValue = (input) => {
        if(value < maxValue){
            if(value + input >= maxValue){
                setValue(maxValue)
            } else {
                setValue(value + input)
            }
            let item = {
                maxValue, value, balance
            }
            setUndo([...undo, item])
        }
        
    }
    const handleChangeBalance = (input) => {
        if(input === false){
            setMaxValue(winBalance)
            setBalance(false)
        } else {
            setMaxValue(bankBalance)
            setBalance(true)
        }
        let item = {
            maxValue, value, balance
        }
        setUndo([...undo, item])
    }
    const handleUndo = () => {
        let index = undo.length
        if(index > 0){
            let lastItem = undo.pop()
            setValue(lastItem.value)
            setBalance(lastItem.balance)
            setMaxValue(lastItem.maxValue)
        }
    }
    const handleBuyAdditionalCoupon = (e) => {
        e.target.disabled = true
        dispatch({type: "LOADING"})
        axios.get(defaultAPI+ defaultURI.GET_CHECK_BALANCE + defaultConfig.EstablishmentID)
        .then(response => {
            e.target.disabled = false
            dispatch({type: "UN-LOADING"})
            if(response.data && response.data.Successful){
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                //handle print ticket
            }
        })
        .catch(error => {
            dispatch({type: "UN-LOADING"})
            e.target.disabled = false
        })
    }
    const handleAddEntry = (e) => {
        e.target.disabled = true
        dispatch({type: "LOADING"})
        axios.get(defaultAPI+ defaultURI.GET_COUPON_BUY + "?customerid="+userID+"&establishmentid="+defaultConfig.EstablishmentID+"&establishmentkioskid="+defaultConfig.KioskID+"&credit="+value+"&paymentmethod=77&addentries=true&addentriesfrombank="+balance)
        .then(response => {
            e.target.disabled = false
            dispatch({type: "UN-LOADING"})
            console.log(response.data)
            if(response.data && response.data.Successful){
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                setUndo([])
                setValue(0)
                handleReloadData(userID)
            }
        })
        .catch(error => {
            dispatch({type: "UN-LOADING"})
            e.target.disabled = false
        })
    }
    const handleBuyCoupon = (e) => {
        e.target.disabled = true
        if(value <= 1){
            e.target.disabled = false
            dispatch({type: 'SHOW-MESSAGE', message: 'Select must be greater than $1'})
            return false
        }
        dispatch({type: "LOADING"})
        axios.get(defaultAPI+ defaultURI.GET_CHECK_BALANCE)
        .then(response => {
            e.target.disabled = false
            if(response.data && response.data.Successful){
                axios.get(defaultAPI+ defaultURI.GET_ADD_UPDATE_CUSTOMER_BALANCE + "?CustomerSweepstakeID=0&CustomerID="+userID+"&BankBalance="+value+"&EstablishmentID="+defaultConfig.EstablishmentID+"&EstablishmentKioskID="+defaultConfig.KioskID+"&paymentmethod=77")
                .then(response => {
                    console.log(response.data)
                    if(response.data && response.data.Successful){
                        dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                        setUndo([])
                        setValue(0)
                        handleReloadData(userID)
                    } else {
                        dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                    }
                })
            } else {
                dispatch({type: "UN-LOADING"})
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
            }
        })
        .catch(error => {
            dispatch({type: "UN-LOADING"})
            e.target.disabled = false
        })
    }
    var undoBtn, addEntryBtn, BuyCouponBtn
    if(undo.length > 0){
        undoBtn = <button style={styleButton} className="btn btn-action-modal-content" onClick={handleUndo}><i className="fa fa-reply" aria-hidden="true"></i><br/>Undo</button>
    } else {
        undoBtn = <button style={styleButton} className="btn btn-action-modal-content" disabled><i className="fa fa-reply" aria-hidden="true"></i><br/>Undo</button>
    }
    if(balance){
        BuyCouponBtn = <button style={styleButton} className="btn btn-block btn-action-modal-content" disabled>Buy Coupon From Winnings</button>
        addEntryBtn = <button onClick={(e)=>{handleAddEntry(e)}} className="btn btn-block btn-action-modal-content line-height-3rm">Add Entries</button>
    } else {
        BuyCouponBtn = <button style={styleButton} onClick={(e)=>{handleBuyCoupon(e)}} className="btn btn-block btn-action-modal-content">Buy Coupon From Winnings</button>
        addEntryBtn = <button className="btn btn-block btn-action-modal-content line-height-3rm" disabled>Add Entries</button>
    }
    return(
        <div className="modal bd-example-modal-lg d-block" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    
                    <div className="modal-body">
                        <div className="my-5">
                            <div className="text-center">
                                <h5 className="text-center" style={{position: 'absolute', top:"85px", left: "350px"}}>ADD ENTRIES</h5>
                                <img src={topTitle} width="50%" alt="top title"/>
                                <button style={{position:"absolute", top:"10px", right: "10px"}} type="button" onClick={()=>{dispatch({type: 'UN-ADDENTRY'})}} className="close">
                                    <img className="image-button" src={deleteBtn} alt="icon button" />
                                </button>
                            </div>
                            <div className="text-center">
                                <h3 style={{color:"#f4d106"}}>Use current antries to enter sweepstakes</h3>
                                <div className="d-flex justify-content-center py-2">
                                    <div className="row col-12">
                                        <div className="col-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={{color:"#f4d106", fontWeight:"bold", backgroundColor:'transparent', border: 'none'}}>Bank Balance $</span>
                                                </div>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={{minWidth:"150px", color:"#f4d106", fontWeight:"bold", backgroundColor:'#3d291e', border: 'none'}}>{bankBalance}</span>
                                                </div>
                                                <input checked={balance} onChange={()=>{handleChangeBalance(true)}} type="radio" name="balance" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={{color:"#f4d106", fontWeight:"bold", backgroundColor:'transparent', border: 'none'}}>Win Balance $</span>
                                                </div>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={{minWidth:"150px", color:"#f4d106", fontWeight:"bold", backgroundColor:'#3d291e', border: 'none'}}>{winBalance}</span>
                                                </div>
                                                <input checked={!balance} onChange={()=>{handleChangeBalance(false)}} type="radio" name="balance" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center px-5" >
                                <h3 style={{backgroundColor: '#3d291e',lineHeight: '50px', color:"#f4d106"}}>Select how much you want to redeem</h3>
                            </div>
                            <div className="text-center">
                                <div className="py-3">
                                    <span style={{ color:"#f4d106", fontWeight:"bold", fontSize:'20px'}}>$ </span>
                                    <input style={{backgroundColor: '#3d291e', color:"#f4d106", fontWeight:"bold", fontSize:'20px'}} className="text-right" value={value+".00"} readOnly/>
                                </div>
                                <div className="d-flex justify-content-center py-2">
                                    <div className="d-flex justify-content-between col-12">
                                        {
                                            arrayButton.map((button, i) => <button key={i} onClick={() => {handleValue(button)}} className="btn btn-modal-content">+ {button}</button>)
                                        }
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center py-2">
                                    <div className="col-12">
                                        <button className="btn btn-block btn-all-modal-content" onClick={()=>{handleValue(maxValue)}}>All {maxValue+ ".00"}</button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-2 text-left">
                                                {undoBtn}
                                            </div>
                                            <div className="col-3">
                                                {addEntryBtn}
                                            </div>
                                            <div className="col-3">
                                                {BuyCouponBtn}
                                            </div>
                                            <div className="col-4">
                                                <button style={styleButton} onClick={(e)=>{handleBuyAdditionalCoupon(e)}} className="btn btn-block btn-action-modal-content">Buy Additional Coupon Points</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}