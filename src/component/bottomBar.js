import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export default function BottomBar(){
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const history = useHistory()
    return(
        <div className="height-15vh pt-5 px-5">
            <div className="row">
                <div className="col-5 pb-2 btn-entries-winning-game-lobby">
                    <div className="row text-center mt-5">
                        <div className="col-6">
                            <div className="text-light text-right px-4">{userInfo.entry ?? 0}</div>
                        </div>
                        <div className="col-6">
                            <div className="text-light text-center px-1">$ {userInfo.winBalance ?? 0}</div>
                        </div>
                    </div>
                </div>
                <div className="col-5 text-center pt-3">
                    <button className="btn btn-redeem-game-lobby" onClick={()=>{dispatch({type:"REDEEM"})}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-addentries-game-lobby" onClick={()=>{dispatch({type:"ADDENTRY"})}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                </div>
                <div className="col-2 pt-3">
                    <button className="btn btn-quit-game-lobby" onClick={()=>{history.push('/profile')}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    )
}