import axios from 'axios'
import BtnPlayNow from './button/btnPlayNow'
import Header from './header'
import { playNowImage } from './helper/images'
import PopupCoupon from './modal/popupCoupon'
import { useEffect, useState } from 'react'
import { defaultURI, defaultAPI, defaultURL} from './helper/helper'
const couponAPI =  defaultAPI + defaultURI.GET_PERCHASE_COUPON_LIST
const cetagoryAPI =  defaultAPI + defaultURI.GET_COUPON_CATERGORY_LIST

export default function PurchaseCoupon(){
    const [coupon, setCoupon] = useState([])
    const [category, setCategory] = useState([])
    const [dataIsShow, setDataIsShow] = useState(null)
    const handleChange = (e) => {
        let value = e.target.value
        axios.get(couponAPI + value)
        .then(response => {
            if(response.data){
                setCoupon(response.data)
            }
        })
    }
    const handleShowInfo = (data) => {
        setDataIsShow(data)
    }
    useEffect(()=>{
        axios.get(couponAPI)
        .then(response => {
            if(response.data){
                setCoupon(response.data)
            }
        })
        
        axios.get(cetagoryAPI)
        .then(response => {
            if(response.data){
                setCategory(response.data)
            }
        })
        
    },[])
    return(
        <div className="main-container">
            {
                dataIsShow? <PopupCoupon setDataIsShow={setDataIsShow} data={dataIsShow}></PopupCoupon>:null
            }
            <div className="container-fluid">
                <div className="pt-5">
                    <Header showHomeIcon={true}/>
                </div>
                <div className="row">
                    <div className="col-9 p-4">
                        <div className="coupon-list">
                            <div className="row pr-5">
                                <div className="col-6">
                                    <h3 className="text-left text-light">Purchase Coupons</h3>
                                </div>
                                <div className="col-6 pt-1">
                                    <select defaultValue="" className="custom-select" onChange={(e)=>{handleChange(e)}}>
                                        <option value="">All</option>
                                        {category.map((item, index) => 
                                            <option key={item.CouponCategoryID} value={item.CouponCategoryID}>{item.CouponCategoryName}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="row list-item">
                                {coupon.map((item, index) => 
                                    <div key={index} className="col-4 mt-5">
                                        <img key={index} className="img-fluid pointer" alt="images coupon" onClick={()=>{handleShowInfo(item)}}  src={defaultURL + item.MediaFile}/>
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