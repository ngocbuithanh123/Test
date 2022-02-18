import { useDispatch } from "react-redux"

export default function BtnLogout(){
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
    }
    return(
        <button onClick={handleLogout} className="btn btn-danger">
            <i className="fa fa-3x fa-power-off" aria-hidden="true"></i>
            <br/>
            LOGOUT
        </button>
    )
}