import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defaultAPI, defaultURI} from '../helper/helper'
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};
export default function PopupCoupon({ data , setDataIsShow }){
    const value = data
    const userID = useSelector(state => state.userInfo.userID)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const handleBuy = () => {
        dispatch({type: 'LOADING'})
        let postData = {
            CustomerCouponID: 0,
            FKCustomerID: userID,
            FKCouponID: value.CouponID,
            Quantity: quantity,
            CouponPointSpent: value.CouponPointRequired * quantity,
        }
        axios.post(defaultAPI+defaultURI.POST_ADD_CUSTOMER_COUPON, postData, axiosConfig)
        .then(response => {
            alert(response.data.Message)
            setDataIsShow(null)
            dispatch({type: 'UN-LOADING'})
        })
        .catch(error => {
            dispatch({type: 'UN-LOADING'})
        })
    }
    if(!value){
        return null
    }
    return(
        <div className="modal bd-example-modal-lg d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content height-50vh">
                    <div className="modal-body">
                        <div className="pb-4 d-flex flex-row-reverse">
                            <button type="button" className="close" onClick={()=>{setDataIsShow(null)}}><span  aria-hidden="true">×</span></button>
                        </div>
                        <div className="row px-5">
                            <div className="col-6">
                                <div className="pr-3 text-right">
                                    <p className="text-truncate">Coupon Name:</p>
                                    <p className="text-truncate">Coupon Code:</p>
                                    <p className="text-truncate">Category Name:</p>
                                    <p className="text-truncate">Company Name:</p>
                                    <p className="text-truncate">Point Required:</p>
                                    <p className="text-truncate">Available Coupons:</p>
                                    <p className="text-truncate">Description:</p>
                                    <p className="text-truncate">Quantity:</p>
                                </div>
                            </div>
                            <div className="col-6 text-left">
                                <div className="pl-3">
                                    <p className="text-truncate">{value.CouponName}</p>
                                    <p className="text-truncate">{value.CouponCode}</p>
                                    <p className="text-truncate">{value.CouponCategoryName}</p>
                                    <p className="text-truncate">{value.CompanyName}</p>
                                    <p className="text-truncate">{value.CouponPointRequired}</p>
                                    <p className="text-truncate">{value.AvailableCoupons}</p>
                                    <p className="text-truncate">{value.Description}</p>
                                    <p><input type="number" min="1" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/></p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-warning px-5" onClick={handleBuy}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}