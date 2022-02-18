import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { playNowImage } from './helper/images'
import BtnPlayNow from './button/btnPlayNow'
import Header from './header'
import { defaultURI, defaultAPI, defaultURL} from './helper/helper'
const couponAPI =  defaultAPI + defaultURI.GET_COUPON_LIST
export default function MyCoupon(){
    const [coupon, setCoupon] = useState([])
    const userID = useSelector(state => state.userInfo.userID)
    useEffect(()=>{
        axios.get(couponAPI + userID)
        .then(response => {
            if(response.data){
                setCoupon(response.data)
            }
        })
        .catch(error => {

        })
    },[userID])
    return(
        <div className="main-container">
            <div className="container-fluid">
                <div className="pt-5">
                    <Header showHomeIcon={true}/>
                </div>
                <div className="row">
                    <div className="col-9 p-4">
                        <div className="coupon-list">
                            <h3 className="text-left text-light">My Coupons</h3>
                            <div className="row list-item">
                                {coupon.map((item, index) => 
                                    <div key={index} className="col-4 mt-5">
                                        <img key={index} className="img-fluid" alt="images coupon"  src={defaultURL + item.MediaFile}/>
                                        <p>{item.CouponName}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-3 pt-4">
                        <img className="img-fluid image-play" alt="images coupon"  src={playNowImage}/>
                        <div className="centered centered-play-btn">
                            <BtnPlayNow/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}