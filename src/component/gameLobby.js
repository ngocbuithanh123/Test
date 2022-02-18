import { Mr_Chicken_Thumbnail , Threed_Soccer_Thumbnail, Chinese_Frog_Thumbnail, Golden_Pyramid_Thumbnail, Katana_Fruit_Thumbnail, Space_Adventure_Thumbnail, West_World_Thumbnail} from './helper/images'
import { useHistory } from "react-router-dom";
import BottomBar from './bottomBar'
import Redeem from './modal/redeem'
import AddEntry from './modal/addEntry'
import { useSelector, useDispatch } from 'react-redux';
import { defaultURI, defaultAPI, defaultFunc, defaultConfig } from './helper/helper'
import axios from "axios"


const array = [
    {name: "Mr_Chicken", image: Mr_Chicken_Thumbnail},
    {name: "3d_Soccer", image: Threed_Soccer_Thumbnail},
    {name: "Golden_Pyramid", image: Golden_Pyramid_Thumbnail},
    {name: "Katana_Fruit", image: Katana_Fruit_Thumbnail},
    {name: "Chinese_Frog", image: Chinese_Frog_Thumbnail},
    {name: "Space_Adventure", image: Space_Adventure_Thumbnail},
    {name: "West_World", image: West_World_Thumbnail},
]
export default function GameLobby(){
    var history = useHistory()
    const dispatch = useDispatch()
    const isRedeem = useSelector(state => state.isRedeem)
    const isAddEntry = useSelector(state => state.isAddEntry)
    const handleReloadData = (userID) => {
        axios.get(defaultAPI + defaultURI.GET_DATA + "?customerid="+ userID +"&establishmentid=" + defaultConfig.EstablishmentID)
        .then(res => {
            if(res.data){
                let FirstName = res.data.FirstName??""
                let MiddleName = res.data.MiddleName??""
                let LastName = res.data.LastName??""
                let userInfo = {
                    userID: userID,
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
    }
    return(
        <div className="main-container">
            {
                isRedeem?<Redeem handleReloadData={handleReloadData}/>: null
            }
            {
                isAddEntry?<AddEntry handleReloadData={handleReloadData}/>: null
            }
            <div className="container-fluid" style={{paddingTop: '200px'}}>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row list-item height-50vh">
                            {array.map((item, index) => 
                                <div key={index} className="col-2 my-2">
                                    <img key={index} className="img-fluid pointer" onClick={()=>{history.push('/game-play', item.name)}} alt="images {item.name}"  src={item.image}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="">
                    <BottomBar/>
                </div>
            </div>
        </div>
    )
}