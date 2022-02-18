import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defaultURI, defaultAPI, defaultConfig } from '../helper/helper'
import { deleteBtn, topTitle } from '../helper/images'
import axios from "axios"
const arrayButton = [1, 5 , 10, 50, 100];
export default function Redeem({ handleReloadData }){
    const dispatch = useDispatch()
    const userID = useSelector(state => state.userInfo.userID)
    const maxValue = useSelector(state => state.userInfo.winBalance)
    const [value, setValue] = useState(0)
    const [undo, setUndo] = useState([])
    const handleValue = (input) => {
        if(value < maxValue){
            setUndo([...undo, {value, input}])
            if(value + input >= maxValue){
                setValue(maxValue)
            } else {
                setValue(value + input)
            }
        }
    }
    const handleUndo = () => {
        let index = undo.length
        if(index > 0){
            let lastItem = undo.pop()
            let undoValue = lastItem.value
            setValue(undoValue)
        }
    }
    const handleCashOut = (e) => {
        e.target.disabled = true
        if(value <= 0){
            e.target.disabled = false
            dispatch({type: 'SHOW-MESSAGE', message: 'Select must be greater than $0'})
            return false
        }
        dispatch({type: "LOADING"})
        axios.get(defaultAPI+ defaultURI.GET_REDEEM + "?customerid="+userID+"&establishmentid="+defaultConfig.EstablishmentID+"&sweepstakespoints=0&amount="+value)
        .then(response => {
            e.target.disabled = false
            dispatch({type: "UN-LOADING"})
            if(response.data && response.data.Successful){
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
                handleReloadData(userID)
            } else {
                dispatch({type: 'SHOW-MESSAGE', message: response.data.Message})
            }
        })
        .catch(error => {
            dispatch({type: "UN-LOADING"})
            e.target.disabled = false
        })
    }
    var undoButon
    if(undo.length > 0){
        undoButon = <button className="btn btn-action-modal-content" onClick={handleUndo}>Undo</button>
    } else {
        undoButon = <button className="btn btn-action-modal-content" disabled>Undo</button>
    }
    return(
        <div className="modal bd-example-modal-lg d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="my-5">
                            <div className="text-center">
                                <h5 className="text-center" style={{position: 'absolute', top:"85px", left: "365px"}}>REDEEM</h5>
                                <img src={topTitle} width="50%" alt="top title"/>
                                <button style={{position:"absolute", top:"10px", right: "10px"}} type="button" onClick={()=>{dispatch({type: 'UN-REDEEM'})}} className="close">
                                    <img className="image-button" src={deleteBtn} alt="icon button" />
                                </button>
                            </div>
                            <div className="text-center">
                                <h3 style={{color:"#f4d106"}}>Print your ticket to redeem your sweepstakes prize</h3>
                                <div className="d-flex justify-content-center py-2">
                                    <div className="col-8">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" style={{color:"#f4d106", fontWeight:"bold", fontSize:'20px', backgroundColor:'transparent', border: 'none'}}>Your Win Balance $</span>
                                            </div>
                                            <input style={{backgroundColor: '#3d291e', color:"#f4d106", fontWeight:"bold", fontSize:'20px'}} className="text-right" value={maxValue} readOnly disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center px-5">
                                <h3 style={{backgroundColor: '#3d291e',lineHeight: '50px', color:"#f4d106"}}>Select how much you want to redeem</h3>
                            </div>
                            <div className="text-center">
                                <div className="py-3">
                                    <span style={{ color:"#f4d106", fontWeight:"bold", fontSize:'20px'}}>$ </span>
                                    <input style={{backgroundColor: '#3d291e', color:"#f4d106", fontWeight:"bold", fontSize:'20px'}} className="text-right" value={value} disabled readOnly/>
                                </div>
                                <div className="d-flex justify-content-center py-2">
                                    <div className="d-flex justify-content-between col-8">
                                        {
                                            arrayButton.map((button, i) => <button key={i} onClick={() => {handleValue(button)}} className="btn btn-modal-content">+ {button}</button>)
                                        }
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center py-2">
                                    <div className="col-8">
                                        <button className="btn btn-block btn-all-modal-content" onClick={()=>{handleValue(maxValue)}}>All {maxValue}</button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-6 text-left">
                                                {undoButon}
                                            </div>
                                            <div className="col-6 text-center">
                                                <button onClick={(e)=>{handleCashOut(e)}} className="btn btn-block btn-action-modal-content">Cash Out</button>
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