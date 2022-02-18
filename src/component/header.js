import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from './button/btnLogout'
import {homeIconImage} from './helper/images'
export default function Header({showbutton = false, showHomeIcon = false}){
    const userInfo = useSelector(state => state.userInfo)
    return(
        <div style={{paddingBottom: '20px',borderBottom: '5px solid blue', color: 'white'}}>
            {showbutton && <Link className="btn btn-orange" style={{position:'absolute', top:'90px', right:'30px'}} to="/">BUY COUPON POINTS</Link> }
            <div className="row height-15vh">
                <div className="col-6 text-left">
                    {showHomeIcon && <Link to="/profile"><img  style={{position: 'absolute',bottom: '10px', width: '50px', left: '15px'}} src={homeIconImage} alt="home icon"/></Link> }
                    <span className="font-weight-bold" style={{position: 'absolute',bottom: '10px', left: '90px'}}>Wellcome: {userInfo.fullName}</span>
                </div>
                <div className="col-4 py-4">
                    <div className="d-flex align-items-end flex-column height-10vh">
                        <div className="mb-auto p-2">
                            <strong>Coupon Points: {userInfo.couponPoint ?? 0}</strong>
                        </div>
                        <div className="mt-auto p-2">
                            <strong>Entries: {userInfo.entry ?? 0}</strong>
                        </div>
                    </div>
                </div>
                <div className="col-2 text-right pt-4">
                    <BtnLogout/>
                </div>
            </div>
        </div>
        
    )
}